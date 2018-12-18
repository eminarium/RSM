json.array!(@items) do |item|
  json.extract! item, :id, :itemName, :itemPrice, :itemDescription
  json.url item_url(item, format: :json)
end
