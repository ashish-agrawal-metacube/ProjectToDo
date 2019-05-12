class TodoPolicy < ApplicationPolicy

  def permitted_attributes_for_index
    [:todo_type, :status, :assignee_id, :project_id]
  end

  def permitted_attributes_for_create
    [todo: [:title, :todo_type, :status, :description, :assignee_id]]
  end

  def permitted_attributes_for_update
    if user.has_role? Role::ADMIN, record.project
      permitted_attributes_for_create
    elsif user.has_role? Role::DEVELOPER, record.project
      [todo: [:status] ]
    else
      [todo: []]
    end
  end

  def show?
    user.has_any_of_role? [Role::ADMIN, Role::DEVELOPER], record.project
  end

  def update?
    user.has_role?(Role::ADMIN,record.project) || (user.id == record.assignee_id)
  end

  def destroy?
    user.has_role? Role::ADMIN, record.project
  end

  class Scope < Scope
    def resolve
      project_ids = Project.with_roles([Role::ADMIN, Role::DEVELOPER], user).pluck(:id)
      scope.where(project_id: project_ids)
    end
  end
end
