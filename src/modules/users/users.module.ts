import { Module } from '@nestjs/common';
import { CreateUserService } from './services/CreateUserService';
import { CreateSessionService } from './services/CreateSessionService';

import { CreateUserController } from './controllers/CreateUserController';
import { SessionController } from './controllers/SessionController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtTokenProvider } from './providers/JwtTokenProvider/implementation/JwtTokenProvider';
import { BCryptHashProvider } from './providers/HashProvider/implementation/BCryptHashProvider';
import { Cart } from '../carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart])],
  controllers: [CreateUserController, SessionController],
  providers: [
    CreateUserService,
    CreateSessionService,
    {
      provide: 'JwtTokenProvider',
      useClass: JwtTokenProvider,
    },
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
})
export class UsersModule {}
