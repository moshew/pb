//var domain = 'http://pod.itv-channel.org/';
var domain = 'http://192.168.31.123/';

var app = angular.module('myApp', ['ngAnimate']);
/*
app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://pod.itv-channel.org/**'
    ])
}]);
*/

app.controller('myCtrl', function($scope, $http, $timeout, $interval) {
    var temp_id = '';
    var login_id = '';
    var pagePromise = null;
	
    var req_mode = false;

    $scope.init = function () {
        $scope.id = '';
        $scope.credit = 0;
        $scope.bg_image = 'bg.jpg';
        $scope.req1 = true;
		$scope.counter = 1;
		/*
        $http.jsonp(domain + 'config.php')
            .then(function (result) {
                $scope.config = result
				*/
		$scope.x1 = window.innerWidth;
		$scope.y1 = window.innerHeight;
    };
	
	

    $scope.keypress = function (e) {
        temp_id += String.fromCharCode(e.which);
        if (temp_id.length == 11) {
            $scope.id = temp_id.substr(0,10);
            temp_id = '';
            if ($scope.config.admin.indexOf($scope.id) != -1) {
                $scope.bg_image = ($scope.bg_image != '') ? '' : 'bg.jpg';
            } else if ($scope.bg_image == '') {
                $http.jsonp(domain + 'load.tag.php?tag='+$scope.id+'&value=22')
                    .then(function (result) {
                        //
                    });
            }  else {
                if ($scope.bg_image == 'bg.jpg') {
                    $http.jsonp(domain + 'login.php?tag='+$scope.id)
                        .then(function (result) {
                            login_id = $scope.id;
                            $scope.credit = result.data.credit;
                        });
                    $scope.bg_image = 'pod.jpg';
                    pagePromise = $timeout(function() { $scope.cancel(); }, 60000);
                } else {
                    if (login_id != '') {
                        $http.jsonp(domain + 'load.credit.php?tag=' + login_id + '&credit=' + $scope.id)
                            .then(function (result) {
                                $scope.credit = result.data.credit;
                            });
                    }
                }
            }
        }
    };

	var stop;
	var photos_num;
	$scope.click = function () {
		$scope.start_pb = !$scope.start_pb;
		$interval.cancel(stop);
		if ($scope.start_pb) {
			photos_num = 0;
			$scope.counter = 0;
			$scope.show_photobg = false;
			$scope.show_photor = false;
			stop = $interval(function() {
				//if ($scope.counter==4) $interval.cancel(stop);
				$scope.counter++;
				if ($scope.counter==4) {
					$http.jsonp(domain+"save.php?id="+photos_num)
					$scope.show_photo = true;
					$timeout(function() { $scope.show_photo = false; }, 120);
					photos_num++;
					if (photos_num<4) $scope.counter = 0;
					else {
						$interval.cancel(stop);
						$scope.imageURL = domain+"run.php?_ts=" + new Date().getTime();
						$timeout(function() { 
							$scope.imageURL = domain+"run.php?_ts=" + new Date().getTime(); }, 750);
						$timeout(function() { $scope.show_photobg = true; }, 400);
						$timeout(function() { $scope.show_photor = true; }, 1500);
					}
				};
			}, 1200);
		}
    };
	
    $scope.cancel = function () {
        $timeout.cancel(pagePromise);
        req_mode = false;
        login_id='';
        $scope.bg_image = 'bg.jpg';
        $scope.credit = "0.00";
    };
	

});