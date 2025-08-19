import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { TelegramUser } from '../user/types/types';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async getAppUserIfExists(tgUser: TelegramUser): Promise<User | null> {
    const appUser = await this.usersRepository.findOne({
      where: {
        telegramId: tgUser.id,
      },
    });

    return appUser;
  }

  public async createAppUser(tgUser: TelegramUser): Promise<User> {
    const appUser = this.usersRepository.create({
      telegramId: tgUser.id,
      firstName: tgUser.first_name,
      lastName: tgUser.last_name,
      username: tgUser.username,
      languageCode: tgUser.language_code,
      photoUrl: tgUser.photo_url,
    });

    await this.usersRepository.save(appUser);

    return appUser;
  }
}
