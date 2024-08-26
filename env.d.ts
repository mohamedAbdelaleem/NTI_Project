declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: any;
    readonly DB_CONNECTION: string;
    readonly NODE_ENV: string;
  }
}