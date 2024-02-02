const db = require("../firebaseConfig");

const ImageKit = require("imagekit");
const fs = require('fs');

const IK = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
});

const updatePhoto = async (req, res) => {

    const emailByDefault = req?.body.email;
    let { email } = req?.body;
    email = email.split("@")[0];

    const avatar = req?.file;

    console.log(email, "EMAIL");
    console.log(avatar, "AVATAR");

    IK.listFiles({
        tags: [email]
    }, function (error, result) {

        console.log(result, "RESUUUUUUUUUUUUUUUUUUULT");
        if (!error) {
            if (result?.length) {
                IK.deleteFile(result[0].fileId, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(result);
                    }
                });
            }

            const file = fs.readFileSync(`./${avatar.path}`);

            const uploadOptions = {
                file: file,
                fileName: `${email}.${avatar.mimetype.split('/')[1]}`,
                folder: '/home/',
                tags: email,
            };

            IK.upload(uploadOptions, async (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(401);
                } else {
                    const user = (await db.collection('users').doc(emailByDefault).get()).data();
                    try {
                        user.imgURL = result.url;

                        await db.collection('users').doc(emailByDefault).set(user);
                    } catch (error) {
                        console.error("AVATAR URL ERROR", error);
                    }
                    console.log(result, "RESULT");
                    fs.unlinkSync(`./${avatar.path}`);
                    res.send(user);
                }
            });
        } else {
            res.sendStatus(401)
        }
    });
}

module.exports = updatePhoto