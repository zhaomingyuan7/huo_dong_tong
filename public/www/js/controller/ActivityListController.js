function ActivityListController($scope, $navigate,$http) {

    $scope.go_create = function () {
        $navigate.go('/create')
    }

    if(!Judge.exist_current_bidding()){
        $scope.creat_is_disabled = true;
    }

    var activities = JSON.parse(localStorage.getItem('activities'));

    var user_activities = _.filter(activities,function(activity){
        return activity.user == localStorage.current_user
    })//活动列表显示添加user

    $scope.activities = user_activities;

    $scope.activity_go_to_sign_up = function (activity) {
        Activity.save_current_activity_name(activity)
        $navigate.go('/sign');
    }

    $scope.signing_up_activity = function (name) {
        if (Judge.signing_up_activity_background_is_yellow(name)) {
            return "start";
        }
        if(Bid.bid_list_color()){
            if(Judge.exist_current_bidding_and_bid_correspond_activity(name)){
                return "start";
            }
        }
    }

    $scope.upload_data = function(){
        Activity.upload_data($http)
    }

}