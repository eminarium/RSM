class CreateModObjectsRoles < ActiveRecord::Migration
  def change
    create_table :mod_objects_roles, :id => false, :force => true do |t|
      t.references :mod_object, index: true
      t.references :role, index: true
      t.boolean :canCreate
      t.boolean :canRead
      t.boolean :canUpdate
      t.boolean :canDelete

      t.timestamps
    end
  end
end
