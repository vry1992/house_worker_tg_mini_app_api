import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';
import { AuthTokenService } from './auth-token.service';
import { AuthUserService } from './auth-user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authUserService: AuthUserService,
    private readonly authTokenService: AuthTokenService,
  ) {}

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

    return hash === _hash ? JSON.parse(initData.get('user')) : null;
  }

  async login(telegramInitData: string) {
    const tgUser = this.verifyTelegramInitData(telegramInitData);

    if (!tgUser) throw new UnauthorizedException();
    let response = {};
    const appUser = await this.authUserService.getAppUserIfExists(tgUser);

    response['user'] = appUser;

    if (!response['user']) {
      const newAppUser = await this.authUserService.createAppUser(tgUser);

      response['user'] = newAppUser;
    }

    if (response['user']) {
      const token = await this.authTokenService.signIn({
        userId: response['user'].id,
      });

      response['token'] = token;
    }

    return response;
  }
}
