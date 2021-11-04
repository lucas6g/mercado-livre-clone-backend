export interface IJwtTokenProvider {
  generateToken(subject: string, secret: string, expiresIn: string): string;
}
