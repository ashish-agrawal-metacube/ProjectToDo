class Group < ApplicationRecord

  resourcify

  include Filterable

  validates :name, presence: true
  validates :name, allow_blank: true, length: { minimum: 2, maximum: 100 }

  before_destroy :destroy_group_memberships

  has_many :projects, dependent: :destroy # it should come before dependent: :destroy association

  def self.by_role(role)
    with_role(role)
  end

  def owner
    User.with_role(Role::OWNER,self).first
  end

  def self.create_group(params, current_user)
    group = Group.new(creator_id: current_user.id, updator_id: current_user.id)
    group.assign_attributes(params)
    current_user.add_role Role::OWNER, group if group.save
    group
  end

  def update_group(params, current_user)
    self.assign_attributes(params)
    self.updator_id = current_user.id
    save
  end

  private

  def destroy_group_memberships
    [Role::OWNER,Role::MEMBER].each do |role|
      users = User.with_role role, self
      users.each do |user|
        user.remove_role role, self
      end
    end
  end


end
