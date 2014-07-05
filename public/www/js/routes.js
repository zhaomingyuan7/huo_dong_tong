myModule.config(function($routeProvider) {
    $routeProvider.when("/",{
        templateUrl: "pages/activity_list.html",
        controller: ActivityListController
    }).when("/create",{
           templateUrl:"pages/create_activity.html",
           controller:CreateActivityController
        }).when("/sign",{
            templateUrl:"pages/sign_up.html",
            controller:SignUpController
        }).when("/bid_list",{
            templateUrl:"pages/bidding_list.html",
            controller:BiddingListController
        }).when("/bid_sign",{
            templateUrl:"pages/bidding_sign.html",
            controller:BiddingSignController
        }).when("/bid_result",{
            templateUrl:"pages/bid_result.html",
            controller:BidResultController
        }).when("/count_price",{
            templateUrl:"pages/count_price.html",
            controller:CountPriceController
        }).when("/login",{
            templateUrl:"pages/user_login.html",
            controller:UserLoginController
    }).otherwise({
            redirectTo: "/"
    });
})

//myModule.config(function($routeProvider) {
//    $routeProvider.when("/", {
//        templateUrl: "pages/creat_action_page.html",
//        controller: CreatActionController
//    }).when("/002", {
//            templateUrl: "pages/action_list.html",
//            controller: ActionListController
//        }).when("/003", {
//            templateUrl: "pages/sign_up.html",
//            controller: SignUpController
//        }).otherwise({
//            redirectTo: "/"
//        });BiddingListController


