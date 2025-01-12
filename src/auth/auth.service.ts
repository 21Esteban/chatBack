import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto, reply: FastifyReply) {
    try {
      const user: User | null = await this.userService.findUserByEmail(
        createUserDto.email,
      );
      if (user) {
        return reply
          .code(HttpStatus.BAD_REQUEST)
          .send({ ok: false, message: 'email already register' });
      }

      const newUser = await this.userService.createUser(createUserDto);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;
      const payload = { id: newUser.id, userName: newUser.userName };
      const accessToken = await this.jwtService.signAsync(payload);
      return reply.code(HttpStatus.CREATED).send({
        ok: true,
        data: result,
        token: accessToken,
        message: 'User created succesfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(
    updateUserDto: UpdateUserDto,
    reply: FastifyReply,
  ): Promise<any> {
    try {
      const { email, password } = updateUserDto;

      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        return reply.code(HttpStatus.BAD_REQUEST).send({
          ok: false,
          message: 'User not found',
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return reply.code(HttpStatus.BAD_REQUEST).send({
          ok: false,
          message: 'Invalid password',
        });
      }
      const payload = { id: user.id, userName: user.userName };
      console.log(payload);
      const accessToken = await this.jwtService.signAsync(payload);
      console.log(accessToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;

      return reply.code(HttpStatus.OK).send({
        ok: true,
        data: result,
        token: accessToken,
        message: 'Login successful',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
