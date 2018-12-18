class Brand < ActiveRecord::Base

  validates_uniqueness_of :brandName

  has_many :models
  has_many :tickets
end
