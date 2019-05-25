class GroupsController < ApplicationController

  before_action :authenticate_current_user

  before_action :set_group, only: [:update, :show, :destroy]

  def index
    @groups = policy_scope(Group).includes(:projects).filter(search_params)
    if @groups.length==0
      render json: {groups: []}, status: :ok
    else
      render json: @groups, status: :ok
    end
  end

  def create
    @group = Group.create_group(group_params[:group],current_user)
    if @group.valid?
      render json: @group, status: :ok
    else
      render json: {errors: @group.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    authorize @group
    render json: @group, status: :ok
  end

  def update
    authorize @group
    if @group.update_group(group_params[:group],current_user)
      render json: @group, status: :ok
    else
      render json: {errors: @group.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @group
    if @group.destroy
      render json: @group, status: :ok, fields: [:id, :name]
    else
      render json: {errors: ["Some error occured while deleting group: #{@group.name} "] }, status: :unprocessable_entity
    end
  end

  private

  def set_group
    @group  = Group.find(params[:id])
  end

  def group_params
    params.permit(group: [:name])
  end

  def search_params
    params.permit([:role])
  end

end
