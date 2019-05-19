Rails.application.routes.draw do
  devise_for :users

  namespace :api do
      mount_devise_token_auth_for 'User', at: 'auth'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "application#index"

  resources :groups, only: [:index, :create ,:update, :show] do
    member do
    end
  end

  resources :projects, only: [:index, :create ,:update, :show] do
    member do
      get :members
      post :add_member
      delete :remove_member
      get :status_vs_assignee_view
    end
  end

  resources :todos, only: [:index, :create ,:update, :show, :destroy] do
  end

end
