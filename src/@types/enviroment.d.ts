/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  export interface ProcessEnv {
    APP_PORT: string;
    MAX_REQUEST_SIZE: string;
    JWT_SECRET_TOKEN: string;
    JWT_EXPIRES_IN: string;
  }
}
