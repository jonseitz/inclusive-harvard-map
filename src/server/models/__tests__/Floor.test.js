import sinon from 'sinon';
import * as dummy from '../../../test/data';
import createDb from '../../../test/helpers/createDB';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Floor Model', () => {
  let db;
  let Floor;
  let testMongo;
  let testFloor;
  let testBuilding;
  let result;
  beforeEach(async () => {
    db = await createDb();
    testMongo = await populateDB(db);
    Floor = db.model('Floor');
  });
  // afterEach(async () => {
  // await depopulateDB(db);
  // await db.close();
  // });
  describe('createNew', () => {
    beforeEach(() => {
      testBuilding = testMongo.buildings[0];
    });
    describe('with valid data', () => {
      beforeEach(async () => {
        result = await Floor.createNew({
          ...dummy.newRawFloor,
          building: testBuilding.id,
        });
      });
      it('Should return a floor object', () => {
        expect(result.id).toBeDefined();
      });
    });

    describe('with invalid data', () => {
      it('Should throw an error', async () => {
        await expect(
          Floor.createNew(dummy.rawBuilding)
        ).rejects.toThrow();
      });
    });

    describe('trying to create the same floor twice', () => {
      it('should throw an error', async () => {
        await expect(
          Floor.createNew(
            {
              ...dummy.rawFloor,
              building: testBuilding.id,
            }
          )
        ).rejects.toThrow();
      });
    });

    describe('general error handling', () => {
      beforeEach(() => {
        sinon.stub(Floor, 'create').throws(dummy.error);
      });
      afterEach(() => {
        Floor.create.restore();
      });
      it('should throw an error', async () => {
        await expect(
          Floor.createNew(
            {
              ...dummy.newRawFloor,
              building: testBuilding.id,
            }
          )
        ).rejects.toThrow();
      });
    });
  });
  beforeEach(async () => {
  });
  describe('getOneById', () => {
    describe('With a valid floorId', () => {
      beforeEach(async () => {
        testFloor = testMongo.floors[0];
        result = await Floor.getOneById(testFloor.id);
      });
      it('Should return the correct Floor', () => {
        expect(result.id).toBe(testFloor.id);
      });
    });
    describe('With an invalid floor', () => {
      beforeEach(async () => {
        result = await Floor.getOneById(dummy.mongoId);
      });
      it('Should return nothing', () => {
        expect(result).toBeNull();
      });
    });
    describe('error handling', () => {
      beforeEach(() => {
        sinon.stub(Floor, 'findById').throws(dummy.error);
      });
      afterEach(() => {
        Floor.findById.restore();
      });
      it('should throw an error', async () => {
        testFloor = testMongo.floors[0];
        await expect(Floor.getOneById(testFloor.id)).rejects.toThrow();
      });
    });
  });
  describe('getAll', () => {
    describe('Normal operations', () => {
      beforeEach(async () => {
        result = await Floor.getAll();
      });
      it('Should return an array', () => {
        expect(Array.isArray(result)).toBeTruthy();
      });
      it('Should return all of the floors in the db', () => {
        expect(result.length).toBe(testMongo.floors.length);
      });
    });
    describe('error handling', () => {
      beforeEach(() => {
        sinon.stub(Floor, 'find').throws(dummy.error);
      });
      afterEach(() => {
        Floor.find.restore();
      });
      it('should throw an error', async () => {
        await expect(Floor.getAll()).rejects.toThrow();
      });
    });
  });
});
