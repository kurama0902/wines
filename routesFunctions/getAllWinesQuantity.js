const db = require("../firebaseConfig");

const getAllWinesQuantity = async (req, res) => {
    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
    const length = allWines.length;
    res.send(`${length}`);
}

module.exports = getAllWinesQuantity