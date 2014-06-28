#encoding: utf-8
class UsersController < ApplicationController

  def login
  end

  def welcome
    if !current_user
      redirect_to :login
    else
      @users=User.all
      @users = User.paginate(page: params[:page],per_page:10).where(:admin => false)

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

  def forget_password_one
  end

  def post_password_one
    if params[:user][:name]==''
      flash[:error]= '请输入用户名'
      render :forget_password_one
    else
      user = User.get_activity(params[:user][:name])
      session[:name]= params[:user][:name]
      if user
        redirect_to :forget_password_two
      else
        flash[:error] = '用户名不存在'
        render :forget_password_one
      end
    end
  end

  def forget_password_two
  end

  def post_password_two
    @user = User.get_activity(session[:name])
    if params[:@user][:question_answer] == ''
      flash[:error] = '答案不能为空'
      render :forget_password_two
    else
      if @user.question_answer == params[:@user][:question_answer]
        redirect_to :forget_password_three
      else
        flash[:error] = '忘记密码答案错误'
        render :forget_password_two
      end
    end
  end

  def forget_password_three
  end

  def post_password_three
  end

end