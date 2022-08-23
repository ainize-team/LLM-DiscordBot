import { Client } from 'discord.js';
import { Commands } from '../commands/index';

export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }
    await client.application.commands.set(Commands);
  });
};
