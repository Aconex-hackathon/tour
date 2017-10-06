angular.module('smartManual', [])
   .controller('mainCtrl', function($scope, $document, $http) {

    var docFunction = function () {
        $scope.openRightNav();
    };

    $http.get("http://localhost:9191/api/floors").success(function(result) {
        $scope.floors = result;
     })

    $http.get("http://localhost:9191/api/areas").success(function(result) {
        $scope.floorAreas = result;
     })

    $http.get("http://localhost:9191/api/documents/3").success(function(result) {
        $scope.lightDocs = result;
     })

    $scope.showDropDown = false;

    $scope.viewerData = {
        "default": {
            "firstScene": "Main Entrance",
            "autoLoad": true,
            "sceneFadeDuration": 1000
        },

        "scenes": {
            "Main Entrance": {
                "title": "Main Entrance",
                "hfov": 400,
                "pitch": -3,
                "yaw": 117,
                "type": "equirectangular",
                "panorama": "/images/Main Entrance.jpg",
                "hotSpots": [
                    {
                        "pitch": -3.1,
                        "yaw": 36.6,
                        "type": "scene",
                        "text": "Jog Falls",
                        "sceneId": "Jogfalls"
                    },
                    {
                        "clickHandlerFunc": docFunction,
                        "pitch": 23.3,
                        "yaw": -91.5,
                        "type": "info",
                        "text": "Light Fixture",
                    },
                    {
                        "clickHandlerFunc": docFunction,
                        "pitch": 16.8,
                        "yaw": -130,
                        "type": "info",
                        "text": "Diffuser",
                    },
                ]
            },

            "Hampi": {
                "title": "Hampi",
                "hfov": 110,
                "yaw": 5,
                "type": "equirectangular",
                "panorama": "/images/hampi.jpg",
                "hotSpots": [
                    {
                        "pitch": 2.3,
                        "yaw": 84.2,
                        "yaw": 876.1,
                        "type": "scene",
                        "text": "Main Entrance",
                        "sceneId": "Main Entrance",
                        "targetYaw": -23,
                        "targetPitch": 2
                    },
                    {
                        "clickHandlerFunc": docFunction,
                        "pitch": -5.2,
                        "yaw": 7.3,
                        "type": "info",
                        "text": "Television",
                    },
                    {
                        "clickHandlerFunc": docFunction,
                        "pitch": 39.4,
                        "yaw": -14.6,
                        "type": "info",
                        "text": "Light Fixture",
                    },
                ]
            },

            "Jogfalls": {
                "title": "Jog Falls",
                "hfov": 110,
                "yaw": 5,
                "type": "equirectangular",
                "panorama": "/images/Jog Falls.jpg",
                "hotSpots": [
                    {
                        "pitch": 0.15,
                        "yaw": 134.1,
                        "type": "scene",
                        "text": "Hampi",
                        "sceneId": "Hampi",
                        "targetYaw": -23,
                        "targetPitch": 2
                    },
                    {
                        "clickHandlerFunc": docFunction,
                        "pitch": -0.22,
                        "yaw": -3.55,
                        "type": "info",
                        "text": "Television",
                    },
                    {
                        "clickHandlerFunc": docFunction,
                        "pitch": 19.2,
                        "yaw": 15.3,
                        "type": "info",
                        "text": "Smoke Detector",
                    },
                ]
            }
        }
    };

    $scope.openLeftNav = function () {
        document.getElementById("myLeftSidenav").style.width = "250px";
    }

    $scope.closeLeftNav = function () {
        document.getElementById("myLeftSidenav").style.width = "0";
    }

    $scope.openRightNav = function () {
        document.getElementById("myRightSidenav").style.width = "250px";
    }

    $scope.closeRightNav = function () {
        document.getElementById("myRightSidenav").style.width = "0";
    }

    $scope.showGroundRooms = function (floor) {
        if (floor.floorName == "Ground Floor" && $scope.showDropDown) {
            return true;
        } else {
            return false;
        }
    };

    $scope.floorDropDown = function() {
        $scope.showDropDown = !($scope.showDropDown);
    }

    $scope.changeRoom = function (roomId) {
        viewer.loadScene(roomId);
        $scope.closeLeftNav();
    };

    var viewer = pannellum.viewer('panorama', $scope.viewerData);
});