class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token

  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :configure_permitted_parameters, if: :devise_controller?

  serialization_scope :view_context

  def index
  end

  def current_user
    @current_user || get_current_user
  end

  def authenticate_current_user
    head :unauthorized if get_current_user.nil?
  end

  def get_current_user
    return nil unless cookies[:auth_headers]
    auth_headers = JSON.parse(cookies[:auth_headers])

    expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
    current_user = User.find_by(uid: auth_headers["uid"])

    if current_user &&
       current_user.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

      @current_user = current_user
    end
    @current_user
  end

private

  def record_not_found(error)
    render :json => {:error => error.message}, :status => :not_found
  end

  def user_not_authorized
    render :json => {:errors => ["You are not authorized to perform this action."]}, :status => :forbidden
  end

  def configure_permitted_parameters
      permitted_parameters = devise_parameter_sanitizer.instance_values['permitted']
      permitted_parameters[:sign_up] << :name
  end

end
