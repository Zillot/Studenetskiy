"use strict";

const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

app.use(cors())

//controllers

//apiError should be the last api controller, to catch all api that not exist
require('./controllers/apiErrorController').addApp(app);

//angular should be the last one, other way it will override all other path for API
require('./controllers/angularController').addApp(app);

app.listen(process.env.PORT || 8080);
