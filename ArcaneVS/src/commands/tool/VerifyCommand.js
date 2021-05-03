const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'tool', []);
  }

  async run(client, message, args) {
    message.channel.send("Verified!")
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I reqiure the \`MANAGE_ROLES\` permission.");

    const role = message.guild.roles.cache.get('838721873348919296');

    await message.member.roles.add(role.id).catch(err => console.log(err));
  }
}