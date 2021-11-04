import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSessionService } from '../services/CreateSessionService';
import { Request } from 'express';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: CreateSessionService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Req() request: Request) {
    const { email, password } = request.body;

    return this.sessionService.create(email, password);
  }
}
