export default (db) => {
  return Promise.all([
    db.model('Building').deleteMany().exec(),
    db.model('Floor').deleteMany().exec(),
  ]);
};
