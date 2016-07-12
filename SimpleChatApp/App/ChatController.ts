module App {

    export class Communication {
    message: string;
    name:string;
}
    export class ChatController {
        messages: string[];
        chatModel: Communication;
        private connection: HubConnection;
        private chatHub: HubProxy;// holds the reference to hub
        rootScope:angular.IRootScopeService;
        static $inject: string[] = ["$rootScope"];
        constructor(rootScope: angular.IRootScopeService) {
        // collection of messages coming from server
            this.messages = [];
            this.chatModel = new Communication();
            this.rootScope = rootScope;
            this.connection = $.hubConnection();
            this.chatHub = this.connection.createHubProxy('ChatHub');// initializes hub
            this.connection.start(); 

            // register a client method on hub to be invoked by the server
            this.chatHub.on('broadcastMessage', (name, message) => {
                var newMessage = name + ' says: ' + message;
                this.messages.push(newMessage);// push the newly coming message to the collection of messages
                this.rootScope.$apply();
            });    
        }



        private send(): void {
         // sends a new message to the server
            this.chatHub.invoke('send', this.chatModel.name, this.chatModel.message);
            this.chatModel.message = '';
        }

     
       
    }

    angular.module('app').controller('ChatController', ChatController);
}