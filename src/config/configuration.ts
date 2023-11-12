import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();
const token = 'allConfigs';

export default registerAs(token, () => ({
  app_port: configService.get<number>('APP_PORT'),
  app_host: configService.get<string>('APP_HOST'),

  db_host: configService.get<string>('POSTGRES_HOST'),
  db_port: configService.get<number>('POSTGRES_PORT'),
  db_username: configService.get<string>('POSTGRES_USERNAME'),
  db_password: configService.get<string>('POSTGRES_PASSWORD'),
  db_database: configService.get<string>('POSTGRES_DB'),

  bs_salt: configService.get<number>('BS_SALT'),

  aws_access: configService.get<string>('AWS_S3_ACCESS_KEY'),
  aws_secret: configService.get<string>('AWS_S3_SECRET_KEY'),
  aws_bucket: configService.get<string>('AWS_S3_BUCKET'),
  aws_region: configService.get<string>('AWS_S3_REGION'),
  aws_url: configService.get<string>('AWS_S3_URL'),
}));
