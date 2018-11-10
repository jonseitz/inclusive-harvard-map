import db from '../../server/models/db';

export default async () => {
  await db.collection('buildings').deleteMany({});
  await db.collection('floors').deleteMany({});
};
