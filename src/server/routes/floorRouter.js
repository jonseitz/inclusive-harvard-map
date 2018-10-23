/** @api server/floorRouter */

import { Router } from 'express';
import db from '../mongoose';

const floorRouter = Router();
const Floor = db.model('Floor');

/**
 * Gets all of the floor objects in the database
 * @endpoint  {GET}  /api/floors/all
 *
 * @returns  {Promise.<FloorData[]>}  An array of all floor data
 */

floorRouter.get('/all', async (req, res, next) => {
  try {
    const plans = await Floor.find({}).exec();
    res.json(plans);
  } catch (err) {
    next(err);
  }
});

/**
 * Gets a single floor object from the database
 * @endpoint  {GET}  /api/floors/:id
 * @path  {String}  id  The mongo id of the Floor object
 * @returns  {Promise.<FloorData>}  The floor data object
 */

floorRouter.get('/:id', (req, res, next) => {
  try {
    const plan = Floor.findById(req.params.id).exec();
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a new floor object in the database
 * @endpoint  {POST}  /api/floors/new
 * @body  {FloorData}  The floor data object
 * @returns  {Promise.<FloorData>}  The resulting database object
 */

floorRouter.post('/new', async (req, res, next) => {
  try {
    const plan = await new Floor(req.body).save();
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

export default floorRouter;
