class Customer < ActiveRecord::Base
  has_many :tickets
end
