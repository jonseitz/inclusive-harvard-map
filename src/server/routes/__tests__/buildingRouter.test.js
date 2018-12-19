import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import errorHandler from '../errorHandler';
import buildingRouter from '../buildingRouter';
import db from '../../models/db';
import * as dummy from '../../../test/data';

describe('Building Router', () => {
  let apiTest;
  let result;
  let BuildingModel;

  beforeAll(() => {
    const app = express();
    app.use(express.json());
    app.use(buildingRouter);
    app.use(errorHandler);
    apiTest = supertest(app);
    BuildingModel = db.model('Building');
  });

  beforeEach(() => {
    sinon.stub(mongoose);
  });
  afterEach(() => {
    mongoose.restore();
  });

  describe('GET', () => {
    describe('/all', () => {
      beforeEach(() => {
        sinon.stub(BuildingModel, 'getAll');
      });
      afterEach(() => {
        BuildingModel.getAll.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          BuildingModel.getAll.returns(dummy.mongoBuildingArray);
          result = await apiTest.get('/all');
          return result;
        });

        it('should call the getAll method', () => {
          expect(BuildingModel.getAll.callCount).toBe(1);
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
          BuildingModel.getAll.throws(dummy.error);
          result = await apiTest.get('/all');
          return result;
        });

        it('should still call the getAll method', () => {
          expect(BuildingModel.getAll.callCount).toBe(1);
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
        sinon.stub(BuildingModel, 'getOneById');
      });

      afterEach(() => {
        BuildingModel.getOneById.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          BuildingModel.getOneById.returns(dummy.mongoBuilding);
          result = await apiTest.get(`/${dummy.mongoBuilding.id}`);
          return result;
        });

        it('should call getOneById', () => {
          expect(BuildingModel.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(BuildingModel.getOneById.args[0][0])
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
          BuildingModel.getOneById.throws(dummy.error);
          result = await apiTest.get(`/${dummy.mongoBuilding.id}`);
          return result;
        });

        it('should call getOneById', () => {
          expect(BuildingModel.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(BuildingModel.getOneById.args[0][0])
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
        sinon.stub(BuildingModel, 'getOneByName');
      });

      afterEach(() => {
        BuildingModel.getOneByName.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          BuildingModel.getOneByName.returns(dummy.mongoBuilding);
          result = await apiTest.get(
            `/byName/${dummy.mongoBuilding.buildingName}`
          );
          return result;
        });

        it('should call getOneByName', () => {
          expect(BuildingModel.getOneByName.callCount).toBe(1);
        });

        it('should pass in the name', () => {
          expect(BuildingModel.getOneByName.args[0][0])
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
          BuildingModel.getOneByName.throws(dummy.error);
          result = await apiTest.get(
            `/byName/${dummy.mongoBuilding.buildingName}`
          );
          return result;
        });

        it('should call getOneByName', () => {
          expect(BuildingModel.getOneByName.callCount).toBe(1);
        });

        it('should pass in the name', () => {
          expect(BuildingModel.getOneByName.args[0][0])
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
});
