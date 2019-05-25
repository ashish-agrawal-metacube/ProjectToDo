class TodosController < ApplicationController

  before_action :authenticate_current_user

  before_action :set_project, only: [:create]

  before_action :set_todo, only: [:update, :show, :destroy]

  def index
    @todos = policy_scope(Todo).includes(:assignee,:creator).filter(search_params)
    if @todos.length==0
      render json: {groups: []}, status: :ok
    else
      render json: @todos, status: :ok
    end
  end

  def create
    authorize @project, :update?
    @todo = Todo.create_todo(@project,todo_create_params[:todo],current_user)
    if @todo.valid?
      render json: @todo, status: :ok
    else
      render json: {errors: @todo.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    authorize @todo
    render json: @todo, status: :ok
  end

  def update
    authorize @todo
    if @todo.update_todo(todo_update_params[:todo],current_user)
      render json: @todo, status: :ok
    else
      render json: {errors: @todo.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @todo
    if @todo.destroy
      render json: @todo, status: :ok
    else
      render json: {errors: ["Some error occured while deleting this todo."]}, status: :unprocessable_entity
    end
  end

  private

  def set_todo
    @todo  = Todo.find(params[:id])
  end

  def set_project
    @project  = policy_scope(Project).find(params[:project_id])
  end

  def todo_create_params
    params.permit(policy(Todo).permitted_attributes_for_create)
  end

  def todo_update_params
    params.permit(policy(@todo).permitted_attributes_for_update)
  end

  def search_params
    params.permit(policy(Todo).permitted_attributes_for_index)
  end

end
