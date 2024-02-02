const db = require("../firebaseConfig");

const getUsersOrderHistory = async (req, res) => {
    const { email } = req.body;

    try {
        const ordersHistoryDoc = await db.collection("Orders").doc(email).get();
        const ordersHistory = Object.entries(ordersHistoryDoc.data()).map(
            (e) => e[1]
        );

        res.send(ordersHistory);
    } catch (e) {
        console.log(e, "orders history error");
    }
}

module.exports = getUsersOrderHistory