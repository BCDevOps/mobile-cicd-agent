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

/* eslint-env es6 */

'use strict';

import {
  asyncMiddleware,
  errorWithCode,
} from '@bcgov/nodejs-common-utils';
import { Router } from 'express';
import { handleJob, handleDeploymentJob } from '../../libs/job';

const router = new Router();

// create a new job
router.post('/sign', asyncMiddleware(async (req, res) => {
  const job = req.body;

  if (!job.id) {
    throw errorWithCode('No such job exists', 400);
  }

  res.sendStatus(200).end();

  await handleJob(job);
}));

// create a new job for Deployment:
router.post('/deploy', asyncMiddleware(async (req, res) => {
  const job = req.body;

  if (!job.id) {
    throw errorWithCode('No such job exists', 400);
  }

  if (!job.platform || !job.deploymentPlatform) {
    throw errorWithCode('No platform specified', 400);
  }

  res.sendStatus(200).end();

  await handleDeploymentJob(job);
}));

module.exports = router;
