import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { timeout } from 'rxjs';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {

  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) { }

  create(createOrderDto: CreateOrderDto) {
    this.rabbitClient.emit('order-placed', createOrderDto);

    return { message: 'Order Placed!' };
  }

  findAll() {
    return this.rabbitClient
      .send({ cmd: 'fetch-orders' }, {})
      .pipe(timeout(5000));
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
