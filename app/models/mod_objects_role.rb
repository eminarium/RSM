class ModObjectsRole < ActiveRecord::Base
  self.primary_keys = :role_id, :mod_object_id
  belongs_to :mod_object
  belongs_to :role

end
