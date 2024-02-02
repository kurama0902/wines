const db = require("../firebaseConfig");

const updatePassword = async (req, res) => {
    const { email, pass } = req?.body;
    try {
        const user = (await db.collection("users").doc(email).get()).data();
        user.pass = pass;
        await db.collection("users").doc(email).set(user);
        res.send(user);
    } catch (error) {
        console.log("UPDATE USERS SI ERROR");
        res.sendStatus(403);
    }
}

module.exports = updatePassword;