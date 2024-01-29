const defaultDB = require("../db/index");

const resetDatabaseByDefaultFn = (db) => {
  for (let ctg of ['popularWines', 'winesNewSale', 'winesPremium']) {
    defaultDB[ctg].forEach(async e => {
      await db.collection(ctg).doc(`${e.id}`).set(e)
    })
  }
};

module.exports = resetDatabaseByDefaultFn;