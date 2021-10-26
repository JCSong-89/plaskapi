// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config(); // Loads environment variables from a .env file into process.env

const development = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: 'utf8mb4_unicode_ci',
  timezone: '+09:00',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'migration',
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
  logging: true,
};

module.exports = development;
