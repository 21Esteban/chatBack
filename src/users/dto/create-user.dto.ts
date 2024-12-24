import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  number: string;
}

// With these rules in place, if a request hits our endpoint with an invalid email property in the request body, the application will automatically respond with a 400 Bad Request code, along with the following response body:

// {
//   "statusCode": 400,
//   "error": "Bad Request",
//   "message": ["email must be an email"]
// }
