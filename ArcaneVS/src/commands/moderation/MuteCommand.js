const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the \`MUTE_MEMBERS\` permission");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have the \`MANAGE_ROLES\` permission.");
    
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('838724764938928178');
    const memberRole = message.guild.roles.cache.get('838544040961507328');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("#00FF00")
      .setTimestamp();
    

    if (!args[0]) return message.channel.send("You did not state a user. \`a mute @user reason\`");
    if (!mentionedMember) return message.channel.send("The user stated is not in the server.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot mute your self.");
    if (mentionedMember.user.is == client.user.id) return message.channel.send("You cannot mute me with my own command");
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send("This user is already muted.");
    if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send("The user stated is the same or has a higher role than you.")

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send("I could not give the muted role to the member")));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send("I could not remove the member role to the member")));
  }
}