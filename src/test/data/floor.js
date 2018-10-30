/** @module TestData/Floorplan */

export const rawFloor = {
  building: '5bd662c064360203da3ad376',
  floorNumber: '1',
  layers: [],
  facilities: [],
};

export const mongoFloor = {
  _id: '5bd662c064360203da3ad376',
  building: '5bd662c064360203da3ad376',
  floorNumber: '1',
  layers: [],
  __v: 0,
  facilities: [],
  id: '5bd662c064360203da3ad376',
};

export const mongoLayer = {
  _id: '5bd662c064360203da3ad379',
  _declaration: {
    _attributes: {
      version: '1',
    },
  },
  svg: {
    _attributes: {
      xlmns: '',
      'xlmns:xlink': '',
      version: '',
      preserveAspectRatio: '',
      viewBox: '100x100',
      width: '100px',
      height: '100px',
    },
  },
  path: [
    {
      _attributes: {
        fill: '#FFFFFFF',
        stroke: '#0000000',
        'stroke-width': '2px',
        d: '',
      },
    },
  ],
  __v: 0,
  id: '5bd662c064360203da3ad379',
};

export const mongoFloorArray = [
  {
    _id: '5bd662c064360203da3ad376',
    building: '5bd662c964360203da3b54a0',
    floorNumber: '-1',
    layers: [mongoLayer],
    __v: 0,
    facilities: [],
    id: '5bd662c064360203da3ad376',
  },
  {
    _id: '5bd662c064360203da3ad376',
    building: '5bd662c964360203da3b54a0',
    floorNumber: '1',
    layers: [mongoLayer],
    __v: 0,
    facilities: [],
    id: '5bd662c064360203da3ad376',
  },
  {
    _id: '5bd662c064360203da3ad376',
    building: '5bd662c964360203da3b54a0',
    floorNumber: 'B2',
    layers: [mongoLayer],
    __v: 0,
    facilities: [],
    id: '5bd662c064360203da3ad376',
  },
];
