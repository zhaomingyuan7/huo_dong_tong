class AdminController < ApplicationController

  def add_user
    if !current_user
      redirect_to :login
    else
      @user = User.new
    end
  end

  def delete_user
    User.get_activity(params[:name]).delete
    redirect_to :welcome
  end

  def index_welcome
  end

  def change_password
    @user = User.new
  end

end