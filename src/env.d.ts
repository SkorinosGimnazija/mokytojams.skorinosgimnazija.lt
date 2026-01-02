/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_CLIENT_ID: string;
  readonly VITE_APP_STATIC_URL: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
