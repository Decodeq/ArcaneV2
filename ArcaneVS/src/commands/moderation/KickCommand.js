const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use this command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";
    const kickEmbed = new Discord.MessageEmbed()
     .setTitle(`You were kicked from ${message.guild.name}`)
     .setDescription(`Reason: ${reason}`)
     .setColor("#00FF00")
     .setTimestamp()
    // a kick @user reason
    if (!args[0]) return message.channel.send("You need to state a user. \`a kick @user reason\`");
    if (!mentionedMember) return message.channel.send("The user stated is not in the server.");
    try {
      await mentionedMember.send(kickEmbed);
    } catch(err){
      console.log(`I was unable to message the member.`);
    }

    try{
     await mentionedMember.kick(reason)
    } catch(err) {
      console.log(err);
      message.channel.send("I was unable to kick the member.");
    }
  }
}