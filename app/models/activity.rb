class Activity < ActiveRecord::Base

  attr_accessible :user, :name, :status

  def self.update_activities(user_name,activities)
    Activity.delete_all(:user =>user_name)
    activities.each do |activity|
    new_activity = Activity.new(activity)
    new_activity.save
    end
  end

  def self.get_user_activities(user_name)
    Activity.where(:user => user_name)
  end

end
