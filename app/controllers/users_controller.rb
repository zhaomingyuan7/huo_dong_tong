#encoding: utf-8
class UsersController < ApplicationController
  def login
  end
  def welcome
  end
  def post
  end
  def register
    @user = User.new
  end
  def create
    params.permit!
    @user = User.new(params[:user])
    if @user.save
      cookies.permanent[:token]=@user.token
      redirect_to :'welcome'
    else
      render :register
    end
  end
end