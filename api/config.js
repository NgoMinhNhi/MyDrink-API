const DB_HOST = 'localhost';
const DB_PORT = '27017';
const DB_NAME = 'tester';
const DB_USER = 'ngominhnhi1998@gmail.com';
const DB_PASS = '5585246462';


// config postgres
const PG_DB = 'n3';
const PG_HOST= 'localhost';
const PG_USERNAME = 'n3';
const PG_PASSWORD = 'nnn333';
const PG_PORT = 5432;
// config redis
const REDIS_HOST = 'localhost';
const REDIS_PORT = 6379;
const REDIS_PASS = '';
const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth: REDIS_PASS
};

export default {
  mongoURL: process.env.MONGO_URL || 'mongodb://ngominhnhi:Ngominhnhi5585246462@cluster0-shard-00-00-6v3ek.mongodb.net:27017,cluster0-shard-00-01-6v3ek.mongodb.net:27017,cluster0-shard-00-02-6v3ek.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  pgURL: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`,
  JWT_SECRET: 'gfgfhfh',

  uploadPath: 'uploads',

  useExpressStatic: true,
  Sequelize : {
    pool: { // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000
    }
  },
  kue: {
    prefix: 'q',
    redis: redisConfig
  },
  kueUI: {
    port: 3055
  },
  projectId:'ancient-sandbox-219904',
  socket: {
    port: 3066
  },
};
