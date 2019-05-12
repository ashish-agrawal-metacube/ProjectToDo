class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :todo_type, :status, :assignee_id ,:display_type, :display_status, :description, :created_at

  belongs_to :assignee

  belongs_to :creator

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end
end
