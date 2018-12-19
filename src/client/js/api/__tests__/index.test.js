import sinon from 'sinon';
import * as API from '../index';
import * as dummy from '../../../../test/data';

describe('client-side API calls', () => {
  let fetchStub;
  let response;
  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch');
  });
  afterEach(() => {
    fetchStub.restore();
  });
  describe('getBuildingList', () => {
    describe('When fetch succeeds', () => {});
    describe('When fetch fails', () => {
      beforeEach(() => {
        fetchStub.resolves({ ok: false });
      });
      it('Should throw an error', () => {
        expect(API.getBuildingList).toThrow();
      });
    });
  });
  describe('getSingleBuilding', () => {
    describe('When fetch succeeds', () => {});
    describe('When fetch fails', () => {
      beforeEach(() => {
        fetchStub.resolves({ ok: false });
      });
      it('Should throw an error', () => {
        expect(API.getSingleBuilding).toThrow();
      });
    });
  });
  describe('getLayerData', () => {
    describe('When fetch succeeds', () => {});
    describe('When fetch fails', () => {
      beforeEach(() => {
        fetchStub.resolves({ ok: false });
      });
      it('Should throw an error', () => {
        expect(API.getLayerData).toThrow();
      });
    });
  });
});
