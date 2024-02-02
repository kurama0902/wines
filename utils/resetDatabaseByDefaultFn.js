const db = require("../firebaseConfig");
const defaultDB = require("../db/index");

const resetDatabaseByDefaultFn = () => {
  for (let ctg of ['popularWines', 'winesNewSale', 'winesPremium']) {
    defaultDB[ctg].forEach(async e => {
      await db.collection(ctg).doc(`${e.id}`).set(e)
    })
  }
};

module.exports = resetDatabaseByDefaultFn;