import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  phoneNumberContact: string;
  phoneNumber: string;
}
