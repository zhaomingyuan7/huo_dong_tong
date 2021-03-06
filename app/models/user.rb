class User < ActiveRecord::Base
  has_secure_password
  before_create{generate_token(:token)}
  attr_accessible :name, :password, :password_confirmation, :forget_password_question, :question_answer, :token
  validates :name, :presence => true,  :uniqueness => {:case_sensitive => false}
  validates :forget_password_question, :presence => true
  validates :question_answer, :presence => true
  validates :password_confirmation, :presence => true

  def generate_token(column)
    begin
      self[column]=SecureRandom.urlsafe_base64
    end while User.exists?(column=>self[column])
  end
  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :forget_password_question, :question_answer, :token)
  end
  def self.get_activity(name)
    User.find_by_name(name)
  end
end
#user = User.create({:name=>'admin', :password=>'admin', :password_confirmation => 'admin',:admin => true, :token=>'kajdlioew%^%hjks', :forget_password_question=>'admin', :question_answer=>'admin'})