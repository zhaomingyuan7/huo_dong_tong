//    notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
var native_accessor = {

    send_sms: function (phone, message) {
        console.log(phone, message);
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },

    process_received_message: function (json_message) {
        save_signing_up_message();

        function save_signing_up_message() {
            if(Sms.sign_up_BM(json_message).search(/bm/i) == 0){
                if (Sms.exist_signing_activity()) {
                    if (Sms.activity_un_start()) {
                        native_accessor.send_sms(json_message.messages[0].phone, "活动尚未开始，请稍后")
                        return;
                    }
                    if (Sms.activity_is_end()) {
                        native_accessor.send_sms(json_message.messages[0].phone, "Sorry，活动报名已结束")
                        return;
                    }
                }
                else {
                    if (Sms.is_same_sign_message(json_message)) {
                        native_accessor.send_sms(json_message.messages[0].phone, "您已报名成功，请勿重复报名")
                        return;
                    }
                    else {
                        Sms.save_activity_message(json_message)
                        refresh_page();
                        native_accessor.send_sms(json_message.messages[0].phone, "报名成功")
                    }
                }
            }


            function refresh_page() {
                var id_exist = document.getElementById('refresh_sign_up')
                if (id_exist) {
                    var scope = angular.element(id_exist).scope();
                    scope.$apply(function () {
                        scope.refresh_messages();
                    })
                }
            }
        }

        save_bidding_message();

        function save_bidding_message() {
            if(Sms.sign_up_jj(json_message).search(/jj/i) == 0){
                if (Sms.price_is_number(json_message)) {
                    if (Sms.no_exist_bidding()) {
                        if (Sms.is_sign_activity_phone(json_message)) {
                            if (Sms.bid_no_start()){
                                native_accessor.send_sms(json_message.messages[0].phone, "竞价未开始")
                                return;
                            }
                            else {
                                native_accessor.send_sms(json_message.messages[0].phone, "竞价已结束")
                                return;
                            }
                            }
                        else {
                            if(!localStorage.current_bidding&&!localStorage.signing_up){
                                return;
                            }
                            native_accessor.send_sms(json_message.messages[0].phone, "对不起，你没有报名此活动")
                            return;
                        }
                    }
                    else {
                        if (Sms.is_sign_activity_phone(json_message)) {
                            if(Sms.sign_this_activity(json_message)){
                                if(Sms.is_repeat_bid(json_message)){
                                    native_accessor.send_sms(json_message.messages[0].phone, "你已出价成功，请勿重复出价");
                                    return
                                }
                                Sms.save_bid_message(json_message);
                                refresh_bid_page();
                                native_accessor.send_sms(json_message.messages[0].phone, "恭喜！你已出价成功")
                                return;
                            }
                        }
                        if(Sms.no_bidding_and_signing()){
                            return;
                        }
                        native_accessor.send_sms(json_message.messages[0].phone, "对不起，你没有报名此活动")
                        return;
                    }
                }
            }
        }

        function refresh_bid_page() {

            var id_exist = document.getElementById('refresh_bidding_sign')
            if (id_exist) {
                var scope = angular.element(id_exist).scope();
                scope.$apply(function () {
                    scope.refresh_bid_messages();
                })
            }
        }
    }
};


function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}

