/** @api server/layerRouter */

import { Router } from 'express';
import zlib from 'zlib';
import convert from 'xml-js';
import createDb from '../models/db';

const layerRouter = Router();

layerRouter.use(async (req, res, next) => {
  if (!req.db) {
    req.db = await createDb();
  }
  next();
});

/**
 * Returns a single layer from the database as an svg
 * @memberof module:server/layerRouter
 * @function  /api/layers/:id
 * @param  {String}  id  The layer's mongo id
 * @returns  {LayerSVG}  the layer data in SVG format
 */

layerRouter.get('/:id', async (req, res, next) => {
  try {
    const layer = await req.db.model('Layer').findById(req.params.id);
    if (layer) {
      res.json(layer);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * Create a new layer object in the database
 * @memberof module:server/layerRouter
 * @function  POST /api/layers/new
 * @param  {LayerData}  body  data object
 * @returns  {LayerData}  The resulting database object
 */

layerRouter.post('/new', async (req, res, next) => {
  try {
    const layer = await req.db.model('Layer').createNew(req.body);
    res.json(layer);
  } catch (err) {
    next(err);
  }
});

export default layerRouter;
