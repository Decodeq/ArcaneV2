const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have the \`MANAGE_MESSAGES\` permission.');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have the \`MANAGE_MESSAGES\` permission.');
    if (!args[0]) return message.channel.send("You must state how much messages to delete \`a purge NUMBER\`");
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("Number stated is not a number(NaN).");
    if (!Number.isInteger(amountToDelete)) return message.channel.send("The number must be a whole number.");
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 10000) return message.channel.send('The number stated must be between 2 and 199.');
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try{
      await message.channel.bulkDelete(fetched)
       .then(messages => message.channel.send(`Deleted ${messages.size} messages!`));

    }catch (err) {
      console.log(err);
      message.channel.send(`I was unable to delete the amount stated make sure they are older than 14 days!`);
    }
  }
}