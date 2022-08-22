import { Command } from './Command';
import { Hello } from './commands/Hello';
import { Generate } from './commands/Generate';
import { Help } from './commands/Help';

export const Commands: Command[] = [Hello, Generate, Help];

export default Commands;
