const db = require("../firebaseConfig");

const updateWineQuantity = async (req, res) => {
    const { id, quantity } = req?.body;

    console.log(id, " | ", quantity);

    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    const allWines = [popularWines, winesNewSale, winesPremium];
    const winesNames = ["popularWines", "winesNewSale", "winesPremium"];

    allWines.forEach(async (arr, index) => {
        const foundWine = arr.find((e) => e.id == id);
        console.log(foundWine);
        if (foundWine !== undefined) {
            foundWine.avaliableAmount = quantity;
            try {
                res.sendStatus(200);
                await db.collection(winesNames[index]).doc(`${id}`).set(foundWine);
            } catch (error) {
                console.error("QUANTITY UPDATE ERROR", error);
                res.sendStatus(403);
            }
        }
    });
}

module.exports = updateWineQuantity