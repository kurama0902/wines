const db = require("../firebaseConfig");

const getWinesNewSale = async (req, res) => {
    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());
    res.send(winesNewSale);
  }

module.exports = getWinesNewSale;