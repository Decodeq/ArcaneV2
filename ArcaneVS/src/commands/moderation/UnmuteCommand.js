const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the \`MUTE_MEMBERS\` permission");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have the \`MANAGE_ROLES\` permission.");
    
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('838724764938928178');
    const memberRole = message.guild.roles.cache.get('838544040961507328');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted: ${reason}`)
      .setColor("#00FF00")
      .setTimestamp();
    

    if (!args[0]) return message.channel.send("You did not state a user. \`a unmute @user reason\`");
    if (!mentionedMember) return message.channel.send("The user stated is not in the server.");
    if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot unmute your self.");
    if (mentionedMember.user.is == client.user.id) return message.channel.send("You cannot unmute me with my own command");
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send("This user is already unmuted.");
    if (message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send("The user stated is the same or has a higher role than you.")

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send("I could not give the member role to the member")));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send("I could not remove the muted role to the member")));
  }
}