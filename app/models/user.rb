class User < ActiveRecord::Base
  has_secure_password
  before_create{generate_token(:token)}
  validates :name, :presence => true, :uniqueness => {:case_sensitive => false}
  validates :forget_password_question, :presence => true
  validates :question_answer, :presence => true
  validates :password_digest, :presence => true
  validates :password_confirmation, :presence => true

  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column=>self[column])
  end
  def user_params
    params.require(:user).permit(:name, :password_digest, :forget_password_question, :question_answer, :token)
  end
  def self.get_activity(user_name)
    User.find_by_user_name(user_name)
  end
end