class ProjectsController < ApplicationController

  before_action :authenticate_current_user

  before_action :set_group, only: [:create]

  before_action :set_project, only: [:update, :show, :members, :add_member, :remove_member]

  def create
    authorize @group, :update?
    @project = Project.create_project(@group,project_params[:project],current_user)
    if @project.valid?
      render json: @project, status: :ok
    else
      render json: {errors: @project.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    authorize @project
    render json: @project, status: :ok
  end

  def update
    authorize @project
    if @project.update_project(project_params[:project],current_user)
      render json: @project, status: :ok
    else
      render json: {errors: @project.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def members
    authorize @project
    render json: @project.members, status: :ok
  end

  def add_member
    authorize @project
    @membership = @project.add_member(params[:email], params[:role])
    if @membership.present?
      render json: @membership, status: :ok
    else
      render json: {errors: @project.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def remove_member
    authorize @project
    @membership = @project.remove_member(params[:user_id])
    if @membership.present?
      render json: @membership, status: :ok
    else
      render json: {errors: @project.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private

  def set_project
    @project  = Project.find(params[:id])
  end

  def set_group
    @group  = policy_scope(Group).find(params[:group_id])
  end

  def project_params
    params.permit(project: [:name])
  end


end
