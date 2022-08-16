import { Command } from './Command.js';
import { Hello } from './commands/Hello.js';
import { Generate } from './commands/Generate.js';

export const Commands: Command[] = [Hello, Generate];

export default Commands;
