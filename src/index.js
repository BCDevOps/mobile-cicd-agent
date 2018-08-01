//
// SecureImage
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2018-01-10.
//

'use strict';

import { logger, started } from '@bcgov/nodejs-common-utils';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import express from 'express';
import fs from 'fs';
import path from 'path';
import config from './config';

// Config
const env = config.get('environment');
const port = config.get('port');
const app = express();
const options = {
  inflate: true,
  limit: '204800kb', // 200Mb
  type: 'image/*',
};
const docpath = path.join(__dirname, '../', 'public/doc/api');
const pubpath = path.join(__dirname, '../', 'public');

fs.access(docpath, fs.constants.R_OK, (err) => {
  if (err) {
    logger.warn('API documentation does not exist');
    return;
  }

  app.use('/doc', express.static(docpath));
});

fs.access(pubpath, fs.constants.R_OK, (err) => {
  if (err) {
    logger.warn('Static assets location does not exist');
    return;
  }

  app.use('/', express.static(pubpath));
});

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.raw(options));
app.use(flash());
// app.use('/download', express.static('download'));

// Authentication middleware
// app.use(authmw(app));

// Server API routes
require('./router')(app);

// Error handleing middleware. This needs to be last in or it will
// not get called.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(err.message);
  const code = err.code ? err.code : 500;
  const message = err.message ? err.message : 'Internal Server Error';

  res.status(code).json({ error: message, success: false });
});

module.exports = app;
