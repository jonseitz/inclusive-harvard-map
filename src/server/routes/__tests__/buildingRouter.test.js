import assert from 'assert';
import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import errorHandler from '../errorHandler';
import buildingRouter from '../buildingRouter';

describe('Building Router', () => {
  let app;
  let apiTest;
  let result;
  let Building;

  beforeEach(() => {
    app = express();
    app.use(buildingRouter);
    app.use(errorHandler);
    apiTest = supertest(app);
    Building = mongoose.model('Building');
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
        Building.getAll.resolves([]);
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
        assert.deepStrictEqual(result.body, []);
      });
    });

    describe('When querying the database fails', () => {
      beforeEach(async () => {
        Building.getAll.rejects();
        result = await apiTest.get('/all');
        // result = await apiTest.get('/api/buildings/all');
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
        assert.strictEqual(result.body.error, '');
      });
    });
  });
});
