class Message < ActiveRecord::Base

  attr_accessible :user, :name, :phone, :activity

  def self.update_messages(user_name,activities)
    Message.delete_all(:user =>user_name)
    activities.each do |activity|
      new_activity = Message.new(activity)
      new_activity.save
    end
  end

end
