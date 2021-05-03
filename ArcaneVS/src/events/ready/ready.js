const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    let serverIn = await client.guilds.cache.size;
    console.log(client.user.tag + ' is ready for use no errors yet!');
    client.user.setPresence({
       activity: { 
         name: `servers.hub`,
         type: "WATCHING" 
         }, 
         status: 'online' 
        })
    
      .catch(console.error);
  }
}