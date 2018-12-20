/** @api  server/facilityRouter */

import { Router } from 'express';
import db from '../models/db';

const facilityRouter = Router();

/**
 * Search for all facilities in the database
 * @memberof module:server/facilityRouter
 * @function  GET /api/facilities/all
 * @param  {Query}  [type]  Optional filter for types of facilities
 * @return  {Promise.<Facility[]>}  The list of facilities
 */

facilityRouter.get('/all', async (req, res, next) => {
  let filters = ['men', 'women', 'neutral', 'lactation'];
  if ('type' in req.query) {
    filters = req.query.type.split(',');
  }
  try {
    const docs = await db.model('Facility').getAll(filters);
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

/**
 * Get all of the data associated with an individual facility
 * @memberof  module:server/facilityRouter
 * @function  GET /api/facilities/:id
 * @param  {String}  facilityId  the mongo id of the intended facility
 * @returns  {Promise.<Facility>}  the complete facility object
 */

facilityRouter.get('/:facilityId', async (req, res, next) => {
  try {
    const doc = await db.model('Facility').findById(req.params.facilityId).exec();
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

export default facilityRouter;
