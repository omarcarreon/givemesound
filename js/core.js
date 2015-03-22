

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
            if ($scope.artist1 != '' && $scope.artist1){
                list += '&name=' + $scope.artist1;
            }
            if ($scope.artist2 != '' && $scope.artist2){
                list += '&name=' + $scope.artist2;
            }
            if ($scope.artist3 != '' && $scope.artist3){
                list += '&name=' + $scope.artist3;
            }
            if ($scope.artist4 != '' && $scope.artist4){
                list += '&name=' + $scope.artist4;
            }
            if ($scope.artist5 != '' && $scope.artist5){
                list += '&name=' + $scope.artist5;
            }
 
            $http.get('http://developer.echonest.com/api/v4/artist/similar?api_key=YLAOMF7VPOBLKCYUH'+list+'&format=json&results=15')
            .success(function (data) {
                $scope.artists = data.response.artists;
                //console.log(data.response.artists);
            })
            .error(function (data, status, headers, config) {
                alert("Dang It!");
            });
 
        };
 
        $scope.getSong = function (artist){
            $http.get('http://developer.echonest.com/api/v4/song/search?api_key=YLAOMF7VPOBLKCYUH&artist_id='+artist.id+'&sort=song_hotttnesss-desc&results=1')
            .success (function (data) {
                artist['hotsong'] = data.response.songs[0].title;
 
                $http.get('http://developer.echonest.com/api/v4/song/search?api_key=YLAOMF7VPOBLKCYUH&format=json&results=1&artist='+artist.name+'&title='+artist.hotsong+'&bucket=id:spotify&bucket=tracks&limit=true')
                .success (function (data){
                    var spotID = data.response.songs[0].tracks[0].foreign_id.split(":");
                    artist['hotSpotifyId'] = spotID[2];
                    url2+=artist['hotSpotifyId']+",";
                    $('#spotify-iframe').attr('src', url2);
                    console.log(url2);
                })
                .error (function (data, status, headers, config){
                    console.log('Failed getting spotifyId');
                });
 
            })
            .error (function (data, status, headers, config) {
                console.log("Dang It! error in getting songs");
            });
        };
 
 
 
 
 
    }
]);


            /*

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

            var url = 'http://developer.echonest.com/api/v4/playlist/basic?api_key=YLAOMF7VPOBLKCYUH'+list+'&bucket=id:spotify&format=json&results=20&type=artist-radio'

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

    }
]);
*/
