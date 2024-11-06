const config = require("./utils/config");
const express = require('express');
const app = express();
const cors = require("cors");
const peopleRouter = require("./controllers/people");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require('mongoose');
// const morgan = require("morgan");

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  });

// MIDDLEWARES
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
// app.use(morgan(function(tokens, req, res) {
//     const body = JSON.stringify(req.body);
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'),
//       '-',
//       tokens['response-time'](req, res),
//       'ms',
//       body
//     ].join(' ');
//   })
// );


//URLS


// const generateId = () => {
//   // const maxId = people.length > 0 ? Math.max(...people.map(p => p.id)) : 0; //Using spread operator to create a new array only with the IDs
//   // return maxId + 1;
//   const id = Math.floor(Math.random() * 101);
//   return id;
// };

//Unknown endpoint request middleware

app.use("/api/people", peopleRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;