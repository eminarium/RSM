json.array!(@users) do |user|
  json.extract! user, :id, :userLogin, :userFName, :userLName, :userEmail, :userPhoneHome, :userPhoneMobile1, :userPhoneMobile2, :userAddress, :userDescription, :crypted_password, :password_salt, :persistence_token
  json.url user_url(user, format: :json)
end
