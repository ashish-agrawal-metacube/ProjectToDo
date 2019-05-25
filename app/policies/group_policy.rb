class GroupPolicy < ApplicationPolicy

  def show?
    user.has_role?([ Role::OWNER, Role::MEMBER], record)
  end

  def update?
    user.has_role?( Role::OWNER, record)
  end

  def destroy?
    user.has_role?( Role::OWNER, record)
  end

  class Scope < Scope
    def resolve
      scope.with_role([ Role::OWNER, Role::MEMBER],user).preload(:roles)
    end
  end
end
