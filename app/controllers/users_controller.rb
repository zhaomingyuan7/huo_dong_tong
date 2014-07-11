#encoding: utf-8
class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token , :only => [:only_update_bid_list,:end_bidding, :synchronous_show, :process_phone_login, :deal_with_upload_data, :synchronous_bid_message]
  def login
    session[:name] = nil
    session[:two_step] = nil
    session[:current_user] = nil
    session[:bid_end] = nil
  end

  def deal_with_upload_data
    Activity.update_activities(params[:user_name],params[:activities])
    BidList.update_bid_lists(params[:user_name],params[:bid_lists])
    BidMessage.update_bid_messages(params[:user_name],params[:bid_messages])
    Message.update_messages(params[:user_name],params[:messages])
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def only_update_bid_list
    BidList.update_bid_lists(params[:user_name],params[:bid_lists])
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end

  def synchronous_bid_message
    BidMessage.create(params[:bid_messages])
    respond_to do |format|
      format.json {render json: {data:'true'}}
    end
  end


  def synchronous_show

    @winner = session[:winner]
    @price = session[:price]
    @phone = session[:phone]
    @winner_name = session[:winner_name]
    p '-------------------------------------------------------'
    p params[:winner]
    p @winner == 'winner'
    p @winner == 'no_winner'
    p session[:winner]
    p session[:price]
    p session[:phone]
    p '-------------------------------------------------------'
    if BidList.get_bidding_name(session[:current_user]) != []
      @bid = BidList.get_bidding_name(session[:current_user])[0].name
      @activity = BidList.get_bidding_name(session[:current_user])[0].activity
      @bid_messages = BidMessage.get_current_bid_message(session[:current_user],@activity,@bid).paginate(page: params[:page],per_page:10)
    end
  end

  def end_bidding
    session[:winner] = nil
    session[:price] = nil
    session[:phone] = nil
    session[:winner_name] = nil
    p '======================================'
    p session[:price]
    p '======================================'
    if params[:winner]
      session[:winner] = params[:winner]
      session[:price] =  params[:price]
      session[:phone] = params[:phone]
      session[:winner_name] = params[:name]
      p '-------------------------------------------------------'
      p params[:winner]
      p session[:winner]
      p session[:price]
      p session[:phone]
      p '-------------------------------------------------------'
    else
      session[:winner] = params[:no_winner]
      p '+++++++++++++++++++++++++++++++++++++++++++++++++++++++'
      p params[:winner]
      p session[:winner] == 'no_winner'
      p session[:winner]
      p '+++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    end
    respond_to do |format|
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
    session[:current_user] = nil
    if !current_user
      redirect_to :login
    else
      @users=User.all
      @users = User.paginate(page: params[:page],per_page:10).where(:admin => false)
    end
  end

  def welcome_user
    session[:bid_end] = nil
    if !current_user
      redirect_to :login
    else
      @count = 0
      if current_user.admin
        if !session[:current_user]
          @activities = Activity.get_user_activities(params[:admin_get_user]).paginate(page: params[:page],per_page:10)
          session[:current_user]=  params[:admin_get_user]
        else
          @activities = Activity.get_user_activities(session[:current_user]).paginate(page: params[:page],per_page:10)
        end
      else
        @activities = Activity.get_user_activities(current_user.name).paginate(page: params[:page],per_page:10)
        session[:current_user]=  current_user.name
      end
    end
  end

  def bid_list
    @count = 0
    @current_bid_lists = BidList.get_bid_list(session[:current_user] ,params[:activity_name]).paginate(page: params[:page],per_page:10)
    @activity_name = params[:activity_name]
    @bid_lists = @current_bid_lists.sort_by{|x| x.name}
  end

  def sign_up
    @count = 0
    @messages = Message.get_message(session[:current_user] ,params[:activity_name]).paginate(page: params[:page],per_page:10)
    @activity_name = params[:activity_name]
    p params[:activity_name]
  end

  def bid_detail
    @count = 0
    @bid_messages = BidMessage.get_current_bid_message(session[:current_user] ,params[:activity_name],params[:bid_name]).paginate(page: params[:page],per_page:10)
    @current_bid = params[:bid_name]

    @current_bid_messages = @bid_messages.group_by{|s| s.price}
    @current_prices = @current_bid_messages.keys
    @prices = @current_prices.sort

    current_bid_information = BidList.get_every_bid_information(session[:current_user] ,params[:activity_name],params[:bid_name])
    if current_bid_information[0].status == 'start'
      flash.now[:bidding] = 'true'
      return
    end
    @prices.each do |price|
      if BidMessage.get_price_number(session[:current_user] ,params[:activity_name],@current_bid,price).length == 1
        @successful_price = price
        flash.now[:success] = 'true'
        @successful_name = BidMessage.get_price_number(session[:current_user] ,params[:activity_name],@current_bid,@successful_price)[0].name
        @successful_phone = BidMessage.get_price_number(session[:current_user] ,params[:activity_name],@current_bid,@successful_price)[0].phone
        break
      else
        flash.now[:fail] = 'true'
      end
    end
  end

  def price_count
    @bid_messages = BidMessage.get_current_bid_message(session[:current_user] ,params[:activity_name],params[:bid_name]).paginate(page: params[:page],per_page:10)
    @current_bid = params[:bid_name]
    @current_bid_messages = @bid_messages.group_by{|s| s.price}
    @current_prices = @current_bid_messages.keys
    @prices = @current_prices.sort

    current_bid_information = BidList.get_every_bid_information(session[:current_user] ,params[:activity_name],params[:bid_name])
    if current_bid_information[0].status == 'start'
      flash.now[:bidding] = 'true'
      return
    end

    @prices.each do |price|
      if BidMessage.get_price_number(session[:current_user] ,params[:activity_name],@current_bid,price).length == 1
        @successful_price = price
        flash.now[:success] = 'true'
        @successful_name = BidMessage.get_price_number(session[:current_user] ,params[:activity_name],@current_bid,@successful_price)[0].name
        @successful_phone = BidMessage.get_price_number(session[:current_user] ,params[:activity_name],@current_bid,@successful_price)[0].phone
        break
      else
        flash.now[:fail] = 'true'
      end
    end
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