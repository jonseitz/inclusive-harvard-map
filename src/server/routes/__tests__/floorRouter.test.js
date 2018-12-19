import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import errorHandler from '../errorHandler';
import floorRouter from '../floorRouter';
import db from '../../models/db';
import * as dummy from '../../../test/data';

describe('Floor Router', () => {
  let apiTest;
  let result;
  let FloorModel;

  beforeAll(() => {
    const app = express();
    app.use(express.json());
    app.use(floorRouter);
    app.use(errorHandler);
    apiTest = supertest(app);
    FloorModel = db.model('Floor');
  });

  describe('GET', () => {
    describe('/all', () => {
      beforeEach(() => {
        sinon.stub(FloorModel, 'getAll');
      });

      afterEach(() => {
        FloorModel.getAll.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          FloorModel.getAll.resolves(dummy.mongoFloorArray);
          result = await apiTest.get('/all');
        });

        it('should call the getAll method', () => {
          expect(FloorModel.getAll.callCount).toBe(1);
        });

        it('should return a 200 status code', () => {
          expect(result.statusCode).toBe(200);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should return the expected data', () => {
          expect(result.body).toEqual(dummy.mongoFloorArray);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          FloorModel.getAll.throws(dummy.error);
          result = await apiTest.get('/all');
        });

        it('should still call the getAll method', () => {
          expect(FloorModel.getAll.callCount).toBe(1);
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
        sinon.stub(FloorModel, 'getOneById');
      });

      afterEach(() => {
        FloorModel.getOneById.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          FloorModel.getOneById.resolves(dummy.mongoFloor);
          result = await apiTest.get(`/${dummy.mongoFloor.id}`);
        });

        it('should call getOneById', () => {
          expect(FloorModel.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(FloorModel.getOneById.args[0][0])
            .toBe(dummy.mongoFloor.id);
        });

        it('should return a 200 status code', () => {
          expect(result.statusCode).toBe(200);
        });

        it('should return JSON', () => {
          expect(result.type).toBe('application/json');
        });

        it('should return the expected data', () => {
          expect(result.body).toEqual(dummy.mongoFloor);
        });
      });

      describe('When querying the database fails', () => {
        beforeEach(async () => {
          FloorModel.getOneById.throws(dummy.error);
          result = await apiTest.get(`/${dummy.mongoFloor.id}`);
        });

        it('should call getOneById', () => {
          expect(FloorModel.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(FloorModel.getOneById.args[0][0])
            .toBe(dummy.mongoFloor.id);
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
