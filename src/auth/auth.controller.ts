import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Res() reply: FastifyReply) {
    return this.authService.signUp(createUserDto, reply);
  }

  @Post('signIn')
  update(@Body() updateUserDto: UpdateUserDto, @Res() reply: FastifyReply) {
    return this.authService.signIn(updateUserDto, reply);
  }
}
