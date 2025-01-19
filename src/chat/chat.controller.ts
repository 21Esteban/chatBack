import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Headers,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createChatDto: CreateChatDto,
    @Res() reply: FastifyReply,
    @Request() req: any,
  ) {
    console.log(req);
    return this.chatService.create(createChatDto, reply);
  }

  // Once again, we're applying the AuthGuard that the @nestjs/passport module has automatically provisioned for us when we configured the passport-jwt module. This Guard is referenced by its default name, jwt. When our GET /profile route is hit, the Guard will automatically invoke our passport-jwt custom configured strategy, validate the JWT, and assign the user property to the Request object.
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Headers() headers: any, @Res() reply: FastifyReply) {
    return this.chatService.findAll(headers, reply);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
