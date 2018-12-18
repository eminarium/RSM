class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :colorName
      t.string :colorRGBCode

      t.timestamps
    end
  end
end
