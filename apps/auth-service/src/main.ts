import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(','),
    credentials: true,
    exposedHeaders: ['X-Auth-Token', 'X-Auth-UserId', 'X-Auth-Roles'],
  });

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3010, '0.0.0.0');
}
bootstrap();
