import { Router } from 'express';
import db from '../mongoose';

// mongoose.connect('mongodb://mongo/inclusive-maps');
// const floorplanDB = mongoose.model('Floor', FloorSchema);

const floorplanRouter = Router();
const Floor = db.model('Floor');

floorplanRouter.get('/all', async (req, res, next) => {
  try {
    const plans = await Floor.find({}).exec();
    res.json(plans);
  } catch (err) {
    next(err);
  }
});

floorplanRouter.get('/:id', (req, res, next) => {
  try {
    const plan = Floor.findById(req.params.id).exec();
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

floorplanRouter.post('/new', async (req, res, next) => {
  try {
    const plan = await new Floor(req.body).save();
    res.json(plan);
  } catch (err) {
    next(err);
  }
});

export default floorplanRouter;
