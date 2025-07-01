export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'use_navi_date',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'your-session-secret',
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3003',
  },
}); 