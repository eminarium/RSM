json.array!(@brands) do |brand|
  json.extract! brand, :id, :brandName
  json.url brand_url(brand, format: :json)
end
