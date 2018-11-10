import assert from 'assert';
import sinon from 'sinon';
import { Floor, Building } from '..';
import * as dummy from '../../../test/data';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Floor Model', () => {
  let testMongo;
  let result;
  afterEach(async () => {
    await depopulateDB();
  });
  describe('statics', () => {
    describe('From an unpopulated Database', () => {
      describe('addNew', () => {
        describe('with valid data', () => {
          beforeEach(async () => {
            const building = await Building.createNew(dummy.rawBuilding);
            result = await Floor.createNew({
              ...dummy.rawFloor,
              building: building.id,
            });
          });
          it('Should return a floor object', async () => {
            assert.notStrictEqual(result.id, undefined);
          });
        });
        describe('with invalid data', () => {
          it('Should throw an error', async () => {
            try {
              await Floor.createNew(dummy.rawBuilding);
              assert.fail('Should have thrown an error');
            } catch (err) {
              assert(err);
            }
          });
        });
        describe('trying to create the same floor twice', () => {
          beforeEach(async () => {
            const building = await Building.createNew(dummy.rawBuilding);
            await Floor.createNew({
              ...dummy.rawFloor,
              building: building.id,
            });
          });
          afterEach(async () => {
            await depopulateDB();
          });
          it('should throw an error', async () => {
            try {
              const building = await Building.createNew(dummy.rawBuilding);
              await Floor.createNew({
                ...dummy.rawFloor,
                building: building.id,
              });
              assert.fail('should have thrown an error');
            } catch (err) {
              assert(err);
            }
          });
        });
        describe('error handling', () => {
          describe('general Error', () => {
            beforeEach(() => {
              sinon.stub(Floor, 'create').rejects(dummy.error);
            });
            afterEach(() => {
              Floor.create.restore();
            });
            it('should throw an error', () => {
              assert.rejects(Floor.createNew);
            });
          });
        });
      });
    });
    describe('From a populated Database', () => {
      beforeEach(async () => {
        testMongo = await populateDB();
      });
      afterEach(async () => {
        await depopulateDB();
      });
      describe('getOneById', () => {
        describe('With a valid floorId', () => {
          let testFloor;
          beforeEach(async () => {
            testFloor = testMongo.floors[0];
            result = await Floor.getOneById(testFloor.id);
          });
          it('Should return the correct Floor', () => {
            assert.deepStrictEqual(result.id, testFloor.id);
          });
        });
        describe('With an invalid floor', () => {
          beforeEach(async () => {
            result = await Floor.getOneById(dummy.mongoId);
          });
          it('Should return nothing', () => {
            assert.deepStrictEqual(result, null);
          });
        });
        describe('error handling', () => {
          beforeEach(() => {
            sinon.stub(Floor, 'find').rejects(dummy.error);
          });
          afterEach(() => {
            Floor.find.restore();
          });
          it('should throw an error', () => {
            assert.rejects(Floor.getOneById);
          });
        });
      });
      describe('getAll', () => {
        describe('Normal operations', () => {
          beforeEach(async () => {
            result = await Floor.getAll();
          });
          it('Should return an array', () => {
            assert.strictEqual(Array.isArray(result), true);
          });
          it('Should return all of the floors in the db', () => {
            assert.strictEqual(result.length, testMongo.floors.length);
          });
        });
        describe('error handling', () => {
          beforeEach(() => {
            sinon.stub(Floor, 'find').rejects(dummy.error);
          });
          afterEach(() => {
            Floor.find.restore();
          });
          it('should throw an error', () => {
            assert.rejects(Floor.getAll);
          });
        });
      });
    });
  });
});
