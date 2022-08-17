import fetch, { RequestInit } from 'node-fetch';
import { CommandInteraction, Client } from 'discord.js';
import dotenv from 'dotenv';
import { Command } from '../Command.js';
import logger from '../utils/logger.js';

dotenv.config();
const apiEndpoint = process.env.API_ENDPOINT;

type GETResponse = {
  status: string;
  result: string[] | null;
  updated_at: number;
};

const getAPI = async (
  url: string,
  config: RequestInit
): Promise<GETResponse> => {
  const res = await fetch(url, config);
  return (await res.json()) as GETResponse;
};

async function get(taskId: string, attempt: number): Promise<string> {
  if (attempt > 10) {
    logger.error('get method timeout');
    return 'error';
  }
  const getEndpoint = `${apiEndpoint}/result/${taskId}`;
  try {
    const res: GETResponse = await getAPI(getEndpoint, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    if (res.status !== 'completed' || res.result == null) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await get(taskId, attempt + 1);
    }
    return res.result[0];
  } catch (error) {
    logger.error('fetch error in get', error);
    return String(error);
  }
}

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
      const taskRes = await fetch(postEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: data }),
      });
      const task = (await taskRes.json()) as { task_id: string };
      logger.info(task.task_id);
      const content = await get(task.task_id, 1);
      logger.info(content);
      await interaction.editReply({ content });
    } catch (error) {
      logger.error('POST fetch error', error);
      await interaction.editReply(errorRep);
    }
  },
};

export default Generate;
