#encoding: utf-8
class UsersController < ApplicationController

  def login
  end

  def welcome
    if !current_user
      redirect_to :login
    else
      @users=User.all
      @users = User.paginate(page: params[:page],per_page:10)

    end
  end

  def welcome_user
  end

  def register
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if current_user
      if @user.save
        redirect_to :welcome
      else
        render 'admin/add_user'
      end
    else
      if @user.save
        cookies.permanent[:token] = @user.token
        redirect_to :welcome_user
      else
        render :register
      end
    end
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      if user.admin?
        redirect_to :welcome
      else
        redirect_to :welcome_user
      end
    else
      flash[:error]='用户名不存在或密码错误'
      render :login
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :login
  end
end