import assert from 'assert';
import { Building } from '..';
import * as dummy from '../../../test/data';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Building Model', () => {
  let testBuilding;
  let testFloor;
  beforeEach(async () => {
    const testData = await populateDB();
    ({ testBuilding, testFloor } = testData);
  });
  afterEach(async () => {
    await depopulateDB();
  });
  describe('statics', () => {
    describe('getOneById', () => {
      it('Should return the correct Building', async () => {
        const result = await Building.getOneById(testBuilding.id);
        assert.deepStrictEqual(result, testBuilding);
      });
    });
  });
});
