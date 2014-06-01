class User < ActiveRecord::Base
  has_secure_password
  def user_params
    params.require(:user).permit(:user_name, :password, :password_confirmation, :forget_password_question, :question_answer,:token)
  end
  before_create{generate_token(:token)}
  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column=>self[column])
  end
end
