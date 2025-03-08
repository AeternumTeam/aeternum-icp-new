import dotenv from "dotenv";

dotenv.config();

const configs = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  url: process.env.URL,
  pg_host: process.env.PG_HOST,
  pg_port: process.env.PG_PORT,
  pg_database: process.env.PG_DATABASE,
  pg_user: process.env.PG_USER,
  pg_password: process.env.PG_PASSWORD,
  pg_ssl: process.env.PG_SSL,
  email: process.env.EMAIL,
  email_password: process.env.EMAIL_PASSWORD,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 86400000,
  jwtExpiration: "24h",
  postUrl: 'https://jsonplaceholder.typicode.com/posts',
};

export default configs;