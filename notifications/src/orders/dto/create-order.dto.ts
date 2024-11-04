import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    id: number;

    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;

}
