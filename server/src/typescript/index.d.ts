declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      MONGO_URI: string
      DB_NAME: string
      COLLECTION_NAME_USERS: string
      COLLECTION_NAME_DOCTORS: string
      COLLECTION_DIAGNOSTICS_USERS: string
      JWT_SECRET: string
    }
  }
}

export {}
