import { CommandInteraction, Client } from 'discord.js';
import dotenv from 'dotenv';
import { Command } from '../Command.js';
import logger from '../utils/logger.js';
import { post, get } from '../utils/api.js';

dotenv.config();
const apiEndpoint = process.env.API_ENDPOINT;

export const Generate: Command = {
  name: 'generate',
  description: 'Get prompt and return result',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'prompt',
      description: 'The prompts to generate completions for',
      type: 'STRING',
      min_length: 1,
      max_length: 100,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const data = interaction.options.getString('prompt');
    const postEndpoint = `${apiEndpoint}/generate`;
    const errorRep = 'Error! Cannot generate sentence';
    try {
      const taskId = await post(postEndpoint, data);
      logger.info(taskId);
      const content = await get(taskId, 1);
      logger.info(content);
      await interaction.editReply({ content });
    } catch {
      logger.debug('handle error');
      await interaction.editReply(errorRep);
    }
  },
};

export default Generate;
