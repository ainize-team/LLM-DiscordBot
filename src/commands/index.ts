import { Command } from '../Command.js';
import { Generate } from './Generate.js';
import { Help } from './Help.js';

export const Commands: Command[] = [Generate, Help];

export default Commands;
