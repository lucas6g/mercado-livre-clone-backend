import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { IJwtTokenProvider } from '../protocol/IJwtTokenProvider';

@Injectable()
export class JwtTokenProvider implements IJwtTokenProvider {
  generateToken(subject: string, secret: string, expiresIn: string): string {
    const token = sign({}, secret, {
      subject,
      expiresIn,
    });
    return token;
  }
}
