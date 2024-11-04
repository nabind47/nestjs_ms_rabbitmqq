import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
    @IsNumber()
    id: number;

    @IsString()
    message: string
}
