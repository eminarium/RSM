class CreateModels < ActiveRecord::Migration
  def change
    create_table :models do |t|
      t.string :modelName
      t.references :brand, index: true

      t.timestamps
    end
  end
end
