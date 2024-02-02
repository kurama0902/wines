const db = require("../firebaseConfig");

const getRangedHistory = async (req, res) => {
    const { page, email } = req?.body;
    console.log(req?.body, "req body");

    try {
        const ordersHistoryObj = (
            await db.collection("Orders").doc(email).get()
        ).data();

        const ordersHistoryArr = [];

        console.log(ordersHistoryObj);

        if (ordersHistoryObj !== undefined) {
            for (let id of Object.keys(ordersHistoryObj)) {
                ordersHistoryArr.push(ordersHistoryObj[id]);
            }

            const slicedHistoryArr = ordersHistoryArr.slice(page * 8 - 8, page * 8);
            const historyLength = ordersHistoryArr.length;

            res.send({
                items: slicedHistoryArr,
                pagesCount: Math.ceil(historyLength / 8),
            });
        } else {
            res.status(403).send({
                items: [],
                pagesCount: 1,
            });
        }
    } catch (error) {
        console.error("GETTING ERROR WHILE FETCHING ORDERS DATA");
        res.send(403);
    }
}

module.exports = getRangedHistory