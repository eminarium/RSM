class CreateEquipmentTypes < ActiveRecord::Migration
  def change
    create_table :equipment_types do |t|
      t.string :equipmentTypeName
      t.text :equipmentTypeDesc

      t.timestamps
    end
  end
end
