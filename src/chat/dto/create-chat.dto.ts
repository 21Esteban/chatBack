import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  chatName: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  phoneNumberContact: string;
}
