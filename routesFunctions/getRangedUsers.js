const db = require("../firebaseConfig");

const getRangedUsers = async (req, res) => {
    const { page } = req?.body;
    console.log(req?.body, "req body");

    const usersArr = (await db.collection("users").get()).docs.map((e) =>
        e.data()
    );

    console.log(usersArr, "Users");

    if (usersArr?.length) {
        const slicedUsersArr = usersArr.slice(page * 9 - 9, page * 9);
        const usersLength = usersArr.length;

        res.send({
            items: slicedUsersArr,
            pagesCount: Math.ceil(usersLength / 9),
        });
    } else {
        res.send({ flag: true });
    }
}

module.exports = getRangedUsers