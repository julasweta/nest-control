// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  name: 'default',
  type: 'postgres',
  host: '0.0.0.0',
  port: '5432',
  username: 'user',
  password: 'pass',
  database: 'autoRia-clone',
  synchronize: false,
  migrationsRun: false,
  cache: true,
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.js,.ts}'],
});

module.exports = [dataSource];
