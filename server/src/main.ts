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

  if (process.env.NODE_ENV === 'production') {
    // enable cors to make it secure and add the origin: frontend endpoint;
    // app.enableCors({
    //   credentials: true,
    //   origin: [process.env.APP_URL],
    // });
  }

  // const appConfig: AppConfigService = app.get('AppConfigService');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  const port = process.env.PORT;
  await app.listen(port || 3000);
  logger.log(`Application is running on: ${port}`, 'Main - Bootstrap');
}
bootstrap();
