class AdminController < ApplicationController

  def add_user
    @user = User.new
  end

  def delete_user
    User.get_activity(params[:name]).delete
    redirect_to :welcome
  end

  def index_welcome
  end

end