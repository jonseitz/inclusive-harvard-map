import db from '../../server/models/db';

export default async () => {
  await db.collection('buildings').drop();
  await db.collection('floors').drop();
};
