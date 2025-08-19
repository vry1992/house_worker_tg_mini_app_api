import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'telegram_id', type: 'int', nullable: false })
  telegramId: number;

  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ name: 'language_code', type: 'varchar', nullable: false })
  languageCode: string;

  @Column({ name: 'photo_url', type: 'varchar', nullable: false })
  photoUrl: string;

  @Column({ name: 'username', type: 'varchar', nullable: false })
  username: string;

  @Column({ default: true })
  isActive: boolean;
}
