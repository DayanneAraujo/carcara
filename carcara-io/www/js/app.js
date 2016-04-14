// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'tabSlideBox'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.convenio-list', {
        url: '/convenio-list',
        views: {
            'menuContent': {
                templateUrl: 'templates/convenio-list.html',
                controller: 'ConvenioListCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.convenio-search-list', {
        url: '/convenio-search-list',
        views: {
            'menuContent': {
                templateUrl: 'templates/convenio-search-list.html',
                controller: 'ConveniosCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.convenio-salvo-list', {
        url: '/convenio-salvo-list',
        views: {
            'menuContent': {
                templateUrl: 'templates/convenio-salvo-list.html',
                controller: 'ConvenioSalvoListCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.info-ibge', {
        url: '/info-ibge',
        views: {
            'menuContent': {
                templateUrl: 'templates/info-ibge.html',
                controller: 'ConvenioExtraDetailCtrl'
            },
            'fabContent': {
            template: ''
          }
        }
    })

    .state('app.denuncia-convenio', {
        url: '/denuncia-convenio',
        views: {
            'menuContent': {
                templateUrl: 'templates/denuncia-convenio.html',
                controller: 'DenunciaConvenioCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.convenio-extra-detail', {
        url: '/convenio-extra-detail',
        views: {
            'menuContent': {
                templateUrl: 'templates/convenio-extra-detail.html',
                controller: 'ConvenioExtraDetailCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.despesas-convenio-list', {
        url: '/despesas-convenio-list',
        views: {
            'menuContent': {
                templateUrl: 'templates/despesas-convenio-list.html',
                controller: 'DespesasConvenioListCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.convenio-detail', {
        url: '/convenio-detail',
        views: {
            'menuContent': {
                templateUrl: 'templates/convenio-detail.html',
                controller: 'ConvenioDetailCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    // .state('app.tabs', {
    //     url: "/tabs",
    //     views: {
    //       'menuContent': {
    //         templateUrl: "tabs.html",
    //         controller: 'tabsController'
    //       }
    //     }
    // })

    .state('app.despesas-convenio-detail', {
        url: '/despesas-convenio-detail',
        views: {
            'menuContent': {
                templateUrl: 'templates/despesas-convenio-detail.html',
                controller: 'DespesaConvenioDetailCtrl'
            },
            'fabContent': {
                template: '<button id="fab-convenio-list" ui-sref="app.convenio-search-list" class="button button-fab button-fab-top-right expanded button-energized-900 "><i class="icon ion-ios-search-strong"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-convenio-list').classList.toggle('on');
                    }, 200);
                }
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
