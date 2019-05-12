class ProjectPolicy < ApplicationPolicy

  def show?
    user.has_any_of_role? [Role::ADMIN, Role::DEVELOPER], record
  end

  def update?
    user.has_role? Role::ADMIN, record
  end

  def members?
    user.has_any_of_role? [Role::ADMIN, Role::DEVELOPER], record
  end

  def add_member?
    update?
  end

  def remove_member?
    update?
  end

  class Scope < Scope
    def resolve
      scope.with_role([ Role::ADMIN, Role::DEVELOPER],user).preload(:roles)
    end
  end
end
