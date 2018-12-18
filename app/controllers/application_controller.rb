class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  helper_method :current_user

  private

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end

  rescue_from 'Acl9::AccessDenied', :with => :access_denied

  private

  def access_denied
    if current_user
      render :template => 'home/access_denied'
    else
      #flash[:notice] = 'Access denied. Try to log in first.'
      redirect_to login_path
    end
  end

end
