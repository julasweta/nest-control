import { MigrationInterface, QueryRunner } from 'typeorm';

export class Userid1700853241612 implements MigrationInterface {
  name = 'Userid1700853241612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publications" DROP CONSTRAINT "FK_e622491ca77016209bd7219b262"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ADD CONSTRAINT "FK_e622491ca77016209bd7219b262" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`);
    await queryRunner.query(
      `ALTER TABLE "publications" DROP CONSTRAINT "FK_e622491ca77016209bd7219b262"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ADD CONSTRAINT "FK_e622491ca77016209bd7219b262" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
