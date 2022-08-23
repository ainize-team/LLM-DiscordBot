import { Client, Intents } from 'discord.js';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';
import logger from './utils/logger';
import Config from './config.json';

const { token } = Config.bot;

logger.info('Start Bot');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
ready(client);
interactionCreate(client);
logger.info('Login to Server');
client.login(token);
