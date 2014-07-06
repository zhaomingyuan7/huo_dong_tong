class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :user
      t.string :name
      t.string :status

      t.timestamps
    end
  end
end
