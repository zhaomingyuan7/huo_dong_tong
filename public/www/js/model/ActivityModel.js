function Activity(){

}

Activity.get_activity = function(){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    return _.filter(activities,function(activity){
        return activity.user == localStorage.current_user
    })//添加user
//    return JSON.parse(localStorage.getItem('activities')) || [];
}

Activity.search_repeating_name = function(name){
    return _.find(Activity.get_activity(),function(activities){ return activities.name == name})
}

Activity.search_sign_up_activity = function(){
    return _.find(Activity.get_activity(),
        function(activities){
            return activities.name == localStorage.activities_sign && activities.status == 'start'})
}
Activity.save_change_activity_status = function(name){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    _.find(activities,function(activities){
        if( activities.name == localStorage.activities_sign && activities.user == localStorage.current_user){//添加user
            activities.status = name;
        }})
    localStorage.setItem('activities', JSON.stringify(activities));
}

Activity.save_sign_up_activity = function(){
    var signing_up_activity = _.find(Activity.get_activity(),
        function(activities){ return activities.status == 'start' && activities.user == localStorage.current_user})
    if(signing_up_activity ){
        localStorage.signing_up = signing_up_activity.name;
    }
}

Activity.save_input_name = function(name){
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var activity = {};
    activity.user = localStorage.current_user;//添加用户
    activity.name = name;
    activity.status = 'no_start';
    activities.unshift(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    localStorage.activities_sign = name;
}

Activity.current_page_message = function(){
//    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    return _.filter(Sms.get_messages(),function(messages){//添加user
        return messages.activity == localStorage.activities_sign
    })
}

Activity.count_sign_up_number = function(){
   return Activity.current_page_message().length;
}

Activity.save_current_activity_name = function(name){
    localStorage.activities_sign = name;
}

Activity.judge_bid_list_start_button = function(){
    return _.find(Activity.get_activity(),function(activities){
        return activities.status == 'start'
    })
}

Activity.get_current_activity = function(){
    return _.find(Activity.get_activity(),function(activities){
        return activities.name == localStorage.activities_sign
    })
}

Activity.no_start_button = function(){
    if(localStorage.current_bidding || localStorage.signing_up){
        return 'start_disabled'
    }
    else{
        return 'start'
    }
}