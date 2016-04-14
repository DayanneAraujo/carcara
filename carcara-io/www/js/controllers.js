/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $rootScope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $rootScope.loadGLoader =function(){
        if(!window.google||!window.google.loader){
            console.log("loading gloader");
            $http.get("http://www.google.com/jsapi")
                .success(function(json){
                    var scriptElem = document.createElement('script');
                    document.getElementsByTagName('head')[0].appendChild(scriptElem);
                    scriptElem.text = json;
                    locations.loadGMaps();
            });
        }else{
            if(!window.google.maps||!window.google.maps){
                console.log("no gmaps");
                $rootScope.loadGMaps();
            }
        }
    };

    $rootScope.loadGMaps = function(){
        if(window.google&&window.google.loader&&window.google.maps===undefined){
            console.log("loading gmaps");
            try{google.load("maps", "3.21", {callback: mappingCallback, other_params: "libraries=geometry&sensor=true&language=en"});}catch(e){}
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('MapCtrl', function($scope) {
        $scope.title = "Map Page";
        var loadMap = function(){
            var mapOptions = {
                center: new google.maps.LatLng(-8.063236, -34.870948),
                streetViewControl: false,
                styles: [{featureType: "all",stylers: [{ saturation: -75 }]}],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: {position:google.maps.ControlPosition.TOP_CENTER},
                zoom: 12,
                zoomControl: true,
                zoomControlOptions: {position:google.maps.ControlPosition.RIGHT_BOTTOM,style:google.maps.ZoomControlStyle.SMALL}
            };
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
        };

        $scope.$on('$ionicView.loaded',function(){
            console.log("map page loaded - should only see me once???");
        })

        $scope.$on('$ionicView.enter',function(){
            console.log("Is google, google maps and our map set up?")
            if(window.google){
                console.log("google is");
                if(window.google.maps){
                    console.log("maps is");
                    if($scope.map===undefined){
                        console.log("loading our map now...");
                        loadMap();
                    }/*else{
                        goo
                    }*/
                    }else{
                        console.log("maps isn't...");
                        $scope.loadGMaps(); //then load the map
                    }
                }else{
                    console.log("google isn't...");
                    $scope.loadGLoader(); //then load maps, then load the map
                }
        });
})

.controller('UnidadesSaudeCtrl', function($scope) {
    // -8.12159    -34.9162
    // -8.0265 -34.95617
    // -8.05345    -34.90814


        var loadMap = function(){
            var mapOptions = {
                center: new google.maps.LatLng(-8.063236, -34.870948),
                streetViewControl: false,
                styles: [{featureType: "all",stylers: [{ saturation: -75 }]}],
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: {position:google.maps.ControlPosition.TOP_CENTER},
                zoom: 12,
                zoomControl: true,
                zoomControlOptions: {position:google.maps.ControlPosition.RIGHT_BOTTOM,style:google.maps.ZoomControlStyle.SMALL}
            };
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
            var un1 = new google.maps.Marker({
                position: new google.maps.LatLng(-8.12159, -34.9162),
                //map: $scope.map,
                title: 'US 173 PSF DANCING DAYS'
            });

            var infowindow1 = new google.maps.InfoWindow({
                content: 'US 173 PSF DANCING DAYS'
            });

            un1.addListener('click', function() {
                infowindow1.open($scope.map, un1);
            });

            var un2 = new google.maps.Marker({
                position: new google.maps.LatLng(-8.0265, -34.95617),
                //map: $scope.map,
                title: 'US 248 PSF BARREIRAS'
            });

            var infowindow2 = new google.maps.InfoWindow({
                content: 'US 248 PSF BARREIRAS'
            });

            un2.addListener('click', function() {
                infowindow2.open($scope.map, un2);
            });

            var un3 = new google.maps.Marker({
                position: new google.maps.LatLng(-8.05345, -34.90814),
                //map: $scope.map,
                title: 'SANLIFE'
            });

            var infowindow3 = new google.maps.InfoWindow({
                content: 'SANLIFE'
            });

            un3.addListener('click', function() {
                infowindow3.open($scope.map, un3);
            });

            un1.setMap($scope.map);
            un2.setMap($scope.map);
            un3.setMap($scope.map);

            var markers = [un1, un2, un3];//some array
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }

            $scope.map.fitBounds(bounds);
        };

        $scope.$on('$ionicView.enter',function(){
            console.log("Is google, google maps and our map set up?")
            if(window.google){
                console.log("google is");
                if(window.google.maps){
                    console.log("maps is");
                    if($scope.map===undefined){
                        console.log("loading our map now...");
                        loadMap();
                    }/*else{
                        goo
                    }*/
                    }else{
                        console.log("maps isn't...");
                        $scope.loadGMaps(); //then load the map
                    }
                }else{
                    console.log("google isn't...");
                    $scope.loadGLoader(); //then load maps, then load the map
                }
        });
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ConvenioDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.showToast = function(message, duration, location) {
        window.plugins.toast.showWithOptions(
          {
            message: "Agora você acompanha este convênio.",
            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
            position: "bottom",
            addPixelsY: -40  // added a negative value to move it up a bit (default 0)
          });
        window.localStorage['convenio'] = true;
    };

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ConvenioListCtrl', function($scope, $stateParams, $timeout,
  ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var loadMap = function(){
        var mapOptions = {
            center: new google.maps.LatLng(-8.063236, -34.870948), // posicao de Recife
            streetViewControl: false,
            styles: [{featureType: "all",stylers: [{ saturation: -75 }]}],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {position:google.maps.ControlPosition.TOP_CENTER},
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {position:google.maps.ControlPosition.RIGHT_BOTTOM,style:google.maps.ZoomControlStyle.SMALL}
        };
        $scope.map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
    };
    $scope.$on('$ionicView.enter',function(){
        console.log("Is google, google maps and our map set up?")
        if(window.google){
            console.log("google is");
            if(window.google.maps){
                console.log("maps is");
                if($scope.map===undefined){
                    console.log("loading our map now...");
                    loadMap();
                }/*else{
                    goo
                }*/
                }else{
                    console.log("maps isn't...");
                    $scope.loadGMaps(); //then load the map
                }
            }else{
                console.log("google isn't...");
                $scope.loadGLoader(); //then load maps, then load the map
            }
    });
})

.controller('ConvenioSalvoListCtrl', function($scope, $rootScope, $stateParams,
                                              $timeout, ionicMaterialMotion,
                                              ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $scope.checkSavedConvenio = function(){
        if (window.localStorage['convenio']) {
            return true;
        }
        return false;
    };

    $scope.goBackHome = function(){
        $
        window.location.href = "/convenio-list";
    };

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('DenunciaConvenioCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('ConvenioExtraDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('DespesasConvenioListCtrl', function($scope, $stateParams, $timeout,
  ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('DespesaConvenioDetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ConveniosCtrl', function($scope) {

    $scope.convenios = [
    { ano: 2015, cidade:"Recife", codigo: 1, title: "AQUISIÇÃO DE EQUIPAMENTOS E MATERIAIS PERMANENTES.",  instituicao: "INSTITUTO DE MEDICINA INTEGRAL PROFESSOR FERNANDO FIGUEIRA - IMIP" ,status: "Rejeitada" },
    { ano: 2015, cidade:"Recife", codigo: 2, title: "Aquisição de equipamento e material permanente para unidade de atenção especializada em saúde",  instituicao: "INSTITUTO DE MEDICINA INTEGRAL PROFESSOR FERNANDO FIGUEIRA - IMIP" ,status: "Aprovada" },
    { ano: 2015, cidade:"Recife", codigo: 3, title: "Aquisição de equipamento e material permanente para unidade de atenção especializada em saúde",  instituicao: "INSTITUTO DE MEDICINA INTEGRAL PROFESSOR FERNANDO FIGUEIRA - IMIP" ,status: "Aprovada" },
    { ano: 2015, cidade:"Recife", codigo: 4, title: "AQUISIÇÃO DE EQUIPAMENTOS E MATERIAIS PERMANENTES.",  instituicao: "INSTITUTO DE MEDICINA INTEGRAL PROFESSOR FERNANDO FIGUEIRA - IMIP" ,status: "Rejeitada" },
    { ano: 2014, cidade:"Recife", codigo: 4, title: "AQUISIÇÃO DE EQUIPAMENTOS E MATERIAIS PERMANENTES.",  instituicao: "INSTITUTO DE MEDICINA INTEGRAL PROFESSOR FERNANDO FIGUEIRA - IMIP" ,status: "Rejeitada" },
    { ano: 2014, cidade:"Recife", codigo: 4, title: "AQUISIÇÃO DE EQUIPAMENTOS E MATERIAIS PERMANENTES.",  instituicao: "Hospital da Restauração" ,status: "Rejeitada" },
    { ano: 2013, cidade:"Recife", codigo: 3, title: "Aquisição de medicamentos e material permanente para unidade de atenção especializada em saúde",  instituicao: "Hospital Getúlio Vargas" ,status: "Aprovada" }


  ];

})

;
