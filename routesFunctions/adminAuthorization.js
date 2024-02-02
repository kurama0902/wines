const db = require("../firebaseConfig");

const adminAuthorization = async (req, res) => {
    const { email, password } = req?.body;
    console.log(email, password, "|  admin-auth data");

    try {
        const adminData = (
            await db.collection("adminsAccounts").doc(email).get()
        ).data();
        console.log(adminData);

        if (adminData.pass === password) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(401);
    }
}

module.exports = adminAuthorization;