#encoding: utf-8
class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token , :only => [:process_phone_login, :deal_with_upload_data]
  def login
    session[:name] = nil
    session[:two_step] = nil
  end

  def deal_with_upload_data

    Activity.update_activities(params[:user_name],params[:activities])
    BidList.update_bid_lists(params[:user_name],params[:bid_lists])
    BidMessage.update_bid_messages(params[:user_name],params[:bid_messages])
    Message.update_messages(params[:user_name],params[:messages])
    p '-------------------'
    respond_to do |format|
      p '-=============------------------'
      format.json {render json: {data:'true'}}
  end

  end

  def process_phone_login
    user = User.get_activity(params[:userName])
    respond_to do |format|
      if user && user.authenticate(params[:userPwd])
        format.json {render json: {data:'true'}}
      else
          format.json {render json: {data:'false'}}
        end
      end
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
      flash.now[:error]='用户名不存在或密码错误'
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
      flash.keep[:error]= '请输入用户名'
      render :forget_password_one
    else
      user = User.get_activity(params[:user][:name])
      if user
        session[:name]= params[:user][:name]
        redirect_to :forget_password_two
      else
        flash.now[:error] = '用户名不存在'
        render :forget_password_one
      end
    end
  end

  def forget_password_two
    if session[:name]
      @user = User.get_activity(session[:name])
      #@forget_password_question = @user[:forget_password_question]
      session[:forget_password_question] = @user[:forget_password_question]
    else
      redirect_to :forget_password_one
    end
  end

  def post_password_two
    @user = User.get_activity(session[:name])
    if params[:@user][:question_answer] == ''
      flash.now[:error] = '答案不能为空'
      render :forget_password_two
    else
      if @user.question_answer == params[:@user][:question_answer]
        session[:two_step]= 'step'
        redirect_to :forget_password_three
      else
        flash.now[:error] = '忘记密码答案错误'
        render :forget_password_two
      end
    end
  end

  def forget_password_three
    if !session[:name] && !session[:two_step]
      redirect_to :login
    elsif session[:name] && !session[:two_step]
      redirect_to :forget_password_two
    end
  end

  def post_password_three
    @user = User.get_activity(session[:name])
    if params[:user][:password] == '' || params[:user][:password_confirmation] == ''
      flash.now[:error] = '密码不能为空'
      render :forget_password_three
    else
      if params[:user][:password]!= params[:user][:password_confirmation]
        flash.now[:error]='两次密码输入不一致，请重新输入'
        render :forget_password_three
      else
        @user.password = params[:user][:password]
        @user.password_confirmation = params[:user][:password_confirmation]
        if @user.save
          cookies.permanent[:token] = @user.token
          render :welcome_user
        end
      end
    end
  end
end