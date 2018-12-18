class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.string :serviceName
      t.float :servicePrice
      t.text :serviceDescription

      t.timestamps
    end
  end
end
