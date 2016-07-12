var App;
(function (App) {
    var Communication = (function () {
        function Communication() {
        }
        return Communication;
    }());
    App.Communication = Communication;
    var ChatController = (function () {
        function ChatController(rootScope) {
            var _this = this;
            // collection of messages coming from server
            this.messages = [];
            this.chatModel = new Communication();
            this.rootScope = rootScope;
            this.connection = $.hubConnection();
            this.chatHub = this.connection.createHubProxy('ChatHub'); // initializes hub
            this.connection.start();
            // register a client method on hub to be invoked by the server
            this.chatHub.on('broadcastMessage', function (name, message) {
                var newMessage = name + ' says: ' + message;
                _this.messages.push(newMessage); // push the newly coming message to the collection of messages
                _this.rootScope.$apply();
            });
        }
        ChatController.prototype.send = function () {
            // sends a new message to the server
            this.chatHub.invoke('send', this.chatModel.name, this.chatModel.message);
            this.chatModel.message = '';
        };
        ChatController.$inject = ["$rootScope"];
        return ChatController;
    }());
    App.ChatController = ChatController;
    angular.module('app').controller('ChatController', ChatController);
})(App || (App = {}));
