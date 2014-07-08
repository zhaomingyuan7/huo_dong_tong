class BidMessage < ActiveRecord::Base

  attr_accessible :user, :phone, :price, :activity, :bid, :name

  def self.update_bid_messages(user_name,activities)
    BidMessage.delete_all(:user =>user_name)
    activities.each do |activity|
      new_activity = BidMessage.new(activity)
      new_activity.save
    end
  end

  def self.get_bid_message_number(user_name,activity,bid)
    BidMessage.where(:user => user_name, :activity => activity, :bid => bid)
  end

  def self.get_current_bid_message(user_name,activity,bid_name)
    BidMessage.where(:user => user_name, :activity => activity, :bid => bid_name)
  end

  def self.get_price_number(user_name,activity,bid,price)
    BidMessage.where(:user => user_name, :activity => activity, :bid => bid, :price => price)
  end

end
