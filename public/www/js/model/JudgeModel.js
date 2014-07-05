function Judge(){

}

Judge.exist_activities = function(){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    return activities.length == 0;
}

Judge.exist_current_bidding = function(){
    return !localStorage.current_bidding ;
}

Judge.signing_up_activity_background_is_yellow = function(name){
    return localStorage.signing_up == name
}

Judge.exist_current_bidding_and_bid_correspond_activity = function(name){
    return Bid.bid_list_color().activity == name&&localStorage.current_bidding
}

Judge.bidding_background_is_yellow = function(name){
    return localStorage.current_bidding == name && Bid.bid_list_color().activity == localStorage.activities_sign
}

Judge.start_button_can_not_click = function(){
    return localStorage.signing_up || localStorage.current_bidding
}

Judge.button_is_end = function(){
    return localStorage.current_bidding == localStorage.current_bid_name
}

Judge.button_is_disabled = function(){
    return localStorage.current_bidding && localStorage.current_bid_name != localStorage.current_bidding
}

Judge.button_is_start = function(){
    return !localStorage.current_bidding
}

Judge.bid_list_end_condition = function(){
    var bid_lists = JSON.parse(localStorage.getItem('bid_lists')) || [];
    return _.find(bid_lists,function(bid_lists ){
        return bid_lists.status == 'end'&&localStorage.current_bid_name == bid_lists.name&&bid_lists.activity == localStorage.activities_sign
    } )
}

Judge.bid_list_end_condition_two = function(){
    var bid_lists = JSON.parse(localStorage.getItem('bid_lists')) || [];
    return _.find(bid_lists,function(bid_lists ){
        return bid_lists.status == "end"&&bid_lists.name == localStorage.current_bid_name&&bid_lists.activity==localStorage.activities_sign
    } )
}