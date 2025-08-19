import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './types/types';

@Injectable()
export class AuthTokenService {
  constructor(private jwtService: JwtService) {}

  async signIn(payload: TokenPayload): Promise<{ access_token: string }> {
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
