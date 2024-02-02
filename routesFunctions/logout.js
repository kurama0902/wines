const db = require("../firebaseConfig");

const logout = async (req, res) => {
    const { email } = req?.body;
    try {
        await db.collection("IPs").doc(email).delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
}

module.exports = logout