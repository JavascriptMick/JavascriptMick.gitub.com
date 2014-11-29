angular.module('RevealMenuModule', [])
    .directive('revealmenu', function(){
        return {
            link: function(scope, elem, attrs){
                //.......
                Reveal.addEventListener('slidechanged', function(event) {
                    //.......
                });
            }
        }
    });