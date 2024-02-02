const db = require("../firebaseConfig");

const getWineById = async (req, res) => {
    const id = req.params.id;

    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
    const wine = allWines.find((wine) => Number(wine.id) === Number(id)) || null;
    res.send(wine);
}

module.exports = getWineById