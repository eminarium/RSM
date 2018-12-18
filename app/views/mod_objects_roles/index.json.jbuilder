json.array!(@mod_objects_roles) do |mod_objects_role|
  json.extract! mod_objects_role, :id, :mod_object_id, :role_id, :canCreate, :canRead, :canUpdate, :canDelete
  json.url mod_objects_role_url(mod_objects_role, format: :json)
end
