class CreateModObjects < ActiveRecord::Migration
  def change
    create_table :mod_objects do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
