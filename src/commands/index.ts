import { Command } from '../Command';
import { Generate } from './Generate';
import { Hello } from './Hello';
import { Help } from './Help';

export const Commands: Command[] = [Hello, Generate, Help];

export default Commands;
