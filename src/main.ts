import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleErrors } from './shared/middlewares/handleErrors';

import { raw } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //raw body
  app.use('/webhook', raw({ type: 'application/json' }));
  app.use(handleErrors);
  app.enableCors();
  await app.listen(process.env.PORT || 3333);
}

bootstrap();
