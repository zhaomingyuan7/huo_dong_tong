class AdminController < ApplicationController
  #before_action :signed_in_user, only: [:index, :edit, :update, :destroy]
  #before_action :correct_user,   only: [:edit, :update]
  #before_action :admin_user,     only: :destroy
  def add_user
    @user = User.new
  end
  def delete_user
    User.get_activity(params[:name]).delete
    redirect_to :welcome
  end
  #def admin_user
  #  redirect_to(root_path) unless current_user.admin?
  #end
  def index_welcome
  end

  #def destroy
  #  User.find(params[:id]).destroy
  #  flash[:success] = 'User destroyed.'
  #  redirect_to :login
  #end

  #def admin_user
  #  redirect_to(root_path) unless current_user.admin?
  #end

end