const db = require("../firebaseConfig");

const changeGoodsQuantity = async (req, res) => {
    const { IDs, productsQuant } = req.body;
  
    console.log(IDs, "IDS");
    console.log(productsQuant, "products quant");
  
    try {
      const popularWinesCollection = await db.collection("popularWines").get();
      const popularWines = popularWinesCollection.docs.map((e) => e.data());
  
      const winesNewSaleCollection = await db.collection("winesNewSale").get();
      const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());
  
      const winesPremiumCollection = await db.collection("winesPremium").get();
      const winesPremium = winesPremiumCollection.docs.map((e) => e.data());
  
      const allWinesArr = [popularWines, winesNewSale, winesPremium];
      const winesCategoriesNames = [
        "popularWines",
        "winesNewSale",
        "winesPremium",
      ];
  
      for (let i = 0; i < IDs.length; i++) {
        allWinesArr.forEach((arr, index) => {
          return arr.forEach(async (e) => {
            if (e.id === IDs[i]) {
              e.avaliableAmount -= productsQuant[i];
              await db
                .collection(winesCategoriesNames[index])
                .doc(`${e.id}`)
                .set(e);
            }
          });
        });
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.log(error, "quantity changing error");
      res.sendStatus(400);
    }
  }

  module.exports = changeGoodsQuantity