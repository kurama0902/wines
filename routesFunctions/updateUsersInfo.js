const db = require("../firebaseConfig");

const updateUsersInfo = async (req, res) => {
    const { firstName, lastName, username, email, mobile } = req?.body;

    console.log(email);

    try {
        const currentUsersInfo = (
            await db.collection("users").doc(email).get()
        ).data();

        currentUsersInfo.firstname = firstName;
        currentUsersInfo.lastname = lastName;
        currentUsersInfo.username = username;
        currentUsersInfo.mobile = mobile;

        await db.collection("users").doc(email).set(currentUsersInfo);

        res.sendStatus(200);
    } catch (error) {
        console.log(error, "Info updating error");
        res.sendStatus(403);
    }
}

module.exports = updateUsersInfo;