declare namespace NodeJS {
  export interface ProcessEnv {
    DB_URI: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    FILE_UPLOAD_URL: string;
    FILE_UPLOAD_PATH: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_URL: string;
  }
}
