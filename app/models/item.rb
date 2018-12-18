class Item < ActiveRecord::Base

  validates_uniqueness_of :itemName

  has_and_belongs_to_many :tickets
end
