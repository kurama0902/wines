require("dotenv").config();

const os = require("os");

const router = require("express").Router();
const nodemailer = require("nodemailer");
const { brandCategories } = require("../db/brandCategories");
const multer = require("multer");
const updatePhotoFn = require("./../utils/updatePhotoFn");
const db = require("../firebaseConfig");
// const resetDatabaseByDefaultFn = require('../utils/resetDatabaseByDefaultFn'); import of 'set default DB data function'

const networkInterfaces = os.networkInterfaces();

// resetDatabaseByDefaultFn(db); Set default DB

router.route("/checkAuthorization").post(async (req, res) => {
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
});

/* GET api listing. */
router.route("/feedback").post((req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIN_EMAIL,
      pass: process.env.MAIN_PASS,
    },
  });

  let mailOptions = {
    from: process.env.MAIN_EMAIL,
    to: req.body.email,
    subject: "Your order",
    html: `${req.body.info}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.statusCode = 405;
      return res.send(error);
    }
    console.log(mailOptions.html);
  });
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

router.route("/login").post(async (req, res) => {
  const { email, pass } = req?.body || {};

  if (emailPattern.test(email) && passwordPattern.test(pass)) {
    try {
      var startTime = performance.now();
      const user = await db.collection("users").doc(email).get();

      if (user.exists && user.data().pass === pass) {
        const IP = networkInterfaces.wlp3s0?.[1]["address"];
        if (IP) {
          let IPsDoc = await db.collection("IPs").doc(email).get();
          const IPs = [IPsDoc.data()];

          const ipsObject = {};

          IPs?.forEach((e, index) => {
            if (ipsObject[`ip_${index + 1}`]) {
              ipsObject[`ip_${index + 1}`] = e[`ip_${index + 1}`];
              console.log(ipsObject);
            }
          });

          const ipsKeys = Object.keys(ipsObject);

          if (ipsKeys.length) {
            let foundIpID = ipsKeys.find((id) => ipsObject[id] === IP);

            console.log(foundIpID);

            if (foundIpID === undefined && ipsKeys.length < 5) {
              console.log(IP, "Ip address");
              ipsObject[`ip_${ipsKeys.length + 1}`] = IP;
              await db.collection("IPs").doc(email).set(ipsObject);
            }
          } else {
            await db.collection("IPs").doc(email).set({ ip_1: IP });
          }
        }

        const userInfo = {
          firstname: user.get("firstname"),
          lastname: user.get("lastname"),
          username: user.get("username"),
          email: user.get("email"),
          address: user.get("address"),
          mobile: user.get("mobile"),
          imgURL: user.get("imgURL"),
        };

        res.send(userInfo);
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
});

router.route("/updateUsersInfo").post(async (req, res) => {
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
});

router.route("/updatePassword").post(async (req, res) => {
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
});

router.route("/admin-auth").post(async (req, res) => {
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
});

router.route("/logout").post(async (req, res) => {
  const { email } = req?.body;
  try {
    await db.collection("IPs").doc(email).delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.route("/register").post(async (req, res) => {
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
});

router.route("/popular-wines").get(async (req, res) => {
  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());
  res.send(popularWines);
});

router.route("/deleteWine").post(async (req, res) => {
  const { id } = req?.body;

  try {
    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    let allWinesArr = [popularWines, winesNewSale, winesPremium];
    const winesCategoriesNames = [
      "popularWines",
      "winesNewSale",
      "winesPremium",
    ];

    let newAllWinesArr = [];

    allWinesArr.forEach(async (arr, index) => {
      let foundItem = arr.find((e) => e.id === id);
      if (foundItem !== undefined) {
        newAllWinesArr = [...newAllWinesArr, arr.filter((e) => e.id !== id)];
        await db.collection(winesCategoriesNames[index]).doc(`${id}`).delete();
      }
      newAllWinesArr = [...newAllWinesArr, arr.filter((e) => e.id !== id)];
    });

    console.log(newAllWinesArr);

    newAllWinesArr.forEach((arr, index) => {
      arr.forEach(async (elem) => {
        try {
          await db
            .collection(winesCategoriesNames[index])
            .doc(`${elem.id}`)
            .set(elem);
        } catch (error) {
          console.log("DELETE ERROR", error);
        }
      });
    });

    res.sendStatus(200);
  } catch (error) {
    console.log("Delete user error", error);
    res.sendStatus(403);
  }
});

router.route("/winesNewSale").get(async (req, res) => {
  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());
  res.send(winesNewSale);
});

router.route("/winesPremium").get(async (req, res) => {
  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());
  res.send(winesPremium);
});

router.route("/brands").get((req, res) => {
  res.send(brandCategories);
});

router.route("/addToOrderHistory").post(async (req, res) => {
  const { email, productsInfo } = req?.body;
  const date = new Date();

  const historyDoc = await db.collection("Orders").doc(email).get();
  const historyList = historyDoc.data()
    ? Object.entries(historyDoc.data())
    : [];

  productsInfo[1].forEach((e, index) => {
    historyList.push([
      `${historyList.length}`,
      {
        name: productsInfo[0][index].description,
        quantity: e,
        cost: productsInfo[0][index].cost * e,
        date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
      },
    ]);
  });

  await db.collection("Orders").doc(email).set(Object.fromEntries(historyList));

  res.sendStatus(200);
});

router.route("/getUsersOrderHistory").post(async (req, res) => {
  const { email } = req.body;

  try {
    const ordersHistoryDoc = await db.collection("Orders").doc(email).get();
    const ordersHistory = Object.entries(ordersHistoryDoc.data()).map(
      (e) => e[1]
    );

    res.send(ordersHistory);
  } catch (e) {
    console.log(e, "orders history error");
  }
});

router.route("/changeGoodsQuantity").post(async (req, res) => {
  const { IDs, productsQuant } = req.body;

  console.log(IDs, "IDS");
  console.log(productsQuant, "products quant");

  try {
    const popularWinesCollection = await db.collection("popularWines").get();
    const popularWines = popularWinesCollection.docs.map((e) => e.data());

    const winesNewSaleCollection = await db.collection("winesNewSale").get();
    const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

    const winesPremiumCollection = await db.collection("winesPremium").get();
    const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

    const allWinesArr = [popularWines, winesNewSale, winesPremium];
    const winesCategoriesNames = [
      "popularWines",
      "winesNewSale",
      "winesPremium",
    ];

    for (let i = 0; i < IDs.length; i++) {
      allWinesArr.forEach((arr, index) => {
        return arr.forEach(async (e) => {
          if (e.id === IDs[i]) {
            e.avaliableAmount -= productsQuant[i];
            await db
              .collection(winesCategoriesNames[index])
              .doc(`${e.id}`)
              .set(e);
          }
        });
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error, "quantity changing error");
    res.sendStatus(400);
  }
});

router.route("/getDataArray").post(async (req, res) => {
  let items = [];

  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

  console.log(req?.body, " req?.body");

  for (let ID of req?.body) {
    items.push(
      [...popularWines, ...winesNewSale, ...winesPremium].find(
        (item) => item.id === ID
      )
    );
  }
  console.log(items);
  res.send(items);
});

router.route("/getRangedWines").post(async (req, res) => {
  const { page } = req?.body;

  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const slicedWinesArr = allWines.slice(page * 8 - 8, page * 8);
  const length = allWines.length;

  res.send({
    items: slicedWinesArr,
    pagesCount: Math.ceil(length / 8),
  });
});

router.route("/getRangedHistory").post(async (req, res) => {
  const { page, email } = req?.body;
  console.log(req?.body, "req body");

  try {
    const ordersHistoryObj = (
      await db.collection("Orders").doc(email).get()
    ).data();

    const ordersHistoryArr = [];

    console.log(ordersHistoryObj);

    if (ordersHistoryObj !== undefined) {
      for (let id of Object.keys(ordersHistoryObj)) {
        ordersHistoryArr.push(ordersHistoryObj[id]);
      }

      const slicedHistoryArr = ordersHistoryArr.slice(page * 8 - 8, page * 8);
      const historyLength = ordersHistoryArr.length;

      res.send({
        items: slicedHistoryArr,
        pagesCount: Math.ceil(historyLength / 8),
      });
    } else {
      res.status(403).send({
        items: [],
        pagesCount: 1,
      });
    }
  } catch (error) {
    console.error("GETTING ERROR WHILE FETCHING ORDERS DATA");
    res.send(403);
  }
});

router.route("/getRangedUsers").post(async (req, res) => {
  const { page } = req?.body;
  console.log(req?.body, "req body");

  const ordersHistoryArr = (await db.collection("users").get()).docs.map((e) =>
    e.data()
  );

  console.log(ordersHistoryArr, "HISTORY");

  if (ordersHistoryArr?.length) {
    const slicedHistoryArr = ordersHistoryArr.slice(page * 9 - 9, page * 9);
    const historyLength = ordersHistoryArr.length;

    res.send({
      items: slicedHistoryArr,
      pagesCount: Math.ceil(historyLength / 9),
    });
  } else {
    res.send({ flag: true });
  }
});

router.route("/deleteUser").post(async (req, res) => {
  const { email } = req?.body;

  try {
    await db.collection("users").doc(email).delete();
    res.sendStatus(200);
  } catch (error) {
    console.error("User can not be deleted", error);
    res.sendStatus(403);
  }
});

router.route("/getAllWinesQuantity").get(async (req, res) => {
  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const length = allWines.length;
  res.send(`${length}`);
});

router.route("/updateWineQuantity").post(async (req, res) => {
  const { id, quantity } = req?.body;

  console.log(id, " | ", quantity);

  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

  const allWines = [popularWines, winesNewSale, winesPremium];
  const winesNames = ["popularWines", "winesNewSale", "winesPremium"];

  allWines.forEach(async (arr, index) => {
    const foundWine = arr.find((e) => e.id == id);
    console.log(foundWine);
    if (foundWine !== undefined) {
      foundWine.avaliableAmount = quantity;
      try {
        res.sendStatus(200);
        await db.collection(winesNames[index]).doc(`${id}`).set(foundWine);
      } catch (error) {
        console.error("QUANTITY UPDATE ERROR", error);
        res.sendStatus(403);
      }
    }
  });
});

router.route("/getWine/:id").get(async (req, res) => {
  const id = req.params.id;

  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const wine = allWines.find((wine) => Number(wine.id) === Number(id)) || null;
  res.send(wine);
});

router.route("/search-info").post(async (req, res) => {
  const { inputValue } = req.body;
  console.log(inputValue);

  const popularWinesCollection = await db.collection("popularWines").get();
  const popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  const winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  const winesPremium = winesPremiumCollection.docs.map((e) => e.data());

  const seachedProductsResult =
    inputValue.length > 0
      ? [...popularWines, ...winesNewSale, ...winesPremium].filter((item) =>
          item.description
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase())
        )
      : [];
  res.send(seachedProductsResult);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

router.route("/updatePhoto").post(upload.single("avatar"), (req, res) => {
  const emailByDefault = req?.body.email;
  let { email } = req?.body;
  email = email.split("@")[0];

  const avatar = req?.file;

  console.log(email, "EMAIL");
  console.log(avatar, "AVATAR");

  updatePhotoFn(db, email, emailByDefault, avatar, res);
});

module.exports = router;
