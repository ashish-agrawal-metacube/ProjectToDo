class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :projects

  def projects
    object.projects.with_role( [Role::ADMIN, Role::DEVELOPER], scope.current_user)
  end

  has_one :owner


  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

  class ProjectSerializer < ActiveModel::Serializer
    attributes :id, :name, :members_count
  end

  
end
