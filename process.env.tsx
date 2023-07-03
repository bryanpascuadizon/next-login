declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET_KEY: string;
    NEXTAUTH_URL_LOCAL: string;
    NEXTAUTH_URL_PRODUCTION: string;
    GOOGLE_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
