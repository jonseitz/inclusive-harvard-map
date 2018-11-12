import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import errorHandler from '../errorHandler';
import buildingRouter from '../buildingRouter';
import BuildingSchema from '../../models/Building';
import * as dummy from '../../../test/data';

describe('Building Router', () => {
  let apiTest;
  let result;

  beforeAll(() => {
    jest.setTimeout(60000);
    const app = express();
    app.use(express.json());
    app.use(buildingRouter);
    app.use(errorHandler);
    app.use(async (req, res, next) => {
      if (req.db) {
        await req.db.close();
      }
      next();
    });
    apiTest = supertest(app);
  });

  describe('GET', () => {
    describe('/all', () => {
      beforeEach(() => {
        sinon.stub(BuildingSchema.statics, 'getAll');
      });

      afterEach(() => {
        BuildingSchema.statics.getAll.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          BuildingSchema.statics.getAll.returns(dummy.mongoBuildingArray);
          result = await apiTest.get('/all');
          return result;
        });

        it('should call the getAll method', () => {
          expect(BuildingSchema.statics.getAll.callCount).toBe(1);
        });

        it('should return a 200 status code', () => {
          expect(result.statusCode).toBe(200);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should return the expected data', () => {
          expect(result.body).toEqual(dummy.mongoBuildingArray);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          BuildingSchema.statics.getAll.throws(dummy.error);
          result = await apiTest.get('/all');
          return result;
        });

        it('should still call the getAll method', () => {
          expect(BuildingSchema.statics.getAll.callCount).toBe(1);
        });

        it('should return a 500 status code', () => {
          expect(result.statusCode).toBe(500);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should have an error', () => {
          expect(result.body.error).toBe('Error');
        });
      });
    });
    describe('/:id', () => {
      beforeEach(() => {
        sinon.stub(BuildingSchema.statics, 'getOneById');
      });

      afterEach(() => {
        BuildingSchema.statics.getOneById.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          BuildingSchema.statics.getOneById.returns(dummy.mongoBuilding);
          result = await apiTest.get(`/${dummy.mongoBuilding.id}`);
          return result;
        });

        it('should call getOneById', () => {
          expect(BuildingSchema.statics.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(BuildingSchema.statics.getOneById.args[0][0])
            .toBe(dummy.mongoBuilding.id);
        });

        it('should return a 200 status code', () => {
          expect(result.statusCode).toBe(200);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should return the expected data', () => {
          expect(result.body).toEqual(dummy.mongoBuilding);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          BuildingSchema.statics.getOneById.throws(dummy.error);
          result = await apiTest.get(`/${dummy.mongoBuilding.id}`);
          return result;
        });

        it('should call getOneById', () => {
          expect(BuildingSchema.statics.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(BuildingSchema.statics.getOneById.args[0][0])
            .toBe(dummy.mongoBuilding.id);
        });

        it('should return a 500 status code', () => {
          expect(result.statusCode).toBe(500);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should have an error', () => {
          expect(result.body.error).toBe('Error');
        });
      });
    });
    describe('/byName/:name', () => {
      beforeEach(() => {
        sinon.stub(BuildingSchema.statics, 'getOneByName');
      });

      afterEach(() => {
        BuildingSchema.statics.getOneByName.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          BuildingSchema.statics.getOneByName.returns(dummy.mongoBuilding);
          result = await apiTest.get(
            `/byName/${dummy.mongoBuilding.buildingName}`
          );
          return result;
        });

        it('should call getOneByName', () => {
          expect(BuildingSchema.statics.getOneByName.callCount).toBe(1);
        });

        it('should pass in the name', () => {
          expect(BuildingSchema.statics.getOneByName.args[0][0])
            .toBe(dummy.mongoBuilding.buildingName);
        });

        it('should return a 200 status code', () => {
          expect(result.statusCode).toBe(200);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should return the expected data', () => {
          expect(result.body).toEqual(dummy.mongoBuilding);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          BuildingSchema.statics.getOneByName.throws(dummy.error);
          result = await apiTest.get(
            `/byName/${dummy.mongoBuilding.buildingName}`
          );
          return result;
        });

        it('should call getOneByName', () => {
          expect(BuildingSchema.statics.getOneByName.callCount).toBe(1);
        });

        it('should pass in the name', () => {
          expect(BuildingSchema.statics.getOneByName.args[0][0])
            .toBe(dummy.mongoBuilding.buildingName);
        });

        it('should return a 500 status code', () => {
          expect(result.statusCode).toBe(500);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should have an error', () => {
          expect(result.body.error).toBe('Error');
        });
      });
    });
  });
  describe('POST', () => {
    describe('/new', () => {
      beforeEach(() => {
        sinon.stub(BuildingSchema.statics, 'createNew');
      });
      afterEach(() => {
        BuildingSchema.statics.createNew.restore();
      });
      describe('When createNew Succeeds', () => {
        beforeEach(async () => {
          BuildingSchema.statics.createNew.returns(dummy.mongoBuilding);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawBuilding);
          return result;
        });
        it('Should call BuildingSchema.statics.createNew', () => {
          expect(BuildingSchema.statics.createNew.callCount).toBe(1);
        });

        it('Should pass in the raw data', () => {
          expect(BuildingSchema.statics.createNew.args[0][0])
            .toEqual(dummy.rawBuilding);
        });

        it('should return a 200 status code', () => {
          expect(result.statusCode).toBe(200);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should return the expected data', () => {
          expect(result.body).toEqual(dummy.mongoBuilding);
        });
      });
      describe('When createNew fails', () => {
        beforeEach(async () => {
          BuildingSchema.statics.createNew.throws(dummy.error);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawBuilding);
          return result;
        });

        it('Should call BuildingSchema.statics.createNew', () => {
          expect(BuildingSchema.statics.createNew.callCount).toBe(1);
        });

        it('Should pass in the raw data', () => {
          expect(BuildingSchema.statics.createNew.args[0][0])
            .toEqual(dummy.rawBuilding);
        });

        it('should return a 500 status code', () => {
          expect(result.statusCode).toBe(500);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should have an error', () => {
          expect(result.body.error).toBe('Error');
        });
      });
    });
  });
});
