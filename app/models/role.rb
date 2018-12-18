class Role < ActiveRecord::Base
  acts_as_authorization_role

  has_many :mod_objects_roles
  has_many :mod_objects, :through => :mod_objects_roles

  #before_save :change_role_permissions

  def change_role_permissions(params)

    keys, values = params.map { |k,v| [k, v] }.transpose

    keys.each do |single_key|
      mo = ModObject.find_by_name(single_key.to_s)
      if (tmpMOR = self.mod_objects_roles.find_by_mod_object_id(mo.id))
        curr_hash_part = params[single_key]
        tmpMOR.canDelete = (curr_hash_part["canDelete"] == nil ) ? false : true
        tmpMOR.save
      else
        #ModObjectsRole.create()
      end

    end


    #@tmp = self.mod_objects_roles.find_by_mod_object_id(mod_object_id)
    #@tmp.canUpdate = true
    #@tmp.save
  end

end