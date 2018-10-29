import assert from 'assert';
import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import errorHandler from '../errorHandler';
import buildingRouter from '../buildingRouter';
import Building from '../../models/Building';

describe('Building Router', () => {
  let apiTest;
  let result;

  beforeAll(() => {
    const app = express();
    app.use(buildingRouter);
    app.use(errorHandler);
    apiTest = supertest(app);
  });

  describe('Get all buildings', () => {
    beforeEach(() => {
      sinon.stub(Building, 'getAll');
    });

    afterEach(() => {
      Building.getAll.restore();
    });

    describe('When querying database succeeds', () => {
      beforeEach(async () => {
        Building.getAll.resolves(['one', 'two', 'three']);
        result = await apiTest.get('/all');
      });

      it('should call the getAll method', () => {
        assert.strictEqual(Building.getAll.callCount, 1);
      });

      it('should return a 200 status code', () => {
        assert.strictEqual(result.statusCode, 200);
      });

      it('should return JSON', () => {
        assert.strictEqual(result.type, 'application/json');
      });

      it('should return the expected data', () => {
        assert.deepStrictEqual(result.body, ['one', 'two', 'three']);
      });
    });

    describe('When querying the database fails', () => {
      beforeEach(async () => {
        Building.getAll.rejects(new Error('Error'));
        result = await apiTest.get('/all');
      });

      it('should still call the getAll method', () => {
        assert.strictEqual(Building.getAll.callCount, 1);
      });

      it('should return a 500 status code', () => {
        assert.strictEqual(result.statusCode, 500);
      });

      it('should return JSON', () => {
        assert.strictEqual(result.type, 'application/json');
      });

      it('should have an error', () => {
        assert.strictEqual(result.body.error, 'Error');
      });
    });
  });
});
