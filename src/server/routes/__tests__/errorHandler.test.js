import assert from 'assert';
import express from 'express';
import supertest from 'supertest';
import errorHandler from '../errorHandler';
import * as dummy from '../../../test/data';

describe('Error handler', () => {
  let result;
  beforeEach(async () => {
    const app = express();
    app.get('/test', (req, res, next) => {
      try {
        throw dummy.error;
      } catch (err) {
        next(err);
      }
    });
    app.use(errorHandler);
    const testAPI = supertest(app);
    result = await testAPI.get('/test');
  });
  it('Should set the status to 500', () => {
    assert.strictEqual(result.status, 500);
  });
  it('Should return JSON', () => {
    assert.strictEqual(result.type, 'application/json');
  });
  it('Should return the error', () => {
    assert.deepStrictEqual(result.body, {
      error: dummy.error.message,
    });
  });
});
