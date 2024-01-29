const ImageKit = require("imagekit");
const fs = require('fs');

const IK = new ImageKit({
    publicKey: "public_o8GkazK+J8PCgWzn4e76LM4FNQk=",
    privateKey: "private_fopWiUVI+uoahH5u+NlTZhqJO7M=",
    urlEndpoint: "https://ik.imagekit.io/nw50elh8t/"
});

const updatePhotoFn = async (db, email, emailByDefault, avatar, res) => {
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
                    try {
                        await db.collection('avatarURLS').doc(emailByDefault).set({ url: result.url });
                    } catch (error) {
                        console.error("AVATAR URL ERROR", error);
                    }
                    console.log(result, "RESULT");
                    fs.unlinkSync(`./${avatar.path}`);
                    res.send(result.url);
                }
            });
        } else {
            res.sendStatus(401)
        }
    });
}

module.exports = updatePhotoFn