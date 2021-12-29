export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_STATIC_URL: string;
      REACT_APP_API_URL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
