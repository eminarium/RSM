class ModObject < ActiveRecord::Base
  has_many :mod_objects_roles
  has_many :roles, :through => :mod_objects_roles
end
