declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: any;
    readonly DB_CONNECTION: string;
    readonly NODE_ENV: string;
    readonly BASE_URL: string;
    readonly PRIVATE_KEY: string;
    readonly JWT_EXPIRED_TIME: string;
    readonly EMAIL_HOST_USER: string,
    readonly EMAIL_HOST_PASSWORD: string,
    readonly APP_NAME: string,
    JWT_RESET_EXPIRED_TIME: string

  }
}