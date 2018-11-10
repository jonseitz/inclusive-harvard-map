import assert from 'assert';
import sinon from 'sinon';
import { Building } from '..';
import * as dummy from '../../../test/data';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Building Model', () => {
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
            result = await Building.createNew(dummy.rawBuilding);
          });
          it('Should return a building object', async () => {
            assert.notStrictEqual(result.id, undefined);
          });
        });
        describe('with invalid data', () => {
          it('Should throw an error', async () => {
            try {
              await Building.createNew(dummy.rawFloor);
              assert.fail('Should have thrown an error');
            } catch (err) {
              assert(err);
            }
          });
        });
        describe('trying to create the same building twice', () => {
          beforeEach(async () => {
            await Building.createNew(dummy.rawBuilding);
          });
          it('should throw an error', async () => {
            try {
              await Building.createNew(dummy.rawBuilding);
              assert.fail('should have thrown an error');
            } catch (err) {
              assert(err);
            }
          });
        });
        describe('error handling', () => {
          describe('general Error', () => {
            beforeEach(() => {
              sinon.stub(Building, 'create').rejects(dummy.error);
            });
            afterEach(() => {
              Building.create.restore();
            });
            it('should throw an error', () => {
              assert.rejects(Building.createNew);
            });
          });
        });
      });
    });
    describe('From a populated Database', () => {
      beforeEach(async () => {
        testMongo = await populateDB();
      });
      describe('getOneById', () => {
        describe('With a valid buildingId', () => {
          let testBuilding;
          beforeEach(async () => {
            testBuilding = testMongo.buildings[0];
            result = await Building.getOneById(testBuilding.id);
          });
          it('Should return the correct Building', () => {
            assert.deepStrictEqual(result.id, testBuilding.id);
          });
          it('Should include the appropriate Floorplans', () => {
            assert.strictEqual(Array.isArray(result.floorplans), true);
            assert.strictEqual(result.floorplans.length > 0, true);
          });
        });
        describe('With an invalid building', () => {
          beforeEach(async () => {
            result = await Building.getOneById(dummy.mongoId);
          });
          it('Should return nothing', () => {
            assert.deepStrictEqual(result, null);
          });
        });
        describe('error handling', () => {
          beforeEach(() => {
            sinon.stub(Building, 'find').rejects(dummy.error);
          });
          afterEach(() => {
            Building.find.restore();
          });
          it('should throw an error', () => {
            assert.rejects(Building.getOneById);
          });
        });
      });
      describe('getAll', () => {
        describe('Normal operations', () => {
          beforeEach(async () => {
            result = await Building.getAll();
          });
          it('Should return an array', () => {
            assert.strictEqual(Array.isArray(result), true);
          });
          it('Should return all of the buildings in the db', () => {
            assert.strictEqual(result.length, testMongo.buildings.length);
          });
        });
        describe('error handling', () => {
          beforeEach(() => {
            sinon.stub(Building, 'find').rejects(dummy.error);
          });
          afterEach(() => {
            Building.find.restore();
          });
          it('should throw an error', () => {
            assert.rejects(Building.getAll);
          });
        });
      });
      describe('getOneByName', () => {
        describe('With a valid name', () => {
          let testBuilding;
          beforeEach(async () => {
            testBuilding = testMongo.buildings[0];
            result = await Building.getOneByName(testBuilding.buildingName);
          });
          it('Should return the correct Building', () => {
            assert.deepStrictEqual(result.id, testBuilding.id);
          });
          it('Should have the correct floorplans', () => {
            assert.strictEqual(Array.isArray(result.floorplans), true);
            assert.strictEqual(result.floorplans.length > 0, true);
          });
        });
        describe('With an invalid name', () => {
          beforeEach(async () => {
            result = await Building.getOneByName(dummy.string);
          });
          it('Should return null', () => {
            assert.strictEqual(result, null);
          });
        });
        describe('error handling', () => {
          beforeEach(() => {
            sinon.stub(Building, 'find').rejects(dummy.error);
          });
          afterEach(() => {
            Building.find.restore();
          });
          it('should throw an error', () => {
            assert.rejects(Building.getOneByName);
          });
        });
      });
    });
  });
});
