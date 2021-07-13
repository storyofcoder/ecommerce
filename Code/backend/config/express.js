const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes/v1');
const { logs } = require('./vars');
const error = require('../middlewares/error');
let path = require('path');
const rateLimit = require('express-rate-limit');
const {config} = require('./globalConfig')
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');
require("../crons/index");
/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

app.enable('trust proxy'); 

// enable CORS - Cross Origin Resource Sharing
app.use(cors({credentials: true, origin: true}));
app.options('*', cors());


const limiter = new rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 150, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  message: JSON.stringify({ message: "Too many request from this IP, please try again after an minute", status: "error" }),
  skip: (req)=>{
    let ip = req.ip
    let index =  config.skipRateLimiterIP.indexOf(ip);
    if(index == -1) return false;
    return true;
  },
  keyGenerator: (req) => {
    let ip = req.ip
    return ip;
  }
});

//  apply to all requests
app.use(limiter);

var dir = path.join(__dirname, '../images');

app.use(express.static(dir));

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;