json.array!(@tickets) do |ticket|
  json.extract! ticket, :id, :customer_id, :user_id, :equipmentType_id, :ticketItemSerialNum, :brand_id, :model_id, :color_id, :ticketItemDesc, :ticketAcceptDateTime, :ticketPredictionDateTime, :ticketReadyDateTime, :ticketProblemDesc, :ticketSolutionDesc
  json.url ticket_url(ticket, format: :json)
end
