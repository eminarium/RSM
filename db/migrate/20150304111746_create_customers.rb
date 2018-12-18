class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :custFName
      t.string :custLName
      t.string :custPatronymic
      t.string :custEmail
      t.string :custPhoneHome
      t.string :custPhoneOffice
      t.string :custPhoneMobile1
      t.string :custPhoneMobile2
      t.text :custAddressHome
      t.text :custAddressOffice
      t.text :custDescription

      t.timestamps
    end
  end
end
