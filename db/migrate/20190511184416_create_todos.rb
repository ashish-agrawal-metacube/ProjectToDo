class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.string :todo_type, null: false
      t.string :status, null: false
      t.text :description

      t.references :project, null: false
      t.references :assignee, null: false

      t.references :creator, null: false
      t.references :updator, null: false

      t.timestamps
    end

    add_index :todos, [:project_id, :todo_type]
    add_index :todos, [:project_id, :status]
  end
end
