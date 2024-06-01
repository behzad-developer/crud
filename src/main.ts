import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from './config/config.swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger hujjatini yaratish
  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfiguration.config(),
  );

  // Swagger UI'ni sozlash
  SwaggerModule.setup('docs/swagger', app, document);

  // Global validatsiya pipe
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
    }),
  );

  // Ilovani 3000-portda tinglash
  await app.listen(3300);
}
bootstrap();
