//
// Code Signing
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
// Created by Jason Leach on 2018-07-20.
//

import { default as request } from 'supertest'; // eslint-disable-line
import app from '../src';

jest.mock('../src/libs/job');

describe('Test monitoring routes', () => {
  test('The readiness probe should respond with 200 ', async () => {
    const response = await request(app).get('/ehlo');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test job routes', () => {
  test('Test a job type must be present', async () => {
    const response = await request(app)
      .post('/v1/job');
    expect(response.statusCode).toBe(404); // Missing specific route path
  });

  test('Test signing job must have a job in request body', async () => {
    const response = await request(app)
      .post('/v1/job/sign')
      .set('content-type', 'application/json');
    expect(response.statusCode).toBe(400); // Bad request
  });

  test('Test signing job accepted', async () => {
    const response = await request(app)
      .post('/v1/job/sign')
      .set('content-type', 'application/json')
      .send({
        id: 1,
        name: 'hihi',
      });
    expect(response.statusCode).toBe(200); // OK
  });

  test('Test deployment job must have a job in request body', async () => {
    const response = await request(app)
      .post('/v1/job/deploy')
      .set('content-type', 'application/json');
    expect(response.statusCode).toBe(400); // Bad request
  });

  test('Test deployment job must have specified both platforms', async () => {
    const response = await request(app)
      .post('/v1/job/deploy')
      .set('content-type', 'application/json')
      .send({
        job: {
          id: 1,
          platform: 'android',
        },
      });
    expect(response.statusCode).toBe(400); // Bad request
  });

  test('Test deployment job accepted', async () => {
    const response = await request(app)
      .post('/v1/job/deploy')
      .set('content-type', 'application/json')
      .send({
        job: {
          id: 1,
          platform: 'android',
          deployPlatform: 'public',
        },
      });
    expect(response.statusCode).toBe(200); // OK
  });
});
