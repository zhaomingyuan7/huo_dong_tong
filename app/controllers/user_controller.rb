class UserController < ApplicationController
  def login
  end
  def welcome
  end
  def register
  end
  def create
    @user = User.new(params[:user])
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :root, :notice => "注册成功"
    else
      render :register
    end
  end
end