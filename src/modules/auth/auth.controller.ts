import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly telegramService: AuthService) {}

  @Post('login')
  async login(@Body() dto: { initData: string }) {
    return this.telegramService.verifyTelegramInitData(dto.initData);
  }
}
