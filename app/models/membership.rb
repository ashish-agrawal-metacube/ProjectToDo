class Membership

  include ActiveModel::Model
  include ActiveModel::Serialization  

  attr_reader :user, :role, :resource

  def initialize(user = nil, role = nil, resource = nil)
    @user = user
    @role = role
    @resource = resource
  end


end
