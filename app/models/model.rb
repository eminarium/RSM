class Model < ActiveRecord::Base
  validates_uniqueness_of :modelName
  belongs_to :brand
  has_many :tickets
end
