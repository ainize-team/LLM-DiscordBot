import { CommandInteraction, Client, MessageEmbed } from 'discord.js';
import { Command } from '../Command';
import logger from '../utils/logger';

const helpEmbed = new MessageEmbed({
  title: 'LLM bot',
  description: 'Explain about commands',
  fields: [
    {
      name: 'generate',
      value: 'use LLM generate function.',
    },
    {
      name: 'generate options',
      value: '\u200B',
    },
    {
      name: 'generate-prompt',
      value: `The prompt(s) to generate completions for, \
      encoded as a string, array of strings, \
      array of tokens, or array of token arrays.
      required | string | min: 1 | max: 2048 tokens`,
      inline: true,
    },
    {
      name: 'generate-new_token',
      value: `The maximum numbers of tokens to generate, \
      ignore the current number of tokens.
      integer | min: 0 | default: 16`,
      inline: true,
    },
    {
      name: 'generate-do_sample',
      value: `Whether or not to use sampling ; \
      use greedy decoding otherwise.
      boolean | default: true`,
      inline: true,
    },
    {
      name: 'generate-early_stop',
      value: `Whether to stop the beam search when at least num_beams \
      sentences are finished per batch or not.
      boolean | default: false`,
      inline: true,
    },
    {
      name: 'generate-num_beams',
      value: `Number of beams for beam search. 1 means no beam search.
      integer | default: 1`,
      inline: true,
    },
    {
      name: 'generate-temperature',
      value: `he value used to module the next token probabilities.
      float | min: 0.0 | default: 1.0`,
      inline: true,
    },
    {
      name: 'generate-top_k',
      value: `The number of highest probability vocabulary tokens \
      to keep for top-k-filtering.
      integer | min: 0 | default: 50`,
      inline: true,
    },
    {
      name: 'generate-top_p',
      value: `If set to float < 1, \
      only the most probable tokens with probabilities \
      that add up to top_p or higher are kept for generation.
      float | min: 0.0 | max: 1.0 | default: 1.0`,
      inline: true,
    },
    {
      name: 'generate-ngram_size',
      value: `If set to int > 0, \
      all ngrams of that size can only occur once.
      integer | default: 0`,
      inline: true,
    },
    {
      name: 'generate-ret_seq',
      value: `The number of independently computed returned \
      sequences for each element in the batch.
      integer | min: 1 | max: 5 | default: 1`,
      inline: true,
    },
  ],
});

export const Help: Command = {
  name: 'help',
  description: 'Explain about generate command',
  type: 'CHAT_INPUT',
  run: async (client: Client, interaction: CommandInteraction) => {
    logger.info('help command executed');
    interaction.followUp({ embeds: [helpEmbed] });
  },
};

export default Help;
