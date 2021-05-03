const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //premission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permission to do that.");
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have the permission to do that");

    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You need to state a user. \`a ban @user reason\`');
    if (!mentionedMember) return message.channel.send('The user stated is not in the server.');
    if (!mentionedMember.bannable) return message.channel.send('I cannot ban that member.');

    //Excecuting:
    const banEmbed = new Discord.MessageEmbed()
     .setTitle(`You have been exiled from ${message.guild.name}`)
     .setDescription(`Reason for being banned: ${reason}`)
     .setColor("#00FF00")
     .setTimestamp();
    
   await mentionedMember.send(banEmbed).catch(err => console.log(err));
   await mentionedMember.ban({
     days: 7,
     reason: reason 
   }).catch(err => console.log(err)).then(() => message.channel.send("Successfully banned " + mentionedMember.user.tag));
  }
}