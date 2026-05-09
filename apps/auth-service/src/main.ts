import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth Api')
    .setDescription('Auth Documentation')
    .setVersion('1.0')
    .addTag('AUTH')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(','),
    credentials: true,
    exposedHeaders: ['X-Auth-Token', 'X-Auth-UserId', 'X-Auth-Roles'],
  });

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3010, '0.0.0.0');
}
bootstrap();
