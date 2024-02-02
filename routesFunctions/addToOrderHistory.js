const db = require("../firebaseConfig");

const addToOrderHistory = async (req, res) => {
    const { email, productsInfo } = req?.body;
    const date = new Date();

    const historyDoc = await db.collection("Orders").doc(email).get();
    const historyList = historyDoc.data()
        ? Object.entries(historyDoc.data())
        : [];

    productsInfo[1].forEach((e, index) => {
        historyList.push([
            `${historyList.length}`,
            {
                name: productsInfo[0][index].description,
                quantity: e,
                cost: productsInfo[0][index].cost * e,
                date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
            },
        ]);
    });

    await db.collection("Orders").doc(email).set(Object.fromEntries(historyList));

    res.sendStatus(200);
}

module.exports = addToOrderHistory