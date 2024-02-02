const os = require("os");
const db = require("../firebaseConfig");
const networkInterfaces = os.networkInterfaces();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

const login = async (req, res) => {
  const { email, pass } = req?.body || {};

  if (emailPattern.test(email) && passwordPattern.test(pass)) {
    try {
      var startTime = performance.now();
      const user = await db.collection("users").doc(email).get();

      if (user.exists && user.data().pass === pass) {
        const IP =
          req?.ip !== "::1" ||
          networkInterfaces.wlp3s0?.[1]["address"] ||
          networkInterfaces?.en0[0]?.address ||
          "";

          console.log(IP);
  
          let IPs = (await db.collection("IPs").doc(email).get()).data();

          const IPsValues = Object.values(IPs);
          const userInfo = {
            firstname: user.get("firstname"),
            lastname: user.get("lastname"),
            username: user.get("username"),
            email: user.get("email"),
            address: user.get("address"),
            mobile: user.get("mobile"),
            imgURL: user.get("imgURL"),
          };

          if(IPsValues.includes(IP) || IPsValues.length > 4) {
             res.send(userInfo)
          } else {
            await db.collection("IPs").doc(email).set({[`ip_${IPsValues.length + 1}`]: IP}, {merge: true})
            res.send(userInfo)
          }
      } else {
        res.sendStatus(401);
      }
      var endTime = performance.now();
      console.log(`work for login took ${endTime - startTime} milliseconds`);
    } catch (error) {
      console.log(error, "Not registered");
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
}

module.exports = login