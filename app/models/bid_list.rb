class BidList < ActiveRecord::Base

  attr_accessible :user, :activity, :name, :status

  def self.update_bid_lists(user_name,activities)
    BidList.delete_all(:user =>user_name)
    activities.each do |activity|
      new_activity = BidList.new(activity)
      new_activity.save
    end
  end

  def self.get_bid_list(user_name,activity)
    BidList.where(:user => user_name, :activity => activity)
  end

  def self.get_every_bid_information(user_name,activity,bid)
    BidList.where(:user => user_name, :activity => activity, :name => bid)
  end

  def self.get_bidding_name(user_name)
    BidList.where(:user => user_name, :status => 'start')
  end

end
