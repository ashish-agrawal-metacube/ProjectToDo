class MembershipSerializer < ActiveModel::Serializer
  attributes :role

  def role
    object.role.to_s.titlecase
  end

  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :email
  end

end
