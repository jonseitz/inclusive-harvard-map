/** @api  buildingRouter */
import { Router } from 'express';
import createDb from '../models/db';

const buildingRouter = Router();

buildingRouter.use(async (req, res, next) => {
  req.db = await createDb();
  next();
});

/**
 * Get all of the building objects from the database
 * @endpoint  {GET}  /api/buildings/all
 * @returns {Promise.<BuildingData[]>}  An array of all the building objects in
 *          the database
 */

buildingRouter.get('/all', async (req, res, next) => {
  try {
    const bldgs = await req.db.model('Building').getAll();
    res.json(bldgs);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a single building object from the database by it's id
 * @endpoint  {GET}  /api/buildings/:id
 * @path  id  The mongo id of the desired building
 * @returns {Promise.<BuildingData>}  A single building object in the database
 */

buildingRouter.get('/:id', async (req, res, next) => {
  try {
    const bldg = await req.db.model('Building').getOneById(req.params.id);
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a single building object from the database by its iid
 * @endpoint  {GET}  /api/buildings/byName/:name
 * @path  name  The common name of the desired building
 * @returns {Promise.<BuildingData>}  A single building object in the database
 */

buildingRouter.get('/byName/:name', async (req, res, next) => {
  try {
    const bldg = await req.db.model('Building').getOneByName(req.params.name);
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a new building object in the database
 * @endpoint  {POST}  /api/buildings/new
 * @body  {BuildingData}  The building data to create
 * @returns  {Promise.<BuildingData>}  The new building object
 */

buildingRouter.post('/new', async (req, res, next) => {
  try {
    const bldg = await req.db.model('Building').createNew(req.body);
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

export default buildingRouter;
