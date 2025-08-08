declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_URL: string;
    }
  }
}

export {};
