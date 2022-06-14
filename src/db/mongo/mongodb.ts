import { DB_HOST, DB_PORT, DB_DATABASE } from '../../config/environment';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};
