const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require ('discord.js')

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    //premission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permission to do that.");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have the permission to do that");

    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You need to state a user. \`a unban ID reason\`');
    if (isNaN(args[0])) return message.channel.send('The ID provided is not a number.\`a unban ID reason\`');

    //Excecuting:
    message.guild.fetchBans().then(async bans =>{
      if (bans.size == 0) return message.channel.send('This server does not have anyone banned.');
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send('The used ID provided is not banned');
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send('Something went wrong unbanning the ID.');
      }).then(() => {
        message.channel.send(`Successfully Unbanned ${arg[0]}`);
      });
    });
   
  }
}