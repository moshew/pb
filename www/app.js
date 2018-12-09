//var domain = 'http://pod.itv-channel.org/';
var domain = '/srv/';

var app = angular.module('myApp', []);
/*
app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://pod.itv-channel.org/**'
    ])
}]);
*/

app.controller('myCtrl', function($scope, $http, $timeout) {
    var temp_id = '';
    var login_id = '';
    var pagePromise = null;
    var req_mode = false;

    $scope.init = function () {
        $scope.id = '';
        $scope.credit = 0;
        $scope.bg_image = 'bg.jpg';
        $scope.req1 = true;
        $http.jsonp(domain + 'config.php')
            .then(function (result) {
                $scope.config = result.data;
            });
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

    $scope.cancel = function () {
        $timeout.cancel(pagePromise);
        req_mode = false;
        login_id='';
        $scope.bg_image = 'bg.jpg';
        $scope.credit = "0.00";
    };

    $scope.req = function(id) {
        if (login_id != '' && !req_mode) {
            req_mode = true;
            $http.jsonp(domain + 'request.pod.php?tag=' + login_id + '&id=' + id)
                .then(function (result) {
                    if ($scope.credit != result.data.credit) {
                        $scope.credit = result.data.credit;
                        $http.jsonp('request.php')
                            .then(function (result) {
                                $scope.cancel();
                            });
                    } else req_mode = false;
                });
        }
    };
});

app.directive('pod', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            item: "=",
            req: "&"
        },
        templateUrl: 'pod.html',
        link: function($scope, element, attrs) {
            $scope.rank = function(nums) {
                var input = [];
                for (var i = 1; i <= nums; i += 1) input.push('');
                for (var i = nums; i < 12; i += 1) input.push('unrank');
                return input;
            };
        }
    };
});