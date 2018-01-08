// module.exports = {
//   port: process.env.PORT || 3000,
//   db: {
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     options: {
//       dialect: 'mysql',
//       host: process.env.HOST,
//       requestTimeout: 20000,
//       force: false,
//       logging: false,
//     },
//   },
//   authentication: {
//     jwtSecret: process.env.JWT_SECRET,
//     expiresIn: process.env.EXPIRES_IN,
//   },
// };

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: 'db9DF903',
    user: 'user9DF903',
    password: 'BYsv69W3',
    options: {
      dialect: 'mysql',
      host: '94.73.149.214',
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
