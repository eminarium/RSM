class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :itemName
      t.float :itemPrice
      t.text :itemDescription

      t.timestamps
    end
  end
end
