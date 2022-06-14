import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const NODE_ENV: string = process.env.NODE_ENV as string;

export const PORT: string = process.env.PORT as string;
export const BASE_ROUTE: string = process.env.BASE_ROUTE as string;

export const DB_HOST: string = process.env.DB_HOST as string;
export const DB_PORT: string = process.env.DB_PORT as string;
export const DB_DATABASE: string = process.env.DB_DATABASE as string;

export const SECRET_KEY: string = process.env.SECRET_KEY as string;
export const SALT_ROUNDS: string = process.env.SALT_ROUNDS as string;
export const TOKEN_DURATION: string = process.env.TOKEN_DURATION as string;

export const ORIGIN: string = process.env.ORIGIN as string;
export const CREDENTIALS: boolean =
  (process.env.CREDENTIALS as unknown as boolean) || true;
