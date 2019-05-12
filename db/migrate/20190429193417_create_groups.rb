class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.references :creator, null: false
      t.references :updator, null: false

      t.timestamps
    end
  end
end
