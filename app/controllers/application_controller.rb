class ApplicationController < ActionController::Base
  include Pundit

  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def index
  end

  def current_user
    @current_user || @current_user = User.find(session[:user]['id'])
  end

private

  def record_not_found(error)
    render :json => {:error => error.message}, :status => :not_found
  end

  def user_not_authorized
    render :json => {:errors => ["You are not authorized to perform this action."]}, :status => :forbidden
  end

end
