const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('off', 'MAINTENANCE', []);
  }

  async run(client, message, args) {
    message.channel.send('BOT GOING UNDER MAINTENANCE');
  }
}