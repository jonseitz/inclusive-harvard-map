import sinon from 'sinon';
import * as dummy from '../../../test/data';
import createDb from '../../../test/helpers/createDB';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Facility Model', () => {
  let db;
  let Facility;
  let testMongo;
  beforeEach(async () => {
    db = await createDb();
    testMongo = await populateDB(db);
    Facility = db.model('Facility');
  });
  describe('createNew', () => {
    describe('With valid data', () => {
      it('Should create a new object in the database');
      it('Should return the new object');
      describe('With previously defined data', () => {
        it('Should not throw an error');
      });
    });
    describe('With invalid data', () => {
      describe('With an invlaid type', () => {
        it('Should throw a validation error');
      });
      describe('With other errors', () => {
        it('Should throw a new error');
      });
    });
  });
});
