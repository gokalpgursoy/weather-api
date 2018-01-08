require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routers');
const db = require('./models').sequelize;
const config = require('./config');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(router);
app.listen(config.port);

db
  .sync()
  .then(() => {
    console.log(`Server started at http://localhost:${config.port}`);
  })
  .catch((err) => {
    console.log('DB Connection Error', err);
  });
