import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fixbugenum1699800027613 implements MigrationInterface {
  name = 'Fixbugenum1699800027613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."publications_region_enum" RENAME TO "publications_region_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."publications_region_enum" AS ENUM('Львів', 'Odessa')`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "region" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "region" TYPE "public"."publications_region_enum" USING "region"::"text"::"public"."publications_region_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "region" SET DEFAULT 'Lviv'`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."publications_region_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`);
    await queryRunner.query(
      `CREATE TYPE "public"."publications_region_enum_old" AS ENUM('BMW', 'Daewoo', 'Honda')`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "region" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "region" TYPE "public"."publications_region_enum_old" USING "region"::"text"::"public"."publications_region_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ALTER COLUMN "region" SET DEFAULT 'BMW'`,
    );
    await queryRunner.query(`DROP TYPE "public"."publications_region_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."publications_region_enum_old" RENAME TO "publications_region_enum"`,
    );
  }
}
