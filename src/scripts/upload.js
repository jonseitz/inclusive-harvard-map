/* eslint-disable no-console  */
import fs from 'fs';
import { resolve } from 'path';
import createDB from '../server/models/db';

const importData = async () => {
  const db = await createDB();
  const buildingList = await fs.promises
    .readFile(resolve(__dirname, './buildings.json'), { encoding: 'UTF-8' });

  const buildings = JSON.parse(buildingList);
  const buildingData = await Promise.all(buildings
    .map(async (building) => {
      let doc;
      console.log(`attempting to fetch ${building.buildingName} data`);
      doc = await db.model('Building').getOneByName(building.buildingName);
      if (doc === null) {
        console.log(`Could not fetch existing data for ${building.buildingName}. Creating new instead.`);
        doc = await db.model('Building').createNew(building);
      }
      return doc;
    }));
  const buildingIdMap = new Map(
    buildingData.map((b) => [b.buildingName, b.id])
  );
  const paths = await fs.promises.readdir(resolve(__dirname, './json'));
  const gitignore = paths.findIndex((path) => /gitignore/.test(path));
  if (~gitignore) {
    paths.splice(gitignore, 1);
  }
  const contents = await Promise.all(paths
    .map((path) => (
      fs.promises.readFile(resolve(__dirname, 'json', path), { encoding: 'UTF-8' })
    )));
  console.log(contents);
  const fileMap = new Map();
  paths.forEach((path, index) => {
    fileMap.set(path, JSON.parse(contents[index]));
  });
  console.log(fileMap);
  const superMap = new Map();
  fileMap.forEach((svgContent, thisFile) => {
    const fileRE = /^(([\w\s]+)_([-\dA-Z]{2}))-(.*).json$/;
    const [, , buildingName, floorNumber, layerName] = fileRE.exec(thisFile);
    if (superMap.has(buildingName)) {
      if (superMap.get(buildingName).has(floorNumber)) {
        superMap.get(buildingName).get(floorNumber).set(layerName, svgContent);
      } else {
        const layerMap = new Map();
        layerMap.set(layerName, svgContent);
        superMap.get(buildingName).set(floorNumber, layerMap);
      }
    } else {
      const layerMap = new Map();
      layerMap.set(layerName, svgContent);
      const floorMap = new Map();
      floorMap.set(floorNumber, layerMap);
      superMap.set(buildingName, floorMap);
    }
  });
  const floorIdMap = new Map();
  const sizeMap = new Map();
  superMap.forEach((floor, buildingName) => {
    floor.forEach((layer, floorNumber) => {
      const layerSizes = [];
      layer.forEach((svgData) => {
        layerSizes.push(svgData.svg._attributes.viewBox.split(' '));
      });
      const largestLayerSize = layerSizes.reduce((max, test) => {
        let [minX, minY, width, height] = test;
        minX = parseInt(minX, 10);
        minY = parseInt(minY, 10);
        width = parseInt(width, 10);
        height = parseInt(height, 10);
        const result = [...max];
        if (Number.isFinite(minX) && minX < max[0]) {
          result[0] = minX;
        }
        if (Number.isFinite(minY) && minY < max[1]) {
          result[1] = minY;
        }
        if (Number.isFinite(width) && width > max[2]) {
          result[2] = width;
        }
        if (Number.isFinite(height) && height > max[3]) {
          result[3] = height;
        }
        return result;
      }, [Infinity, Infinity, -Infinity, -Infinity]);
      sizeMap.set(`${buildingName}_${floorNumber}`, largestLayerSize);
    });
  });
  const floorImports = [];
  const layerImports = [];
  superMap.forEach((floors, buildingName) => {
    floors.forEach((layers, floorNumber) => {
      const floorObject = {
        building: buildingIdMap.get(buildingName),
        floorNumber,
      };
      floorImports.push(db.model('Floor').createNew(floorObject).then((floorMongo) => {
        floorIdMap.set(`${buildingName}_${floorNumber}`, floorMongo.id);
      }));
    });
  });
  await Promise.all(floorImports);
  superMap.forEach((floors, buildingName) => {
    floors.forEach((layers, floorNumber) => {
      layers.forEach((svgContent, layerName) => {
        const layerPaths = svgContent.svg.path;
        if (layerPaths) {
          const layerData = layerPaths.map((path) => path._attributes.d);
          const layerObject = {
            floor: floorIdMap.get(`${buildingName}_${floorNumber}`),
            layerName,
            layerData,
            layerViewBox: sizeMap.get(`${buildingName}_${floorNumber}`),
          };
          layerImports.push(db.model('Layer').createNew(layerObject));
        }
      });
    });
  });
  return Promise.all(layerImports);
};

export default importData;
