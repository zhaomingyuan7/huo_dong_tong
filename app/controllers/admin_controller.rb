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
    if !current_user
      redirect_to :login
    else
      session[:name]= params[:name]
    end
  end

  def post_password
    @user = User.get_activity(session[:name])
    if params[:user][:password]!= params[:user][:password_confirmation] || params[:user][:password]== ''
      flash[:error]='两次密码输入不一致，请重新输入'
      render :change_password
    else
      @user.password = params[:user][:password]
      @user.password_confirmation = params[:user][:password_confirmation]
      if @user.save
        flash[:error]='成功'
        render :change_password
      end
    end
  end
end