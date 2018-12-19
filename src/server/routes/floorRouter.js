/** @api server/floorRouter */

import { Router } from 'express';
import db from '../models/db';

const floorRouter = Router();

/**
 * Gets all of the floor objects in the database
 * @memberof  module:server/floorRouter
 * @function  GET /api/floors/all
 * @returns  {FloorData[]}  An array of all floor data
 */

floorRouter.get('/all', async (req, res, next) => {
  try {
    const plans = await db.model('Floor').getAll();
    res.json(plans);
  } catch (err) {
    next(err);
  }
});

/**
 * Gets a single floor object from the database
 * @memberof  module:server/floorRouter
 * @function  GET /api/floors/:id
 * @param  {String}  id  The mongo id of the Floor object
 * @returns  {FloorData}  The floor data object
 */

floorRouter.get('/:id', async (req, res, next) => {
  try {
    const plan = await db.model('Floor').getOneById(req.params.id);
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

export default floorRouter;
