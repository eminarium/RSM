json.array!(@roles) do |role|
  json.extract! role, :id, :name, :authorizable_type, :authorizable_id
  json.url role_url(role, format: :json)
end
