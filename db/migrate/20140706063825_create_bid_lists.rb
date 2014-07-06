class CreateBidLists < ActiveRecord::Migration
  def change
    create_table :bid_lists do |t|
      t.string :user
      t.string :activity
      t.string :name
      t.string :status

      t.timestamps
    end
  end
end
