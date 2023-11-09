import { MigrationInterface, QueryRunner } from 'typeorm';

export class Firstmigration1699556405423 implements MigrationInterface {
  name = 'Firstmigration1699556405423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_524f14a1a4d85134353c9cae95c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountType"`);
    await queryRunner.query(`DROP TYPE "public"."users_accounttype_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_524f14a1a4d85134353c9cae95c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "autosalonId"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "nameSalon" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "userName" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "email" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "accountType" "public"."users_accounttype_enum" NOT NULL DEFAULT 'Basic'`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "autosalonId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_524f14a1a4d85134353c9cae95c" UNIQUE ("autosalonId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_524f14a1a4d85134353c9cae95c" FOREIGN KEY ("autosalonId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "query-result-cache"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_524f14a1a4d85134353c9cae95c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_524f14a1a4d85134353c9cae95c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "autosalonId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountType"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nameSalon"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "autosalonId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_524f14a1a4d85134353c9cae95c" UNIQUE ("autosalonId")`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
    await queryRunner.query(
      `CREATE TYPE "public"."users_accounttype_enum" AS ENUM('Basic', 'Premium')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "accountType" "public"."users_accounttype_enum" NOT NULL DEFAULT 'Basic'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'manager', 'administrator', 'mechanic')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer'`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "email" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "userName" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "name" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_524f14a1a4d85134353c9cae95c" FOREIGN KEY ("autosalonId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
