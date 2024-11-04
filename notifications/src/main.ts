import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'orders-queue',
      // noAck: false,
      // queueOptions: {
      //   durable: false
      // },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
