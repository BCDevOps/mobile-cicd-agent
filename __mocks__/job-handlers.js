//
// Code Sign
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
// Created by Jason Leach on 2018-05-06.
//

'use strict';

import { handleJob, handleDeploymentJob } from '../src/libs/job';

function handleJobMock(job, clean) {
  return new Promise((resolve, reject) => {
    resolve('OK');
  });
}

function handleDeploymentJobMock(job, clean) {
  return new Promise((resolve, reject) => {
    resolve('OK');
  });
}

handleJob = handleJobMock;
handleDeploymentJob = handleDeploymentJobMock;

module.exports = handleJob;
module.exports = handleDeploymentJob;
