/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BROADCAST_AUTH_URL: string;
  readonly VITE_ECHO_AUTH_ENDPOINT: string;
  readonly VITE_MUNICIPALITY_ID: string;
  readonly VITE_IMAGEKIT_PUBLIC_KEY: string;
  readonly VITE_IMAGEKIT_PRIVATE_KEY: string;
  readonly VITE_IMAGEKIT_URL_ENDPOINT: string;
  readonly VITE_PUSHER_APP_KEY: string;
  readonly VITE_PUSHER_APP_CLUSTER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
