function Sms(){

}

Sms.sign_up_name = function(json_message){
    return json_message.messages[0].message.substr(2).replace(/\s/g, '')
}

Sms.get_messages = function(){
    return JSON.parse(localStorage.getItem('messages')) || [];
}

Sms.sign_up_phone = function(json_message){
    return json_message.messages[0].phone
}

Sms.sign_up_BM = function(json_message){
    return json_message.messages[0].message.substr(0, 2).replace(/\s/g, '')
}

Sms.activities_name_with_activities_sign = function(){
    return _.find(Activity.get_activity(),
        function (activities) {
            return activities.name == localStorage.activities_sign
        })
}

Sms.save_activity_message = function(json_message){
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    var message = {};
    message = {name: Sms.sign_up_name(json_message), phone: Sms.sign_up_phone(json_message), activity: localStorage.signing_up};
    messages.unshift(message);

    localStorage.setItem("messages", JSON.stringify(messages));
}

Sms.is_same_sign_message = function(json_message){
    return _.find(Sms.get_messages(),
        function (message) {
            return message.phone ==  Sms.sign_up_phone(json_message) && message.activity == localStorage.signing_up
        })
}

Sms.activity_un_start = function(){
    return Sms.activities_name_with_activities_sign().status == 'no_start'
}

Sms.activity_is_end = function(){
    return Sms.activities_name_with_activities_sign().status == 'end'
}

Sms.exist_signing_activity = function(){
    return localStorage.signing_up == ''
}

Sms.sign_up_jj = function(json_message){
    return json_message.messages[0].message.substr(0, 2).replace(/\s/g, '')
}

Sms.bid_message_price = function(json_message){
    return json_message.messages[0].message.substr(2).replace(/\s/g, '')
}

Sms.bid_message_phone = function(json_message){
    return json_message.messages[0].phone
}

Sms.is_sign_activity_phone = function(json_message){
    return _.find(Sms.get_messages(),function(messages){
        return messages.phone == Sms.bid_message_phone(json_message)
    })
}


Sms.is_repeat_bid = function(json_message){
    var bid_messages = JSON.parse(localStorage.getItem('bid_messages')) || [];
    return _.find(bid_messages,function(bid_messages){
       return bid_messages.activity == localStorage.activities_sign && bid_messages.bid == localStorage.current_bidding && bid_messages.phone == Sms.bid_message_phone(json_message)
    })
}

Sms.save_bid_message = function(json_message){
    var bid_messages = JSON.parse(localStorage.getItem('bid_messages')) || [];
    var bid_message = {};
    bid_message.phone = Sms.bid_message_phone(json_message);
    bid_message.price = Sms.bid_message_price(json_message);
    bid_message.activity = localStorage.activities_sign;
    bid_message.bid = localStorage.current_bidding;
    bid_message.name = Sms.is_sign_activity_phone(json_message).name;
    bid_messages.push(bid_message);
    localStorage.setItem("bid_messages", JSON.stringify(bid_messages));
}

Sms.no_bidding_and_signing = function(){
    return !localStorage.current_bidding&&!localStorage.signing_up
}

Sms.price_is_number = function(json_message){
    return isNaN(Sms.bid_message_price(json_message)) == 0
}

Sms.no_exist_bidding = function(){
    return localStorage.current_bidding == ''
}

Sms.sign_this_activity = function(json_message){
    return _.find(Sms.get_messages(),function(messages){
        return messages.activity == localStorage.activities_sign && messages.phone == Sms.bid_message_phone(json_message)
    })
}

Sms.bid_no_start = function(){
    var bid_lists = JSON.parse(localStorage.getItem('bid_lists')) || [];
    return _.find(bid_lists,function(bid_lists){
        return bid_lists.status == 'un_start' && bid_lists.activity == localStorage.activities_sign && bid_lists.name == localStorage.current_bid_name
    })
}

