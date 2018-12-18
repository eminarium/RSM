class User < ActiveRecord::Base
  acts_as_authorization_subject  :association_name => :roles

  #attr_accessor :password, :password_confirmation
  acts_as_authentic do |c|
    c.login_field = :userLogin
  end

  def has_role?(role_id, obj=nil)
    self.role_id == role_id
  end

  def has_role!(role_id, obj=nil)
    self.role_id = role_id
    save!
  end

end
