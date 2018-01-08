module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: 'mysql',
      host: process.env.HOST,
      requestTimeout: 20000,
      force: false,
      logging: false,
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
  },
};
