import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import interactionCreate from './listeners/interactionCreate.js';
import ready from './listeners/ready.js';

dotenv.config();
const token = process.env.TOKEN;

console.log('Bot start');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
ready(client);
console.log('ready?');
interactionCreate(client);
client.login(token);
