class User < ApplicationRecord

  rolify
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User


  scope :with_any_role, ->(role_names, resource) { joins(:roles).where(roles: {name: role_names, resource: resource} ) }

  def has_any_of_role?(role_names,resource)
    roles.where(name: role_names, resource: resource).present?
  end

end
