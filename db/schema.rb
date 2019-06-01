# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_11_184416) do

  create_table "groups", force: :cascade do |t|
    t.string "name", null: false
    t.integer "creator_id", null: false
    t.integer "updator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_groups_on_creator_id"
    t.index ["updator_id"], name: "index_groups_on_updator_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name", null: false
    t.integer "group_id", null: false
    t.integer "creator_id", null: false
    t.integer "updator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_projects_on_creator_id"
    t.index ["group_id"], name: "index_projects_on_group_id"
    t.index ["updator_id"], name: "index_projects_on_updator_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.integer "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "todos", force: :cascade do |t|
    t.string "title", null: false
    t.string "todo_type", null: false
    t.string "status", null: false
    t.text "description"
    t.integer "project_id", null: false
    t.integer "assignee_id", null: false
    t.integer "creator_id", null: false
    t.integer "updator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assignee_id"], name: "index_todos_on_assignee_id"
    t.index ["creator_id"], name: "index_todos_on_creator_id"
    t.index ["project_id", "status"], name: "index_todos_on_project_id_and_status"
    t.index ["project_id", "todo_type"], name: "index_todos_on_project_id_and_todo_type"
    t.index ["project_id"], name: "index_todos_on_project_id"
    t.index ["updator_id"], name: "index_todos_on_updator_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "name", null: false
    t.string "email", null: false
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

end
