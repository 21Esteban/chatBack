import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-late-poetry-a5gjfy1e.us-east-2.aws.neon.tech',
      username: 'cursoposgres_owner',
      password: 'mBEZ82KQaYFg',
      database: 'chat',
      entities: [User],
      synchronize: true, //no usar en produccion
      autoLoadEntities: true,
      ssl: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
