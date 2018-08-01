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

const bucket = jest.genMockFromModule('@bcgov/nodejs-common-utils');

function getObject(client, bucket, name) {
  return new Promise((resolve, reject) => {
    resolve('OK');
  });

  
  const now = new Date();
  if (file === 'expiredFile') {
    now.setDate(now.getDate() + 1000);
  }

  return cb(undefined, {
    size: 1000,
    etag: 'abc123',
    metaData: {},
    lastModified: now,
  });
}

function presignedGetObject(bucket, name, expiryInSeconds, cb) {
  cb(undefined, 'http://localhost/foo/abc123');
}

minio.Client.prototype.statObject = statObject;
minio.Client.prototype.presignedGetObject = presignedGetObject;

module.exports = minio;



// --------------------
// question:
// 1. why mock minio not the nodejs-common-utils library??
// 2. can we export mocks from the library?


/**
 * Fetch an object from an existing bucket
 *
 * @param {String} bucket The name of the bucket
 * @param {String} name The name of the object to retrieve
 * @returns {Promise} Returns a promise with the error or Buffer
 */
export const getObject = (client, bucket, name) => new Promise((resolve, reject) => {
  let size = 0;
  const data = [];

  client.getObject(bucket, name, (error, stream) => {
    if (error) {
      reject(error);
      return;
    }

    stream.on('data', (chunk) => {
      size += chunk.length;
      data.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(data, size));
    });

    stream.on('error', (serror) => {
      reject(serror);
    });
  });
});