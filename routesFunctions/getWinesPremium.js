const db = require("../firebaseConfig");

const getWinesPremium = async (req, res) => {
    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());
    res.send(winesPremium);
}

module.exports = getWinesPremium;