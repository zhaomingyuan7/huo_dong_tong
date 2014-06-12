class AdminController < ApplicationController
  def add_user
    #params.permit!
    #@user = User.new(params[:user])
    #if @user.save
    #  cookies.permanent[:token] = @user.token
    #  redirect_to :'welcome_user'
    #else
    #  render :register
    #end
    if !current_user
      redirect_to :welcome
    #else
    #  render :add_user
    end
    @user = User.new
  end

end