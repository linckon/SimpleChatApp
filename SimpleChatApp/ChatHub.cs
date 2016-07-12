using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SimpleChatApp
{
    public class ChatHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public async Task Send(string name, string message)
        {
            await Clients.All.broadcastMessage(name, message);
        }
    }
}