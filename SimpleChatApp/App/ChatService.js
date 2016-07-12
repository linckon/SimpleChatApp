var App;
(function (App) {
    var ChatService = (function () {
        function ChatService($rootScope) {
            this.rootScopeService = $rootScope;
            this.connection = $.hubConnection();
            this.proxy = this.connection.createHubProxy('ChatHub');
            this.connection.start();
        }
        ChatService.prototype.onChat = function (eventName, callback) {
            var self = this;
            this.proxy.on(eventName, function () {
                var args = arguments;
                self.rootScopeService.$apply(function () {
                    callback.apply(self.proxy, args);
                });
            });
        };
        ChatService.$inject = ['$rootScope'];
        return ChatService;
    }());
    App.ChatService = ChatService;
    angular.module('app').service('ChatService', ChatService);
})(App || (App = {}));
