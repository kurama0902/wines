require("dotenv").config();

const os = require("os");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { brandCategories } = require("../db/brandCategories");
const db = require("../firebaseConfig");

const networkInterfaces = os.networkInterfaces();

const IP = networkInterfaces.en0[0]["address"];

let popularWines = (winesNewSale = winesPremium = null);

const setWinesValues = async () => {
  const popularWinesCollection = await db.collection("popularWines").get();
  popularWines = popularWinesCollection.docs.map((e) => e.data());

  const winesNewSaleCollection = await db.collection("winesNewSale").get();
  winesNewSale = winesNewSaleCollection.docs.map((e) => e.data());

  const winesPremiumCollection = await db.collection("winesPremium").get();
  winesPremium = winesPremiumCollection.docs.map((e) => e.data());
};

setWinesValues()

function generateUserId(key1, key2) {
  return `${key1}_${key2}`;
}

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
    const user = await db.collection("users").doc(userKey).get();
    if (user.exists) {
      let IPsCollection = await db.collection("IPs").get();
      const IPs = IPsCollection.docs.map((ipData) => ipData.data());

      const ipID = `ip_${IPs.length}`;

      if (!IPs.includes(IP)) {
        await db
          .collection("IPs")
          .doc(email)
          .set({ [ipID]: IP });
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
      console.log("Not registered");
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error, " Not registered catch");
    res.sendStatus(404);
  }
});

router.route("/logout").post(async (req, res) => {
  const { email } = req?.body || {};
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
  res.send(popularWines);
});

router.route("/winesNewSale").get(async (req, res) => {
  res.send(winesNewSale);
});

router.route("/winesPremium").get(async (req, res) => {
  res.send(winesPremium);
});

router.route("/brands").get((req, res) => {
  res.send(brandCategories);
});

router.route("/getDataArray").post((req, res) => {
  let items = [];
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

router.route("/getRangedWines").post((req, res) => {
  const page = req.body.page;

  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const slicedWinesArr = allWines.slice(page * 8 - 8, page * 8);
  const length = allWines.length;

  res.send({
    items: slicedWinesArr,
    pagesCount: Math.ceil(length / 8),
  });
});

router.route("/getAllWinesQuantity").get((req, res) => {
  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const length = allWines.length;
  res.send(`${length}`);
});

//getAllWinesQuantity

router.route("/getWine/:id").get((req, res) => {
  const id = req.params.id;
  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const wine = allWines.find((wine) => Number(wine.id) === Number(id)) || null;
  res.send(wine);
});

router.route("/search-info").post((req, res) => {
  const { inputValue } = req.body;
  console.log(inputValue);
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
