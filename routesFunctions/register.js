const os = require("os");
const db = require("../firebaseConfig");
const networkInterfaces = os.networkInterfaces();

const register = async (req, res) => {
    const { firstname, lastname, username, email, pass, address, mobile } =
        req?.body || {};

    const userData = {
        firstname,
        lastname,
        username,
        email,
        pass,
        address,
        mobile,
    };
    try {
        const IP =
            req?.ip !== "::1" ||
            networkInterfaces.wlp3s0?.[1]["address"] ||
            networkInterfaces?.en0[0]?.address ||
            "";
        await db.collection("users").doc(email).set(userData);
        await db.collection("IPs").doc(email).set({ ip_1: IP });
        res.sendStatus(200);
    } catch (error) {
        console.error(error, " error");
        res.sendStatus(403);
    }
}

module.exports = register