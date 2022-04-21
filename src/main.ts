// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cors = require('cors');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000

  app.useGlobalPipes(new ValidationPipe());

  app.use(cors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  }));

  const options = new DocumentBuilder()
      .setTitle('Test task')
      .setDescription('calculating the cost of car rental\n')
      .setVersion('1.0')
      .addTag('endpoints')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
