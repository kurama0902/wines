const db = require("../firebaseConfig");

const deleteUser = async (req, res) => {
    const { email } = req?.body;

    try {
        await db.collection("users").doc(email).delete();
        res.sendStatus(200);
    } catch (error) {
        console.error("User can not be deleted", error);
        res.sendStatus(403);
    }
}

module.exports = deleteUser