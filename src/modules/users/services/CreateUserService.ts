import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { IJwtTokenProvider } from '../providers/JwtTokenProvider/protocol/IJwtTokenProvider';
import { IHashProvider } from '../providers/HashProvider/protocol/IHashProvider';

import { AppError } from 'src/shared/error/AppError';
import { Cart } from 'src/modules/carts/entities/cart.entity';

type Response = {
  user: User;
  token: string;
};

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,

    @Inject('JwtTokenProvider')
    private jwtTokenProvider: IJwtTokenProvider,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: CreateUserDto): Promise<Response> {
    const checkUserExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUserExists) {
      throw new AppError('email already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtTokenProvider.generateToken(
      user.id,
      process.env.JWT_SECRET,
      '7d',
    );

    await this.cartsRepository.save({
      user_id: user.id,
    });

    return {
      user,
      token,
    };
  }
}
