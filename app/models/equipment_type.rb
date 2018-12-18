class EquipmentType < ActiveRecord::Base

  validates_uniqueness_of :equipmentTypeName

  has_many :tickets
end
