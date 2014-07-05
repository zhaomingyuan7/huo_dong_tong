function SignUpController($scope, $navigate) {

    $scope.go_activity = function () {
        $navigate.go('/')
    };

    Activity.save_sign_up_activity();

    function judge_start_end() {
        var status = Activity.get_current_activity().status
        var judge_current_status = {
            no_start: function () {
                $scope.start_end = Activity.no_start_button();
            },
            start: function () {
                $scope.start_end = 'end';
            },
            end: function () {
                $scope.start_end = Activity.no_start_button();
            }
        }
        if (judge_current_status [status]) {
            judge_current_status [status]()
        }
    }

    judge_start_end();


    $scope.start_if_disabled = true;

    $scope.start_sign_up = function () {
        $scope.start_end = 'end';
        Activity.save_change_activity_status('start');
        Activity.save_sign_up_activity();
    }


    $scope.end_sign_up = function () {
        end_confirm();
    }


    function end_confirm() {
        var r = confirm("确认退出")
        if (!r) {
            $scope.start_end = "end";
        }
        if (r) {
            $scope.start_end = "start";
            Activity.save_change_activity_status('end');
            localStorage.signing_up = '';
            Activity.save_sign_up_activity();
            $navigate.go('/bid_list');
        }
    }


    $scope.refresh_messages = function () {
        $scope.messages = JSON.parse(localStorage.getItem('messages'));
        $scope.current_messages = Activity.current_page_message();
        $scope.number = Activity.count_sign_up_number();
    }

    $scope.refresh_messages();

    $scope.go_sign_up = function () {
        $navigate.go('/sign')
    }

    $scope.go_bid_list = function () {
        $navigate.go('/bid_list')
    }
}
