const db = require("../firebaseConfig");

const getDataArray = async (req, res) => {
    let items = [];

    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    console.log(req?.body, " req?.body");

    for (let ID of req?.body) {
        items.push(
            [...popularWines, ...winesNewSale, ...winesPremium].find(
                (item) => item.id === ID
            )
        );
    }
    console.log(items);
    res.send(items);
}

module.exports = getDataArray