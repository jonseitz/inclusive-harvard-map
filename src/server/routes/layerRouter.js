/** @api server/layerRouter */

import { Router } from 'express';
import db from '../models/db';

const layerRouter = Router();

/**
 * Returns a single layer from the database as an svg
 * @memberof module:server/layerRouter
 * @function  /api/layers/:id
 * @param  {String}  id  The layer's mongo id
 * @returns  {LayerSVG}  the layer data in SVG format
 */

layerRouter.get('/:id', async (req, res, next) => {
  try {
    const layer = await db.model('Layer').findById(req.params.id);
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

export default layerRouter;
