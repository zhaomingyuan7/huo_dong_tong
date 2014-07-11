function CreateActivityController($scope, $navigate,$http) {

    $scope.input_name = ''

    $scope.list_is_null = true;

    if (Judge.exist_activities()) {
        $scope.list_is_null = false;
    }

    $scope.go_activity = function () {
        $navigate.go('/')
    }

    $scope.go_sign = function () {
        $scope.showing_the_same_name = Search_activities_name_if_repeat($scope.input_name);
        if ($scope.showing_the_same_name) {
            return;
        }
        Activity.save_input_name($scope.input_name);
        $navigate.go('/sign');
    }

    function Search_activities_name_if_repeat(name) {
        Activity.search_repeating_name(name);
        if (!Activity.search_repeating_name(name)) {
            return false;
        }
        return true;
    }

}