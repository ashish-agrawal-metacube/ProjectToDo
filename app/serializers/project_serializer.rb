class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :group_id, :can_user_add_member, :can_user_remove_member, :can_user_add_todo, :can_user_update_todo, :can_user_delete_todo


  def can_user_add_member
    is_admin?
  end

  def can_user_remove_member
    is_admin?
  end

  def can_user_add_todo
    is_admin?
  end

  def can_user_update_todo
    is_admin?
  end

  def can_user_delete_todo
    is_admin?
  end

  def is_admin?
    @is_admin ||= scope.current_user.has_role?(Role::ADMIN, object)
  end

  def is_project_member?
    @is_member ||= scope.current_user.has_any_of_role?([Role::ADMIN,Role::DEVELOPER], object)
  end
end
