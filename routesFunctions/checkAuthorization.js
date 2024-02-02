const os = require("os");
const db = require("../firebaseConfig");
const networkInterfaces = os.networkInterfaces();

const checkAuthorization = async (req, res) => {
    console.log(req?.ip, " req");

  let { email } = req?.body;

  try {
    if (email) {
      const IP =
        req?.ip !== "::1" ||
        networkInterfaces.wlp3s0?.[1]["address"] ||
        networkInterfaces?.en0[0]?.address ||
        "";

      console.log(IP, "IP");
      const IPs = (await db.collection("IPs").doc(email).get()).data();
      const user = (await db.collection("users").doc(email).get()).data();

      console.log(IPs, "IPs");
      console.log(user, "USER");

      if (IPs && user) {
        const IpsValues = Object.values(IPs);

        if (IpsValues.includes(IP)) {
          return res.send(user);
        }

        if (IpsValues.length <= 4) {
          await db
            .collection("IPs")
            .doc(email)
            .set({ [`ip_${IpsValues.length + 1}`]: IP }, { merge: true }); // add new IP
          return res.send(user);
        }

        return res.sendStatus(401);
      } else {
        res.sendStatus(401);
      }
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
}

module.exports = checkAuthorization