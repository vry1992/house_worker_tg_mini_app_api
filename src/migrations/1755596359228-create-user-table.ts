import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1755596359228 implements MigrationInterface {
    name = 'CreateUserTable1755596359228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "telegram_id" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying, "language_code" character varying NOT NULL, "photo_url" character varying NOT NULL, "username" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
