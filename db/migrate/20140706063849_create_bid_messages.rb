class CreateBidMessages < ActiveRecord::Migration
  def change
    create_table :bid_messages do |t|
      t.string :user
      t.string :phone
      t.string :price
      t.string :activity
      t.string :bid
      t.string :name

      t.timestamps
    end
  end
end
