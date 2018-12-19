/** @api  server/facilityRouter */

import { Router } from 'express';
import db from '../models/db';

const facilityRouter = Router();

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
