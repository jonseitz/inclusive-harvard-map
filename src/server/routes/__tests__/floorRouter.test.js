import assert from 'assert';
import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import errorHandler from '../errorHandler';
import floorRouter from '../floorRouter';
import Floor from '../../models/Floor';
import * as dummy from '../../../test/data';

describe('Floor Router', () => {
  let apiTest;
  let result;

  beforeAll(() => {
    const app = express();
    app.use(express.json());
    app.use(floorRouter);
    app.use(errorHandler);
    apiTest = supertest(app);
  });

  describe('GET', () => {
    describe('/all', () => {
      beforeEach(() => {
        sinon.stub(Floor, 'getAll');
      });

      afterEach(() => {
        Floor.getAll.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          Floor.getAll.resolves(dummy.mongoFloorArray);
          result = await apiTest.get('/all');
        });

        it('should call the getAll method', () => {
          assert.strictEqual(Floor.getAll.callCount, 1);
        });

        it('should return a 200 status code', () => {
          assert.strictEqual(result.statusCode, 200);
        });

        it('should return JSON', () => {
          assert.strictEqual(result.type, 'application/json');
        });

        it('should return the expected data', () => {
          assert.deepStrictEqual(result.body, dummy.mongoFloorArray);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          Floor.getAll.rejects(dummy.error);
          result = await apiTest.get('/all');
        });

        it('should still call the getAll method', () => {
          assert.strictEqual(Floor.getAll.callCount, 1);
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
    describe('/:id', () => {
      beforeEach(() => {
        sinon.stub(Floor, 'getOneById');
      });

      afterEach(() => {
        Floor.getOneById.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          Floor.getOneById.resolves(dummy.mongoFloor);
          result = await apiTest.get(`/${dummy.mongoFloor.id}`);
        });

        it('should call getOneById', () => {
          assert.strictEqual(Floor.getOneById.callCount, 1);
        });

        it('should pass in the id', () => {
          assert.strictEqual(Floor.getOneById.args[0][0], dummy.mongoFloor.id);
        });

        it('should return a 200 status code', () => {
          assert.strictEqual(result.statusCode, 200);
        });

        it('should return JSON', () => {
          assert.strictEqual(result.type, 'application/json');
        });

        it('should return the expected data', () => {
          assert.deepStrictEqual(result.body, dummy.mongoFloor);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          Floor.getOneById.rejects(dummy.error);
          result = await apiTest.get(`/${dummy.mongoFloor.id}`);
        });

        it('should call getOneById', () => {
          assert.strictEqual(Floor.getOneById.callCount, 1);
        });

        it('should pass in the id', () => {
          assert.strictEqual(Floor.getOneById.args[0][0], dummy.mongoFloor.id);
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
  describe('POST', () => {
    describe('/new', () => {
      beforeEach(() => {
        sinon.stub(Floor, 'createNew');
      });
      afterEach(() => {
        Floor.createNew.restore();
      });
      describe('When createNew Succeeds', () => {
        beforeEach(async () => {
          Floor.createNew.resolves(dummy.mongoFloor);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawFloor);
        });
        it('Should call Floor.createNew', () => {
          assert.strictEqual(Floor.createNew.callCount, 1);
        });

        it('Should pass in the raw data', () => {
          assert.deepStrictEqual(Floor.createNew.args[0][0], dummy.rawFloor);
        });

        it('should return a 200 status code', () => {
          assert.strictEqual(result.statusCode, 200);
        });

        it('should return JSON', () => {
          assert.strictEqual(result.type, 'application/json');
        });

        it('should return the expected data', () => {
          assert.deepStrictEqual(result.body, dummy.mongoFloor);
        });
      });
      describe('When createNew fails', async () => {
        beforeEach(async () => {
          Floor.createNew.rejects(dummy.error);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawFloor);
        });

        it('Should call Floor.createNew', () => {
          assert.strictEqual(Floor.createNew.callCount, 1);
        });

        it('Should pass in the raw data', () => {
          assert.deepStrictEqual(Floor.createNew.args[0][0], dummy.rawFloor);
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
});
