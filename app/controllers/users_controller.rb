#encoding: utf-8
class UsersController < ApplicationController
  def login
  end

  def welcome
    @users=User.all
    #@users = User.paginate(:page => params[:page], :per_page => 10, :order => 'updated_at DESC')
    @users = User.paginate(page: params[:page],per_page:10)
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
      cookies.permanent[:token] = @user.token
      redirect_to :'welcome'
    else
      render :register
    end
  end

  def create_login_session
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password_digest])
      redirect_to :welcome
    else
      redirect_to :login
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :login
  end

end