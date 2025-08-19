import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  public verifyTelegramInitData(telegramInitData: string) {
    const botToken: string = this.configService.get('TG_BOT_TOKEN');
    const initData = new URLSearchParams(telegramInitData);
    const hash = initData.get('hash');
    const dataToCheck: string[] = [];

    initData.sort();
    initData.forEach(
      (val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`),
    );

    const secret = CryptoJS.HmacSHA256(botToken, 'WebAppData');
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(
      CryptoJS.enc.Hex,
    );

    return hash === _hash;
  }
}
