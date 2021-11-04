import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserService } from '../services/CreateUserService';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly usersService: CreateUserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  handle(@Body() createUserDto: CreateUserDto) {
    return this.usersService.execute(createUserDto);
  }
}
