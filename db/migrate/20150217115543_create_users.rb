class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :userLogin
      t.string :userFName
      t.string :userLName
      t.string :userEmail
      t.string :userPhoneHome
      t.string :userPhoneMobile1
      t.string :userPhoneMobile2
      t.text :userAddress
      t.text :userDescription
      t.string :crypted_password
      t.string :password_salt
      t.string :persistence_token

      t.timestamps
    end
  end
end
