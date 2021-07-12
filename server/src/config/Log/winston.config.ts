import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.splat(),
        winston.format.prettyPrint(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    // new winston.transports.File({
    //   format: winston.format.json(),
    //   level: 'verbose',
    //   filename: 'application.log',
    //   dirname: 'logs',
    // }),
  ],
};
