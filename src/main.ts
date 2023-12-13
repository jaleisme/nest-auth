import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Request Pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  
  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle("Trello Clone API Docs")
    .setDescription("Welcome to the API documentation for our Trello-like app backend. This API empowers developers to seamlessly integrate and interact with our platform. It provides endpoints for managing all of our features, facilitating the creation of dynamic and collaborative task management applications.")
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
