import sinon from 'sinon';
import * as dummy from '../../../test/data';
import createDb from '../../../test/helpers/createDB';
import populateDB from '../../../test/helpers/populateDB';
import depopulateDB from '../../../test/helpers/depopulateDB';

describe('Layer Model', () => {
  let db;
  let Layer;
  let testMongo;
  beforeEach(async () => {
    db = await createDb();
    testMongo = await populateDB(db);
    Layer = db.model('Layer');
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
  describe('getOneByID', () => {
    describe('With valid id', () => {
      it('Should return the new object');
    });
    describe('With an invalid id', () => {
      it('Should throw a validation error');
    });
  });
  describe('getAll', function () => {
    describe('When function succeeds', () => {
      it('Should return the complete list');
    });
    describe('When function fails', () => {
      it('Should throw an error');
  });
});
