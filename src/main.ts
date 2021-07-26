import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/Log/winston.config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, { logger });

  if (process.env.NODE_ENV === 'development') {
    // app.enableCors();
    app.enableCors({
      credentials: true,
      origin: [process.env.APP_URL],
    });
  }

  // const appConfig: AppConfigService = app.get('AppConfigService');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  const port = process.env.APP_PORT;
  await app.listen(port);
  logger.log(
    `Application is running on: ${await app.getUrl()}`,
    'Main - Bootstrap',
  );
}
bootstrap();
