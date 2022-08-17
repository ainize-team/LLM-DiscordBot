import { Command } from './Command.js';
import { Hello } from './commands/Hello.js';
import { Generate } from './commands/Generate.js';
import { Help } from './commands/Help.js';

export const Commands: Command[] = [Hello, Generate, Help];

export default Commands;
