Rails.application.routes.draw do
  root 'users#login'
  get '/welcome' => 'users#welcome'
  get '/register' => 'users#register'
  post 'create_login_session' => 'users#create_login_session'
  get 'login' => 'users#login'
  delete 'logout' => 'users#logout', :as => 'logout'
  resources :users,only: [:create]
  get '/welcome_user' => 'users#welcome_user'
  get 'add_user' => 'admin#add_user',:as => 'add_user'
  get 'index_welcome' => 'users#welcome',:as => 'index_welcome'
  delete 'delete_user'=>'admin#delete_user' ,:as => 'delete_user'
  get '/change_password' => 'admin#change_password', :as => 'change_password'
  post 'post_password' => 'admin#post_password'
  get '/forget_password_one' => 'users#forget_password_one'
  post 'post_password_one' => 'users#post_password_one'
  get '/forget_password_two' => 'users#forget_password_two'
  get '/forget_password_three' => 'users#forget_password_three'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
