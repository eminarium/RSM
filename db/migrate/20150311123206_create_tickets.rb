class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.references :customer, index: true
      t.references :user, index: true
      t.references :equipmentType, index: true
      t.string :ticketItemSerialNum
      t.references :brand, index: true
      t.references :model, index: true
      t.references :color, index: true
      t.text :ticketItemDesc
      t.datetime :ticketAcceptDateTime
      t.datetime :ticketPredictionDateTime
      t.datetime :ticketReadyDateTime
      t.text :ticketProblemDesc
      t.text :ticketSolutionDesc

      t.timestamps
    end
  end
end
