class Ticket < ActiveRecord::Base
  belongs_to :customer
  belongs_to :user
  belongs_to :equipmentType
  belongs_to :brand
  belongs_to :model
  belongs_to :color

  has_and_belongs_to_many :services
  has_and_belongs_to_many :items
end
