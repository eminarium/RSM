# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150331105726) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "brands", force: true do |t|
    t.string   "brandName"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "colors", force: true do |t|
    t.string   "colorName"
    t.string   "colorRGBCode"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", force: true do |t|
    t.string   "custFName"
    t.string   "custLName"
    t.string   "custPatronymic"
    t.string   "custEmail"
    t.string   "custPhoneHome"
    t.string   "custPhoneOffice"
    t.string   "custPhoneMobile1"
    t.string   "custPhoneMobile2"
    t.text     "custAddressHome"
    t.text     "custAddressOffice"
    t.text     "custDescription"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "equipment_types", force: true do |t|
    t.string   "equipmentTypeName"
    t.text     "equipmentTypeDesc"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "itemName"
    t.float    "itemPrice"
    t.text     "itemDescription"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "mod_objects", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "mod_objects_roles", id: false, force: true do |t|
    t.integer  "mod_object_id"
    t.integer  "role_id"
    t.boolean  "canCreate"
    t.boolean  "canRead"
    t.boolean  "canUpdate"
    t.boolean  "canDelete"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "mod_objects_roles", ["mod_object_id"], name: "index_mod_objects_roles_on_mod_object_id", using: :btree
  add_index "mod_objects_roles", ["role_id"], name: "index_mod_objects_roles_on_role_id", using: :btree

  create_table "models", force: true do |t|
    t.string   "modelName"
    t.integer  "brand_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "models", ["brand_id"], name: "index_models_on_brand_id", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.string   "authorizable_type"
    t.integer  "authorizable_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "roles", ["authorizable_type", "authorizable_id"], name: "index_roles_on_authorizable_type_and_authorizable_id", using: :btree

  create_table "roles_users", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "roles_users", ["role_id"], name: "index_roles_users_on_role_id", using: :btree
  add_index "roles_users", ["user_id"], name: "index_roles_users_on_user_id", using: :btree

  create_table "services", force: true do |t|
    t.string   "serviceName"
    t.float    "servicePrice"
    t.text     "serviceDescription"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "state_ticket_histories", force: true do |t|
    t.integer  "ticket_id"
    t.integer  "state_id"
    t.datetime "state_changetime"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "states", force: true do |t|
    t.string   "stateName"
    t.text     "stateDesc"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tickets", force: true do |t|
    t.integer  "customer_id"
    t.integer  "user_id"
    t.integer  "equipmentType_id"
    t.string   "ticketItemSerialNum"
    t.integer  "brand_id"
    t.integer  "model_id"
    t.integer  "color_id"
    t.text     "ticketItemDesc"
    t.datetime "ticketAcceptDateTime"
    t.datetime "ticketPredictionDateTime"
    t.datetime "ticketReadyDateTime"
    t.text     "ticketProblemDesc"
    t.text     "ticketSolutionDesc"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "state_id"
  end

  add_index "tickets", ["brand_id"], name: "index_tickets_on_brand_id", using: :btree
  add_index "tickets", ["color_id"], name: "index_tickets_on_color_id", using: :btree
  add_index "tickets", ["customer_id"], name: "index_tickets_on_customer_id", using: :btree
  add_index "tickets", ["equipmentType_id"], name: "index_tickets_on_equipmentType_id", using: :btree
  add_index "tickets", ["model_id"], name: "index_tickets_on_model_id", using: :btree
  add_index "tickets", ["state_id"], name: "index_tickets_on_state_id", using: :btree
  add_index "tickets", ["user_id"], name: "index_tickets_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "userLogin"
    t.string   "userFName"
    t.string   "userLName"
    t.string   "userEmail"
    t.string   "userPhoneHome"
    t.string   "userPhoneMobile1"
    t.string   "userPhoneMobile2"
    t.text     "userAddress"
    t.text     "userDescription"
    t.string   "crypted_password"
    t.string   "password_salt"
    t.string   "persistence_token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "role_id"
  end

  add_index "users", ["role_id"], name: "index_users_on_role_id", using: :btree

end
