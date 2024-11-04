import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ChatModule } from './chat/chat.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [OrdersModule, ChatModule, StreamingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
