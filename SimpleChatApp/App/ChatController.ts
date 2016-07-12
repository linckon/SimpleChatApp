module App {

    export class Communication {
    message: string;
    name:string;
}
    export class ChatController {
        messages: string[];
        chatModel: Communication;
        private connection: HubConnection;
        private chatHub: HubProxy;
        rootScope:angular.IRootScopeService;
        static $inject: string[] = ["$rootScope"];
        constructor(rootScope: angular.IRootScopeService) {
            this.messages = [];
            this.chatModel = new Communication();
            this.rootScope = rootScope;
            this.connection = $.hubConnection();
            this.chatHub = this.connection.createHubProxy('ChatHub');
            this.connection.start(); 

            // register a client method on hub to be invoked by the server
            this.chatHub.on('broadcastMessage', (name, message) => {
                var newMessage = name + ' says: ' + message;
                this.messages.push(newMessage);
                this.rootScope.$apply();
            });    
        }



        private send(): void {
            this.chatHub.invoke('send', this.chatModel.name, this.chatModel.message);
            this.chatModel.message = '';
        }

     
       
    }

    angular.module('app').controller('ChatController', ChatController);
}