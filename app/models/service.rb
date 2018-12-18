class Service < ActiveRecord::Base

  validates_uniqueness_of :serviceName

  has_and_belongs_to_many :tickets
end
