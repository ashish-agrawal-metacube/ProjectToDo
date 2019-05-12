class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.references :group, null: false
      t.references :creator, null: false
      t.references :updator, null: false

      t.timestamps
    end
  end
end
