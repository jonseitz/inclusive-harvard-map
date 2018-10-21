import { Router } from 'express';
import db from '../models';

const floorplanDB = db.model('Floorplan');

const floorplanRouter = Router();

floorplanRouter.get('/all', (req, res) => {
  const plans = floorplanDB.find().exec();
  res.json(plans);
});

floorplanRouter.get('/:id', (req, res) => {
  const plan = floorplanDB.findById(req.params.id).exec();
  res.json(plan);
});

floorplanRouter.post('/new', (req, res) => {
  const plan = req.body.data;
  const planObject = floorplanDB.create(plan).save();
  res.json(planObject);
});

export default floorplanRouter;
