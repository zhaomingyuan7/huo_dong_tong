class Message < ActiveRecord::Base

  attr_accessible :user, :name, :phone, :activity

  def self.update_messages(user_name,activities)
    Message.delete_all(:user =>user_name)
    activities.each do |activity|
      new_activity = Message.new(activity)
      new_activity.save
    end
  end

  def self.get_message(user_name,activity)
    Message.where(:user => user_name, :activity => activity)
  end


end
