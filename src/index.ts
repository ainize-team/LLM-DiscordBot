import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import interactionCreate from './listeners/interactionCreate.js';
import ready from './listeners/ready.js';
import logger from './utils/logger.js';

dotenv.config();
const token = process.env.TOKEN;

logger.info('Start Bot');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
ready(client);
interactionCreate(client);
logger.info('Login to Server');
client.login(token);
