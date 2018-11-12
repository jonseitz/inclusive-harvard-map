import express from 'express';
import supertest from 'supertest';
import sinon from 'sinon';
import errorHandler from '../errorHandler';
import floorRouter from '../floorRouter';
import FloorSchema from '../../models/Floor';
import * as dummy from '../../../test/data';

describe('Floor Router', () => {
  let apiTest;
  let result;

  beforeEach(() => {
    jest.setTimeout(10000);
    const app = express();
    app.use(express.json());
    app.use(floorRouter);
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
        sinon.stub(FloorSchema.statics, 'getAll');
      });

      afterEach(() => {
        FloorSchema.statics.getAll.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          FloorSchema.statics.getAll.resolves(dummy.mongoFloorArray);
          result = await apiTest.get('/all');
        });

        it('should call the getAll method', () => {
          expect(FloorSchema.statics.getAll.callCount).toBe(1);
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
          FloorSchema.statics.getAll.throws(dummy.error);
          result = await apiTest.get('/all');
        });

        it('should still call the getAll method', () => {
          expect(FloorSchema.statics.getAll.callCount).toBe(1);
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
        sinon.stub(FloorSchema.statics, 'getOneById');
      });

      afterEach(() => {
        FloorSchema.statics.getOneById.restore();
      });

      describe('When querying database succeeds', () => {
        beforeEach(async () => {
          FloorSchema.statics.getOneById.resolves(dummy.mongoFloor);
          result = await apiTest.get(`/${dummy.mongoFloor.id}`);
        });

        it('should call getOneById', () => {
          expect(FloorSchema.statics.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(FloorSchema.statics.getOneById.args[0][0])
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
          FloorSchema.statics.getOneById.throws(dummy.error);
          result = await apiTest.get(`/${dummy.mongoFloor.id}`);
        });

        it('should call getOneById', () => {
          expect(FloorSchema.statics.getOneById.callCount).toBe(1);
        });

        it('should pass in the id', () => {
          expect(FloorSchema.statics.getOneById.args[0][0])
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
  describe('POST', () => {
    describe('/new', () => {
      beforeEach(() => {
        sinon.stub(FloorSchema.statics, 'createNew');
      });
      afterEach(() => {
        FloorSchema.statics.createNew.restore();
      });
      describe('When createNew Succeeds', () => {
        beforeEach(async () => {
          FloorSchema.statics.createNew.resolves(dummy.mongoFloor);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawFloor);
        });
        it('Should call FloorSchema.statics.createNew', () => {
          expect(FloorSchema.statics.createNew.callCount).toBe(1);
        });

        it('Should pass in the raw data', () => {
          expect(FloorSchema.statics.createNew.args[0][0])
            .toEqual(dummy.rawFloor);
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
      describe('When createNew fails', () => {
        beforeEach(async () => {
          FloorSchema.statics.createNew.throws(dummy.error);
          result = await apiTest
            .post('/new')
            .set('Accept', 'application/json')
            .send(dummy.rawFloor);
        });

        it('Should call FloorSchema.statics.createNew', () => {
          expect(FloorSchema.statics.createNew.callCount).toBe(1);
        });

        it('Should pass in the raw data', () => {
          expect(FloorSchema.statics.createNew.args[0][0])
            .toEqual(dummy.rawFloor);
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
