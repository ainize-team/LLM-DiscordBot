import { CommandInteraction, Client } from 'discord.js';
import { Command } from '../Command';
import logger from '../utils/logger';
import { post, get, POSTRequest } from '../utils/api';
import Error from '../utils/error';
import Config from '../config.json';

const apiEndpoint = Config.api.endPoint;

export const Generate: Command = {
  name: 'generate',
  description: 'Get prompt and return result',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'prompt',
      description: 'The prompts to generate completions for.',
      type: 'STRING',
      min_length: 1,
      max_length: 2000,
      required: true,
    },
    {
      name: 'new_token',
      description: 'maximum numbers of tokens to generate.',
      type: 'NUMBER',
      min_value: 1,
      max_value: 2000,
    },
    {
      name: 'do_sample',
      description: 'Whether or not to use sampling.',
      type: 'BOOLEAN',
    },
    {
      name: 'early_stop',
      description: 'Stop the beam search when at least num_beams are fin.',
      type: 'BOOLEAN',
    },
    {
      name: 'num_beams',
      description: 'Number of beams for beam search. 1 means no beam search.',
      type: 'NUMBER',
    },
    {
      name: 'temperature',
      description: 'The value used to module the next token probabilities.',
      type: 'NUMBER',
      min_value: 0.0,
      max_value: 1.0,
    },
    {
      name: 'top_k',
      description: 'The number of highest probability vocabulary tokens.',
      type: 'NUMBER',
      min_value: 0,
      max_value: 100,
    },
    {
      name: 'top_p',
      description: 'Low value add most probable tokens with probabilities.',
      type: 'NUMBER',
      min_value: 0.0,
      max_value: 1.0,
    },
    {
      name: 'ngram_size',
      description: 'If set > 0, all ngrams of that size can only occur once.',
      type: 'NUMBER',
      min_value: 0,
    },
    {
      name: 'ret_seq',
      description: 'The number of independently computed returned sequences.',
      type: 'NUMBER',
      min_value: 1,
      max_value: 5,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const data: POSTRequest = {
      prompt: interaction.options.getString('prompt'),
      max_new_tokens: interaction.options.getNumber('new_token')
        ? interaction.options.getNumber('new_token')
        : 16,
      do_sample: interaction.options.getBoolean('do_sample')
        ? interaction.options.getBoolean('do_sample')
        : true,
      early_stopping: interaction.options.getBoolean('early_stop')
        ? interaction.options.getBoolean('early_stop')
        : false,
      num_beams: interaction.options.getNumber('num_beams')
        ? interaction.options.getNumber('num_beams')
        : 1,
      temperature: interaction.options.getNumber('temperature')
        ? interaction.options.getNumber('temperature')
        : 1.0,
      top_k: interaction.options.getNumber('top_k')
        ? interaction.options.getNumber('top_k')
        : 50,
      top_p: interaction.options.getNumber('top_p')
        ? interaction.options.getNumber('top_p')
        : 1.0,
      no_repeat_ngram_size: interaction.options.getNumber('ngram_size')
        ? interaction.options.getNumber('ngram_size')
        : 0,
      num_return_sequences: interaction.options.getNumber('ret_seq')
        ? interaction.options.getNumber('ret_seq')
        : 1,
    };
    const postEndpoint = `${apiEndpoint}/generate`;
    try {
      const taskId = await post(postEndpoint, data);
      logger.info(taskId);
      if (!taskId) {
        await interaction.editReply(Error.generate.input);
        return;
      }
      const content = await get(taskId, 1);
      logger.info(content);
      await interaction.editReply({ content });
    } catch {
      logger.debug('handle error');
      await interaction.editReply(Error.generate.internal);
    }
  },
};

export default Generate;
