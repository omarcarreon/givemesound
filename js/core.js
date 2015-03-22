

//core.js

var appMusic = angular.module('appMusic', []);

appMusic.controller('MainCtrl', [
    '$scope', 
    '$http',
    function ($scope, $http){

        var url2 = 'https://embed.spotify.com/?uri=spotify:trackset:Give me sound:';
        
        $scope.checkArtists = function(){

            url2 = 'https://embed.spotify.com/?uri=spotify:trackset:Give me sound:';

            var list= "";

            if ($scope.artist1 != '' && $scope.artist1)
                list += '&artist=' + $scope.artist1;
            if ($scope.artist2 != '' && $scope.artist2)
                list += '&artist=' + $scope.artist2;
            if ($scope.artist3 != '' && $scope.artist3)
                list += '&artist=' + $scope.artist3;
            if ($scope.artist4 != '' && $scope.artist4)
                list += '&artist=' + $scope.artist4;
            if ($scope.artist5 != '' && $scope.artist5)
                list += '&artist=' + $scope.artist5;

            var url = 'http://developer.echonest.com/api/v4/playlist/basic?api_key=JOSOPBAMMN94VYZYF'+list+'&bucket=id:spotify&bucket=tracks&format=json&results=30&type=artist-radio&limit=true';


            $http.get(url)
            .success(function (data) {
                $scope.artists = data.response.songs;
                console.log(data);
                console.log(url);
            })
            .error(function (data, status, headers, config) {
                alert("Please fill all the fields!" + $scope.artist2);
                }
            );

        };

        $scope.getSong=function(artist){
            
            var spotID = artist.tracks[0].foreign_id.split(":");
                    var songId = spotID[2];
                    console.log(songId);
                    url2+=songId+",";
                    $('#spotify-iframe').attr('src', url2);
                    console.log(url2);
        }

    }
]);


