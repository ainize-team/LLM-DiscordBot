import { Client, Intents } from 'discord.js';
import interactionCreate from './listeners/interactionCreate.js';
import ready from './listeners/ready.js';
import logger from './utils/logger.js';
import Config from './config.json' assert { type: 'json' };

const { token } = Config.bot;
logger.info(token);

logger.info('Start Bot');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
ready(client);
interactionCreate(client);
logger.info('Login to Server');
client.login(token);
