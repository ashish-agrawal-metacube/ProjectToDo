class Todo < ApplicationRecord

  include Filterable

  belongs_to :project

  belongs_to :assignee, class_name: 'User'
  belongs_to :creator, class_name: 'User'

  # todo types
  FEATURE = "feature"
  BUG = "bug"
  TASK = "task"

  # todo status
  NEW = "new"
  INPROGRESS = "in_progress"
  DONE = "done"

  validates :title, :todo_type,  presence: true
  validates :title, allow_blank: true, length: { minimum: 2, maximum: 200 }
  validates :todo_type, allow_blank: true ,inclusion: { in: [FEATURE, BUG, TASK], message: 'is not valid' }
  validates :status, allow_blank: true ,inclusion: { in: [NEW, INPROGRESS, DONE], message: 'is not valid' }

  validate :assignee_should_be_project_member, on: [:create, :update]

  def assignee_should_be_project_member
    if( assignee_id.present? && project_id.present? && !assignee.has_any_of_role?([Role::ADMIN,Role::DEVELOPER],project) )
      errors.add(:base, "Assignee should be a project member.")
    end
  end

  def self.by_project_id(value)
    where(project_id: value)
  end

  def self.by_assignee_id(value)
    where(assignee_id: value)
  end

  def self.create_todo(project, params, current_user)
    todo = Todo.new(params)
    todo.project = project
    todo.creator_id = current_user.id
    todo.updator_id = current_user.id
    todo.save
    todo
  end

  def update_todo(params, current_user)
    self.assign_attributes(params)
    self.updator_id = current_user.id
    save
  end

  def display_type
    todo_type.try(:titlecase)
  end

  def display_status
    status.try(:titlecase)
  end

end
