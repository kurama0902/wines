const db = require("../firebaseConfig");

const getPopularWines = async (req, res) => {
    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());
    res.send(popularWines);
}

module.exports = getPopularWines;