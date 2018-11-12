import sinon from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BuildingSchema } from '../Building';
import * as dummy from '../../../test/data';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Building Model', () => {
  let mongod;
  let db;
  let Building;
  let testMongo;
  let testBuilding;
  let result;
  beforeEach(async () => {
    mongod = new MongoMemoryServer();
    db = await mongoose.createConnection(await mongod.getConnectionString(), {
      useNewUrlParser: true,
    });
    Building = db.model('Building', BuildingSchema);
    testMongo = await populateDB(db);
  });
  afterEach(async () => {
    await depopulateDB(db);
    await db.close();
    await mongod.stop();
  });
  describe('With an unpopulated Database', () => {
    describe('createNew', () => {
      describe('with valid data', () => {
        beforeEach(async () => {
          result = await Building.createNew(dummy.newRawBuilding);
        });
        it('Should return a building object', async () => {
          expect(result).toBeDefined();
        });
      });

      describe('with invalid data', () => {
        it('Should throw an error', async () => {
          await expect(
            Building.createNew(dummy.rawFloor)
          ).rejects.toThrow();
        });
      });

      describe('trying to create the same building twice', () => {
        it('should throw an error', async () => {
          await expect(
            Building.createNew(dummy.rawBuilding)
          ).rejects.toThrow();
        });
      });

      describe('general error handling', () => {
        beforeEach(() => {
          sinon.stub(Building, 'create').throws(dummy.error);
        });
        afterEach(() => {
          Building.create.restore();
        });
        it('should throw an error', async () => {
          await expect(
            Building.createNew(dummy.rawBuilding)
          ).rejects.toThrow();
        });
      });
    });
  });
  describe('From a populated Database', () => {
    describe('getOneById', () => {
      describe('With a valid buildingId', () => {
        beforeEach(async () => {
          testBuilding = testMongo.buildings[0];
          result = await Building.getOneById(testBuilding.id);
        });
        it('Should return the correct Building', () => {
          expect(result.id).toBe(testBuilding.id);
        });
        it('Should include the appropriate Floorplans', () => {
          expect(Array.isArray(result.floorplans)).toBeTruthy();
          expect(result.floorplans.length).toBeGreaterThan(0);
        });
      });
      describe('With an invalid building', () => {
        beforeEach(async () => {
          result = await Building.getOneById(dummy.mongoId);
        });
        it('Should return nothing', () => {
          expect(result).toBe(null);
        });
      });
      describe('error handling', () => {
        beforeEach(() => {
          sinon.stub(Building, 'findById').throws(dummy.error);
        });
        afterEach(() => {
          Building.findById.restore();
        });
        it('should throw an error', async () => {
          await expect(
            Building.getOneById(testBuilding.id)
          ).rejects.toThrow();
        });
      });
    });
    describe('getAll', () => {
      describe('Normal operations', () => {
        beforeEach(async () => {
          result = await Building.getAll();
        });
        it('Should return an array', () => {
          expect(Array.isArray(result)).toBeTruthy();
        });
        it('Should return all of the buildings in the db', () => {
          expect(result.length).toBe(testMongo.buildings.length);
        });
      });
      describe('error handling', () => {
        beforeEach(() => {
          sinon.stub(Building, 'find').throws(dummy.error);
        });
        afterEach(() => {
          Building.find.restore();
        });
        it('should throw an error', async () => {
          await expect(
            Building.getAll()
          ).rejects.toThrow();
        });
      });
    });
    describe('getOneByName', () => {
      describe('With a valid name', () => {
        beforeEach(async () => {
          testBuilding = testMongo.buildings[0];
          result = await Building.getOneByName(testBuilding.buildingName);
        });
        it('Should return the correct Building', () => {
          expect(result.id).toBe(testBuilding.id);
        });
        it('Should have the correct floorplans', () => {
          expect(Array.isArray(result.floorplans)).toBeTruthy();
          expect(result.floorplans.length).toBeGreaterThan(0);
        });
      });
      describe('With an invalid name', () => {
        beforeEach(async () => {
          result = await Building.getOneByName(dummy.string);
        });
        it('Should return null', () => {
          expect(result).toBe(null);
        });
      });
      describe('error handling', () => {
        beforeEach(() => {
          sinon.stub(Building, 'findOne').throws(dummy.error);
        });
        afterEach(() => {
          Building.findOne.restore();
        });
        it('should throw an error', async () => {
          await expect(
            Building.getOneByName(testBuilding.buildingName)
          ).rejects.toThrow();
        });
      });
    });
  });
});
