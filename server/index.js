require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

const express = require('express');
const morgan = require('morgan');
const routes = require('../server/routes/api');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(
express.urlencoded({
    extended: false,
}),
);
app.use(routes);
app.listen(4000, () => {
    console.log(`Server listening on http://localhost:4000`);
  });
