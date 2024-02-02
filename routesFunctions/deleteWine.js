const db = require("../firebaseConfig");

const deleteWine = async (req, res) => {
    const { id } = req?.body;

    try {
        const popularWinesCollection = await db.collection("popularWines").get();
        const popularWines = popularWinesCollection.docs.map((e) => e.data());

        const winesNewSaleCollection = await db.collection("winesNewSale").get();
        const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

        const winesPremiumCollection = await db.collection("winesPremium").get();
        const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

        let allWinesArr = [popularWines, winesNewSale, winesPremium];
        const winesCategoriesNames = [
            "popularWines",
            "winesNewSale",
            "winesPremium",
        ];

        let newAllWinesArr = [];

        allWinesArr.forEach(async (arr, index) => {
            let foundItem = arr.find((e) => e.id === id);
            if (foundItem !== undefined) {
                newAllWinesArr = [...newAllWinesArr, arr.filter((e) => e.id !== id)];
                await db.collection(winesCategoriesNames[index]).doc(`${id}`).delete();
            }
            newAllWinesArr = [...newAllWinesArr, arr.filter((e) => e.id !== id)];
        });

        console.log(newAllWinesArr);

        newAllWinesArr.forEach((arr, index) => {
            arr.forEach(async (elem) => {
                try {
                    await db
                        .collection(winesCategoriesNames[index])
                        .doc(`${elem.id}`)
                        .set(elem);
                } catch (error) {
                    console.log("DELETE ERROR", error);
                }
            });
        });

        res.sendStatus(200);
    } catch (error) {
        console.log("Delete user error", error);
        res.sendStatus(403);
    }
}

module.exports = deleteWine