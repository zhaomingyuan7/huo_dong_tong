function Bid(){

}

Bid.storage_bid_list_when_click_start = function(){
    var bid_lists = JSON.parse(localStorage.getItem('bid_lists')) || [];
    var bid_list = {};
    bid_list.user = localStorage.current_user;//添加user
    bid_list.activity = localStorage.activities_sign;
    var bid_list_name = _.filter(Bid.bid_lists(),//add user
        function (bid_lists){ return bid_lists.activity == localStorage.activities_sign})
    bid_list.name = bid_list_name.length + 1;
    bid_list.status = 'un_start'
    bid_lists.unshift(bid_list);
    localStorage.setItem('bid_lists', JSON.stringify(bid_lists));
    localStorage.setItem('current_bid_name', bid_lists[0].name);
}

Bid.save_current_bid_list_page = function(){
    return  _.filter(Bid.bid_lists(),
        function(bid_lists){return bid_lists.activity == localStorage.activities_sign})
}

Bid.judge_bid_list_start_button = function(){
    _.find(Activity.get_activity(),function(activities){
        if(activities.status == 'start'){
            return true;
        }
    })
}s

Bid.save_current_bid_name = function(name){
    localStorage.current_bid_name = name;
}

Bid.bid_lists = function(){
    var user_bid_lists = JSON.parse(localStorage.getItem('bid_lists')) || [];
    return _.filter(user_bid_lists,function(bid_list){
        return bid_list.user == localStorage.current_user
    })//添加user
//    return JSON.parse(localStorage.getItem('bid_lists')) || [];
}

Bid.bid_list_color = function(){
    return _.find(Bid.bid_lists(),function (bid_lists) {
            return bid_lists.status == 'start'
        })
}

Bid.save_bidding_name = function(){
    return _.find(Bid.bid_lists(),
        function(bid_lists){return bid_lists.status == 'start'})
}


Bid.save_current_bidding_name = function(name){
    localStorage.current_bidding = name;
}

Bid.creat_current_bid_message = function(){
    return _.filter(Sms.get_bid_messages(),//添加user
        function(bid_messages){
            return bid_messages.activity == localStorage.activities_sign && bid_messages.bid==localStorage.current_bid_name
        })
}

Bid.save_bid_sign_status = function(name){
    var bid_lists = JSON.parse(localStorage.getItem('bid_lists')) || [];
    _.find(bid_lists,function(bid_lists){
        if( bid_lists.activity == localStorage.activities_sign && bid_lists.name == localStorage.current_bid_name && bid_lists.user == localStorage.current_user){//添加user
            bid_lists.status = name;
        }})
    localStorage.setItem('bid_lists', JSON.stringify(bid_lists));
}

Bid.count_bid_sign_number = function(){
    return Bid.creat_current_bid_message().length;
}

Bid.bid_consult_show = function(){
//    var bid_messages = JSON.parse(localStorage.getItem('bid_messages')) || [];
    return _.filter(Sms.get_bid_messages(),
        function (bid_messages) {
            return bid_messages.activity == localStorage.activities_sign && bid_messages.bid == localStorage.current_bid_name
        })
}

Bid.current_bid_consult = function(){
    return _.sortBy(Bid.bid_consult_show(),
        function (bid_consults) {
            return (bid_consults.price)
        })
}

Bid.count_price_show = function(){
//    var bid_messages = JSON.parse(localStorage.getItem('bid_messages')) || [];
    return _.filter(Sms.get_bid_messages(),
        function (bid_messages) {
            return bid_messages.activity == localStorage.activities_sign && bid_messages.bid == localStorage.current_bid_name
        })
}

Bid.current_count_price = function(){
    return _.sortBy(Bid.count_price_show(),
        function (count_price_show) {
            return (count_price_show.price)
        })
}

Bid.price_num_count = function(){
    return _.countBy(Bid.current_count_price(),
        function (current_count_price) {
            return current_count_price.price
        });
}

Bid.price_and_num = function(){
    return _.map(Bid.price_num_count(), function (value, key) {
        return {"price": key, "count": value}
    })
}

Bid.count_price_one = function(){
    return _.find(Bid.price_and_num(),
        function (price_and_num) {
            return price_and_num.count == 1
        })
}

Bid.count_price_first_information = function(){
   return _.find(Bid.current_count_price(),
        function (current_count_price) {
            return current_count_price.price == Bid.count_price_one().price
        })
}

Bid.result_data = function(){
    console.log(Bid.price_and_num()[0].price,'=====================')
    var bid_results = JSON.parse(localStorage.getItem('bid_results')) || [];
    var bid_result = {}
    bid_result.price = Bid.price_and_num().price;
    bid_result.count = Bid.price_and_num().count;
    bid_results.push(bid_result);
    localStorage.setItem('bid_results', JSON.stringify(bid_results));
    console.log(bid_results,'bid_results')
}