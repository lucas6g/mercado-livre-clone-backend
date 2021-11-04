import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IJwtTokenProvider } from '../providers/JwtTokenProvider/protocol/IJwtTokenProvider';
import { IHashProvider } from '../providers/HashProvider/protocol/IHashProvider';

import { AppError } from 'src/shared/error/AppError';

type Response = {
  user: User;
  token: string;
};

@Injectable()
export class CreateSessionService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject('JwtTokenProvider')
    private jwtTokenProvider: IJwtTokenProvider,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async create(email: string, password: string): Promise<Response> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('invalid email/password combination', 401);
    }

    const isPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isPassword) {
      throw new AppError('invalid email/password combination', 401);
    }

    const token = this.jwtTokenProvider.generateToken(
      user.id,
      process.env.JWT_SECRET,
      '7d',
    );

    return {
      user,
      token,
    };
  }
}
