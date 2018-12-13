/* eslint-disable no-console */
import fs from 'fs';
import * as dxf from 'dxf';
import cloneDeep from 'lodash.clonedeep';
import { resolve } from 'path';
import { xml2json } from 'xml-js';

const layers = [
  'A-FLOR-EVTR',
  'A-FLOR-TPTN',
  'A-FLOR-STRS',
  'EC1 Area Polygons',
  'P-FIXT',
];

const convertFiles = async () => {
  const writePromises = [];
  const fileMap = new Map();
  const paths = await fs.promises.readdir(resolve(__dirname, './dxf'));
  // console.log(paths);
  const gitignore = paths.findIndex((path) => /gitignore/.test(path));
  if (~gitignore) {
    paths.splice(gitignore, 1);
  }
  // console.log(paths);
  const handles = await Promise.all(paths
    .filter((path) => (/\.dxf$/.test(path)))
    .map((path) => (
      fs.promises
        .open(resolve(__dirname, 'dxf', path), 'r')
    )));
  const contents = await Promise.all(handles
    .map((handle) => (
      handle.readFile({ encoding: 'UTF-8' })
    )));
  paths.forEach((path, index) => {
    fileMap.set(path, contents[index]);
  });
  fileMap.forEach((content, path) => {
    console.log(`parsing ${path}`);
    const dxfParsed = dxf.parseString(content);
    const layerMap = new Map();
    layers.forEach((thisLayer) => {
      const mod = cloneDeep(dxfParsed);
      mod.entities = mod.entities.filter(({ layer }) => layer === thisLayer);
      Object.keys(mod.tables.layers).forEach((tableLayer) => {
        if (thisLayer !== tableLayer) {
          delete mod.tables.layers[tableLayer];
        }
      });
      layerMap.set(thisLayer, mod);
    });
    // console.log(layerMap);
    // write an svg version of the file
    layerMap.forEach((parsed, layer) => {
      const svgName = path.replace(/\.dxf$/, `-${layer}.svg`);
      const svgPath = resolve(__dirname, 'svg', svgName);
      const svgVersion = dxf.toSVG(parsed);
      console.log(`writing ${svgName}`);
      writePromises.push(fs.promises.writeFile(svgPath, svgVersion));
      const jsonName = path.replace(/\.dxf$/, `-${layer}.json`);
      const jsonPath = resolve(__dirname, 'json', jsonName);
      const jsonVersion = xml2json(svgVersion, { compact: true, spaces: 2 });
      // console.log(jsonVersion);
      // process.exit(0);
      console.log(`writing ${jsonName}`);
      writePromises.push(fs.promises.writeFile(jsonPath, jsonVersion));
    });
  });
  return Promise.all(writePromises);
};

export default convertFiles;
