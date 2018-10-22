import { Router } from 'express';
import db from '../mongoose';

const Building = db.model('Building');
const buildingRouter = Router();

buildingRouter.post('/new', async (req, res, next) => {
  try {
    const bldg = await new Building(req.body).save();
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

buildingRouter.get('/all', async (req, res, next) => {
  try {
    const bldg = Building.find().exec();
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

buildingRouter.get('/:id', async (req, res, next) => {
  try {
    const bldg = await Building.findById(req.params.id).save();
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

buildingRouter.get('/byName/:name', async (req, res, next) => {
  try {
    const bldg = await Building.findOne({
      buildingName: req.params.name,
    }).exec();
    res.json(bldg);
  } catch (err) {
    next(err);
  }
});

export default buildingRouter;
