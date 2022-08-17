import { createLogger, transports, format } from 'winston';

interface TransformableInfo {
  level: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.label({ label: '[llm-Bot]' }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `[${info.level}] ${info.timestamp} ${info.label}: ${info.message}`
        )
      ),
    }),
  ],
});

export default logger;
