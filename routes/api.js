require("dotenv").config();

const os = require("os");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { brandCategories } = require("../db/brandCategories");
const db = require("../firebaseConfig");

const networkInterfaces = os.networkInterfaces();

function generateUserId(key1, key2) {
  return `${key1}_${key2}`;
}

router.route("/checkAuthorization").post(async (req, res) => {
  console.log(req?.ip, " req");

  let { email } = req?.body;

  console.log(email, " email");

  try {
    if (email) {
      const IP = networkInterfaces.en0?.[1]["address"];
      const IPs = (await db.collection("IPs").doc(email).get()).data();
      const user = (await db.collection("users").get()).docs
        .map((e) => e.data())
        .find((e) => e.email === email);

      if (IPs !== undefined && user !== undefined) {
        for (let ipNum of Object.keys(IPs)) {
          if (IPs[`${ipNum}`] === IP) {
            return res.send({
              ...user,
            });
          }
        }
        res.sendStatus(401);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
});

/* GET api listing. */
router.route("/feedback").post((req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "creepysimbaplay@gmail.com",
      pass: "jcsvzpuqkmkygxej",
    },
  });

  console.log(req.body.info);

  let mailOptions = {
    from: "creepysimbaplay@gmail.com",
    to: "dmytrohrynchuk9@gmail.com",
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

router.route("/login").post(async (req, res) => {
  const { email, pass } = req?.body || {};
  const userKey = generateUserId(email, pass);

  try {
    var startTime = performance.now();
    const user = await db.collection("users").doc(userKey).get();

    if (user.exists) {
      const IP = networkInterfaces.en0?.[1]["address"];
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

      res.send({
        firstname: user.get("firstname"),
        lastname: user.get("lastname"),
        username: user.get("username"),
        email: user.get("email"),
        address: user.get("address"),
        mobile: user.get("mobile"),
      });
    } else {
      res.sendStatus(401);
    }
    var endTime = performance.now();
    console.log(`work for login took ${endTime - startTime} milliseconds`);
  } catch (error) {
    console.log(error, "Not registered");
    res.sendStatus(401);
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
  const userKey = generateUserId(email, pass);
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
    await db.collection("users").doc(userKey).set(userData);
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

  for (let ID of req.body) {
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
  const page = req.body.page;

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

  const ordersHistoryObj = (
    await db.collection("Orders").doc(email).get()
  ).data();
  const ordersHistoryArr = [];

  for (let id of Object.keys(ordersHistoryObj)) {
    ordersHistoryArr.push(ordersHistoryObj[id]);
  }

  const slicedHistoryArr = ordersHistoryArr.slice(page * 8 - 8, page * 8);
  const historyLength = ordersHistoryArr.length;

  res.send({
    items: slicedHistoryArr,
    pagesCount: Math.ceil(historyLength / 8),
  });
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

module.exports = router;
