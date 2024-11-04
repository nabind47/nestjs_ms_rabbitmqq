import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  orders: CreateOrderDto[] = [];

  create(createOrderDto: CreateOrderDto) {
    console.log(`Received a new order - customer: ${createOrderDto.id}`);

    this.orders.push(createOrderDto);
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

}
