class BidMessage < ActiveRecord::Base

  attr_accessible :user, :phone, :price, :activity, :bid, :name

  def self.update_bid_messages(user_name,activities)
    BidMessage.delete_all(:user =>user_name)
    activities.each do |activity|
      new_activity = BidMessage.new(activity)
      new_activity.save
    end
  end

end
