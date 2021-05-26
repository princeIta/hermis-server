import dotenv from 'dotenv';
dotenv.config();

type IEnv = {
  NODE_ENV: string;
  MONGO_PW: string;
  MONGO_USER: string;
  DB_NAME: string;
  PORT: string;
  TOKEN_SECRET: string;
  SMS_API_KEY: string;
  SMS_SENDER: string;
  EMAIL_SENDER: string;
  EMAIL_API_KEY: string;
};

const env: IEnv = <IEnv>process.env;

const dbConf = <any>{
  mongo: {
    production: {
      DB_USER: env.MONGO_USER,
      DB_PW: env.MONGO_PW,
      DB_NAME: env.DB_NAME,
      generateConnStr(): string {
        return `mongodb+srv://${this.DB_USER}:${this.DB_PW}@cluster0-u6dzg.mongodb.net/${this.DB_NAME}?retryWrites=true&w=majority`;
      }
    },
    staging: {
      DB_USER: env.MONGO_USER,
      DB_PW: env.MONGO_PW,
      DB_NAME: env.DB_NAME,
      generateConnStr(): string {
        return `mongodb+srv://${this.DB_USER}:${this.DB_PW}@cluster0-u6dzg.mongodb.net/${this.DB_NAME}?retryWrites=true&w=majority`;
      }
    },
    testing: {
      DB_USER: env.MONGO_USER,
      DB_PW: env.MONGO_PW,
      DB_NAME: env.DB_NAME,
      generateConnStr(): string {
        return `mongodb+srv://${this.DB_USER}:${this.DB_PW}@cluster0-u6dzg.mongodb.net/${this.DB_NAME}?retryWrites=true&w=majority`;
      }
    },
    development: {
      generateConnStr(): string {
        return 'mongodb://localhost:27017/hermis';
      }
    }
  }
};

type Envs = 'development' | 'staging' | 'production';

export const APP_ENV: Envs = <Envs>env.NODE_ENV || 'development';

export const dbConnStr: string = dbConf.mongo[APP_ENV].generateConnStr();
export const JWT_TOKEN_SECRET: string = env.TOKEN_SECRET;
export const OTP_TOKEN_TTL: number = 7 * 60;
export const INACTIVE_TTL: number = 20 * 60 * 1000;
export const PORT: string | number = env.PORT || 4700;
export const SMS_API_KEY: string = env.SMS_API_KEY;
export const SMS_SENDER: string = env.SMS_SENDER;
export const EMAIL_SENDER: string = env.EMAIL_SENDER;
export const EMAIL_API_KEY: string = env.EMAIL_API_KEY;
