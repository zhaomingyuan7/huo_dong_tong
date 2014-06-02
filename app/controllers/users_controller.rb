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

    @user = User.new(params[:user])
    @user.save
    p''''''''''''''''
    p @user
    p''''''''''''''''
    cookies.permanent[:token]=@user.token
    redirect_to :'welcome'
  end
end