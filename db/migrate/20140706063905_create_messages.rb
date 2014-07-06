class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :user
      t.string :name
      t.string :phone
      t.string :activity

      t.timestamps
    end
  end
end
