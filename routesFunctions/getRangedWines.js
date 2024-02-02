const db = require("../firebaseConfig");

const getRangedWines = async (req, res) => {
    const { page } = req?.body;

    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
    const slicedWinesArr = allWines.slice(page * 8 - 8, page * 8);
    const length = allWines.length;

    res.send({
        items: slicedWinesArr,
        pagesCount: Math.ceil(length / 8),
    });
}

module.exports = getRangedWines