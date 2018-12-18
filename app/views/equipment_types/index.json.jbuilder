json.array!(@equipment_types) do |equipment_type|
  json.extract! equipment_type, :id, :equipmentTypeName, :equipmentTypeDesc
  json.url equipment_type_url(equipment_type, format: :json)
end
