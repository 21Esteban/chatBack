import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

// This module uses the forFeature() method to define which repositories are registered in the current scope. With that in place, we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator: (Line 7)
