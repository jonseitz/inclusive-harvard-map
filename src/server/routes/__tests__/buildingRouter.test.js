import assert from 'assert';
import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import errorHandler from '../errorHandler';
import buildingRouter from '../buildingRouter';
import Building from '../../models/Building';
import * as dummy from '../../../test/data';

describe('Building Router', () => {
  let apiTest;
  let result;

  beforeAll(() => {
    const app = express();
    app.use(express.json());
    app.use(buildingRouter);
    app.use(errorHandler);
    apiTest = supertest(app);
  });

  describe('GET', () => {
    describe('/all', () => {
      beforeEach(() => {
        sinon.stub(Building, 'getAll');
      });

      afterEach(() => {
        Building.getAll.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          Building.getAll.resolves(dummy.mongoBuildingArray);
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
          assert.deepStrictEqual(result.body, dummy.mongoBuildingArray);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          Building.getAll.rejects(dummy.error);
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
    describe('/:id', () => {
      beforeEach(() => {
        sinon.stub(Building, 'getOneById');
      });

      afterEach(() => {
        Building.getOneById.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          Building.getOneById.resolves(dummy.mongoBuilding);
          result = await apiTest.get(`/${dummy.mongoBuilding.id}`);
        });

        it('should call getOneById', () => {
          assert.strictEqual(Building.getOneById.callCount, 1);
        });

        it('should pass in the id', () => {
          assert.strictEqual(
            Building.getOneById.args[0][0],
            dummy.mongoBuilding.id
          );
        });

        it('should return a 200 status code', () => {
          assert.strictEqual(result.statusCode, 200);
        });

        it('should return JSON', () => {
          assert.strictEqual(result.type, 'application/json');
        });

        it('should return the expected data', () => {
          assert.deepStrictEqual(result.body, dummy.mongoBuilding);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          Building.getOneById.rejects(dummy.error);
          result = await apiTest.get(`/${dummy.mongoBuilding.id}`);
        });

        it('should call getOneById', () => {
          assert.strictEqual(Building.getOneById.callCount, 1);
        });

        it('should pass in the id', () => {
          assert.strictEqual(
            Building.getOneById.args[0][0],
            dummy.mongoBuilding.id
          );
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
    describe('/byName/:name', () => {
      beforeEach(() => {
        sinon.stub(Building, 'getOneByName');
      });

      afterEach(() => {
        Building.getOneByName.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          Building.getOneByName.resolves(dummy.mongoBuilding);
          result = await apiTest.get(
            `/byName/${dummy.mongoBuilding.buildingName}`
          );
        });

        it('should call getOneByName', () => {
          assert.strictEqual(Building.getOneByName.callCount, 1);
        });

        it('should pass in the name', () => {
          assert.strictEqual(
            Building.getOneByName.args[0][0],
            dummy.mongoBuilding.buildingName
          );
        });

        it('should return a 200 status code', () => {
          assert.strictEqual(result.statusCode, 200);
        });

        it('should return JSON', () => {
          assert.strictEqual(result.type, 'application/json');
        });

        it('should return the expected data', () => {
          assert.deepStrictEqual(result.body, dummy.mongoBuilding);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          Building.getOneByName.rejects(dummy.error);
          result = await apiTest.get(
            `/byName/${dummy.mongoBuilding.buildingName}`
          );
        });

        it('should call getOneByName', () => {
          assert.strictEqual(Building.getOneByName.callCount, 1);
        });

        it('should pass in the name', () => {
          assert.strictEqual(
            Building.getOneByName.args[0][0],
            dummy.mongoBuilding.buildingName
          );
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
        sinon.stub(Building, 'createNew');
      });
      afterEach(() => {
        Building.createNew.restore();
      });
      describe('When createNew Succeeds', () => {
        beforeEach(async () => {
          Building.createNew.resolves(dummy.mongoBuilding);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawBuilding);
        });
        it('Should call Building.createNew', () => {
          assert.strictEqual(Building.createNew.callCount, 1);
        });

        it('Should pass in the raw data', () => {
          assert.deepStrictEqual(
            Building.createNew.args[0][0],
            dummy.rawBuilding
          );
        });

        it('should return a 200 status code', () => {
          assert.strictEqual(result.statusCode, 200);
        });

        it('should return JSON', () => {
          assert.strictEqual(result.type, 'application/json');
        });

        it('should return the expected data', () => {
          assert.deepStrictEqual(result.body, dummy.mongoBuilding);
        });
      });
      describe('When createNew fails', async () => {
        beforeEach(async () => {
          Building.createNew.rejects(dummy.error);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawBuilding);
        });

        it('Should call Building.createNew', () => {
          assert.strictEqual(Building.createNew.callCount, 1);
        });

        it('Should pass in the raw data', () => {
          assert.deepStrictEqual(
            Building.createNew.args[0][0],
            dummy.rawBuilding
          );
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
