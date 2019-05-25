class Project < ApplicationRecord

  resourcify

  validates :name, presence: true
  validates :name, allow_blank: true, length: { minimum: 2, maximum: 100 }

  belongs_to :group

  before_destroy :destroy_project_memberships # it should come before dependent: :destroy association

  has_many :todos, dependent: :destroy

  def self.create_project(group, params, current_user)
    project = group.projects.new(creator_id: current_user.id, updator_id: current_user.id)
    project.assign_attributes(params)
    current_user.add_role Role::ADMIN, project if project.save

    return project
  end

  def update_project(params, current_user)
    self.assign_attributes(params)
    self.updator_id = current_user.id
    save
  end

  def members
    memberships = []
    [Role::ADMIN,Role::DEVELOPER].each do |role|
      users = User.with_role role, self
      users.each do |user|
        memberships << Membership.new(user,role,self)
      end
    end
    memberships
  end

  def members_count
    User.with_any_role([Role::ADMIN,Role::DEVELOPER], self).count
  end

  def add_member(email, role)
    role = [Role::ADMIN,Role::DEVELOPER].find {|r| r.to_s.downcase == role.downcase }
    errors.add(:base, "Invalid Role") and return if role.nil?

    user = User.find_by email: email
    errors.add(:base, "User not found") and return if user.nil?

    if user.has_role?(Role::ADMIN, self)
      errors.add(:base, "User is already assigned as Admin(Project Manager).") and return
    end

    user.add_role role, self
    user.add_role Role::MEMBER, group #make user a mamber of its project group
    Membership.new(user,role,self)
  end

  def remove_member(user_id)
    user = User.find(user_id)
    errors.add(:base, "User not found") and return if user.nil?

    if user.has_role?(Role::ADMIN,self) && User.with_role(Role::ADMIN, self).count==1
      errors.add(:base, "At least one Admin(Project Manager) is required.") and return
    end

    # find user role in this project
    role = user.roles.where(resource: self).pluck(:name).first
    errors.add(:base, "User is not a member of this project.") if role.nil?

    user.remove_role role, self
    remove_as_group_member user
    Membership.new(user,role,self)
  end

  def status_vs_assignee_view
    assignee_ids = Todo.where(project: self).select(:assignee_id).distinct.pluck(:assignee_id)
    x_axis = User.where(id: assignee_ids).order(:name).map {|user| {id: user.id, name: user.name} }
    y_axis = Todo.status_list
    table = Array.new(x_axis.length){ Array.new(y_axis.length){ Array.new() } }

    todos = Todo.select(:id,:title,:assignee_id,:status).where(project: self)
    todos.each do |todo|
      row = x_axis.index { |user| user[:id]==todo.assignee_id }
      col = y_axis.index { |status| status[:name]==todo.status }
      table[row][col] << {id: todo.id, title: todo.title}
    end

    {x_axis: x_axis,y_axis: y_axis, table: table}
  end

  def self.status_vs_project_view(projects)
    x_axis = projects.map do |project|
      { id: project.id, name: project.name, group: {id: project.group.id, name: project.group.name } }
    end
    y_axis = Todo.status_list
    table = Array.new(x_axis.length){ Array.new(y_axis.length){ Array.new() } }

    todos = Todo.select(:id,:title,:project_id,:status).where(project: projects.map(&:id) )
    todos.each do |todo|
      row = x_axis.index { |project| project[:id]==todo.project_id }
      col = y_axis.index { |status| status[:name]==todo.status }
      table[row][col] << {id: todo.id, title: todo.title}
    end

    {x_axis: x_axis,y_axis: y_axis, table: table}
  end

  private

  def remove_as_group_member(user)
    project_ids = group.projects.pluck(:id)
    if user.roles.where(name: [Role::ADMIN,Role::DEVELOPER], resource_id: project_ids, resource_type: Project.name).count == 0
      user.remove_role Role::MEMBER, group
    end
  end

  def destroy_project_memberships
    [Role::ADMIN,Role::DEVELOPER].each do |role|
      users = User.with_role role, self
      users.each do |user|
        user.remove_role role, self
      end
    end
  end

end
