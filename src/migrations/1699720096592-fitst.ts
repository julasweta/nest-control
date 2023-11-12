import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fitst1699720096592 implements MigrationInterface {
  name = 'Fitst1699720096592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image_entity" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "publicationId" uuid, CONSTRAINT "PK_fb554818daabc01db00d67aafde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."publications_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."publications_brand_enum" AS ENUM('BMW', 'Daewoo', 'Honda')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."publications_model_enum" AS ENUM('X5', 'Lanos', 'Accord', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "publications" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "views" TIMESTAMP NOT NULL DEFAULT '[]', "currency" "public"."publications_currency_enum" NOT NULL, "exchangeRate" double precision NOT NULL, "priceUsd" double precision, "priceEur" double precision, "priceUah" double precision, "brand" "public"."publications_brand_enum" NOT NULL DEFAULT 'BMW', "model" "public"."publications_model_enum" NOT NULL DEFAULT 'X5', "userId" uuid, CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'manager', 'administrator', 'mechanic')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_accounttype_enum" AS ENUM('Basic', 'Premium')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" text NOT NULL, "login" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', "accountType" "public"."users_accounttype_enum" NOT NULL DEFAULT 'Basic', "phone" text, "autosalonId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "autosalon" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameSalon" text NOT NULL, "login" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "phone" text, CONSTRAINT "UQ_36c897199bbb0d93c7a10574b82" UNIQUE ("email"), CONSTRAINT "PK_d793e3d4aaeb837941c41d5787c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_entity" ADD CONSTRAINT "FK_a21875939315b2c895a047fe978" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "publications" ADD CONSTRAINT "FK_e622491ca77016209bd7219b262" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_524f14a1a4d85134353c9cae95c" FOREIGN KEY ("autosalonId") REFERENCES "autosalon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "publications" DROP CONSTRAINT "FK_e622491ca77016209bd7219b262"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_entity" DROP CONSTRAINT "FK_a21875939315b2c895a047fe978"`,
    );
    await queryRunner.query(`DROP TABLE "autosalon"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_accounttype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "publications"`);
    await queryRunner.query(`DROP TYPE "public"."publications_model_enum"`);
    await queryRunner.query(`DROP TYPE "public"."publications_brand_enum"`);
    await queryRunner.query(`DROP TYPE "public"."publications_currency_enum"`);
    await queryRunner.query(`DROP TABLE "image_entity"`);
  }
}
