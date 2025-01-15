import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { FastifyReply } from 'fastify';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private readonly userService: UsersService,
  ) {}

  async create(createChatDto: CreateChatDto, reply: FastifyReply) {
    const contactUser = await this.userService.findUserByPhoneNumber(
      createChatDto.phoneNumberContact,
    );

    const user = await this.userService.findUserByPhoneNumber(
      createChatDto.phoneNumber,
    );

    if (!contactUser)
      return reply
        .code(HttpStatus.BAD_REQUEST)
        .send({ ok: false, message: 'user does not exist' });

    const chat = this.chatRepository.create({
      name: contactUser.userName,
      participants: [user, contactUser],
    });

    await this.chatRepository.save(chat);

    return reply
      .code(HttpStatus.OK)
      .send({ ok: true, message: 'Chat created', chat });
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
