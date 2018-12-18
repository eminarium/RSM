class Color < ActiveRecord::Base
  acts_as_authorization_object

  validates_uniqueness_of :colorName

  has_many :tickets
end
