const db = require("../firebaseConfig");

const getSearchedInfo = async (req, res) => {
    const { inputValue } = req.body;
    console.log(inputValue);

    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    const seachedProductsResult =
        inputValue.length > 0
            ? [...popularWines, ...winesNewSale, ...winesPremium].filter((item) =>
                item.description
                    .toLocaleLowerCase()
                    .includes(inputValue.toLocaleLowerCase())
            )
            : [];
    res.send(seachedProductsResult);
}

module.exports = getSearchedInfo