import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
    @Type(() => Number)
    @IsNumber()
    id: number;

    @IsString()
    productId: string;

    @Type(() => Number)
    @IsNumber()
    quantity: number;
}
