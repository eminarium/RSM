json.array!(@services) do |service|
  json.extract! service, :id, :serviceName, :servicePrice, :serviceDescription
  json.url service_url(service, format: :json)
end
