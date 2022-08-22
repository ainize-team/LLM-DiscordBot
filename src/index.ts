import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';
import logger from './utils/logger';

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
