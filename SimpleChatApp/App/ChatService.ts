
module App {

    export class ChatService {
         rootScopeService: angular.IRootScopeService;
        private connection: HubConnection;
        private proxy: HubProxy;
        private callback;
        static $inject: Array<string> = ['$rootScope'];
        constructor($rootScope: angular.IRootScopeService) {
            this.rootScopeService = $rootScope;
            this.connection = $.hubConnection();
            this.proxy = this.connection.createHubProxy('ChatHub');
            

            this.connection.start();
        }
        public onChat(eventName, callback) {
            var self = this;
            this.proxy.on(eventName, function () {
                var args = arguments;
                self.rootScopeService.$apply(() => {
                    callback.apply(self.proxy, args);
                });
            });
        }

    }

    angular.module('app').service('ChatService', ChatService);
}