require("dotenv").config();

var os = require('os');
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { brandCategories } = require("../db/brandCategories");
const db = require("../firebaseConfig");

const networkInterfaces = os.networkInterfaces();


function generateUserId(key1, key2) {
  return `${key1}_${key2}`;
}

router.route("/checkAuthorization").post(async (req, res) => {
  let { email } = req?.body;

  try {
    if (email) {
      const IP = networkInterfaces.wlp3s0[0]['address'];
      const IPs = (await db.collection('IPs').doc(email).get()).data();
      const user = (await db.collection('users').get()).docs.map(e => e.data()).find(e => e.email === email);

      console.log(user, 'users');
      console.log(IPs);

      if (IPs !== undefined && user !== undefined) {
        for (ipNum of Object.keys(IPs)) {
          console.log(ipNum);
          if (IPs[`${ipNum}`] === IP) {
            console.log('Successfully loged')
            res.send({
              ...user
            });
          }
        }
      } else {
        res.sendStatus(400)
      }
    } else {
      res.sendStatus(400);
    }

  } catch (error) {
    console.log(error);
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
  const { email, pass } = req?.body;
  const userKey = generateUserId(email, pass);

  try {

    const user = await db.collection("users").doc(userKey).get();
    if (user.exists) {
      console.log("You succsessfully logged");
      console.log(user.get("email"), " user");

      const IP = networkInterfaces.wlp3s0[0]['address'];
      let IPsDoc = await db.collection('IPs').doc(email).get();
      const IPs = [IPsDoc.data()];


      const ipsObject = {};

      IPs?.forEach((e, index) => {
        if (ipsObject[`ip_${index + 1}`]) {
          ipsObject[`ip_${index + 1}`] = e[`ip_${index + 1}`]
          console.log(ipsObject);
        }
      })


      const ipsKeys = Object.keys(ipsObject);

      if (ipsKeys.length) {

        let foundIpID = ipsKeys.find((id) => ipsObject[id] === IP)

        console.log(foundIpID);

        if (foundIpID === undefined && ipsKeys.length < 5) {
          console.log(IP, "Ip address");
          ipsObject[`ip_${ipsKeys.length + 1}`] = IP
          await db.collection('IPs').doc(email).set(ipsObject)
        }
      } else {
        await db.collection('IPs').doc(email).set({ 'ip_1': IP })
      }

      console.log(ipsObject);

      res.send({
        firstname: user.get('firstname'),
        lastname: user.get('lastname'),
        username: user.get('username'),
        email: user.get('email'),
        address: user.get('address'),
        mobile: user.get('mobile'),
      });
    }
  } catch (error) {
    console.log(error, "Not registered");
    res.sendStatus(404);
  }
});

router.route('/logout').post(async (req, res) => {
  const { email } = req?.body;
  try {
    await db.collection("IPs").doc(email).delete()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
})

router.route("/register").post(async (req, res) => {
  const { firstname, lastname, username, email, pass, address, mobile } = req?.body;
  const userKey = generateUserId(email, pass);
  const userData = {
    firstname,
    lastname,
    username,
    email,
    pass,
    address,
    mobile
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
  const popularWinesCollection = await db.collection('popularWines').get();
  const popularWines = popularWinesCollection.docs.map(e => e.data());
  res.send(popularWines);
});

router.route("/winesNewSale").get(async (req, res) => {
  const winesNewSaleCollection = await db.collection('winesNewSale').get();
  const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());
  res.send(winesNewSale);
});

router.route("/winesPremium").get(async (req, res) => {
  const winesPremiumCollection = await db.collection('winesPremium').get();
  const winesPremium = winesPremiumCollection.docs.map(e => e.data());
  res.send(winesPremium);
});

router.route("/brands").get((req, res) => {
  res.send(brandCategories);
});

router.route('/addToOrderHistory').post(async (req, res) => {
  const { email, productsInfo } = req?.body;
  const date = new Date()

  const historyDoc = await db.collection('Orders').doc(email).get();
  const historyList = historyDoc.data() ? Object.entries(historyDoc.data()) : [];

  productsInfo[1].forEach((e, index) => {
    historyList.push([`${historyList.length}`, { name: productsInfo[0][index].description, quantity: e, cost: productsInfo[0][index].cost * e, date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` }])
  });

  await db.collection('Orders').doc(email).set(Object.fromEntries(historyList))

  res.sendStatus(200)
})

router.route('/getUsersOrderHistory').post(async (req, res) => {
  const { email } = req.body;

  try {
    const ordersHistoryDoc = await db.collection('Orders').doc(email).get()
    const ordersHistory = Object.entries(ordersHistoryDoc.data()).map(e => e[1]);

    res.send(ordersHistory)
  } catch (e) {
    console.log(e, 'orders history error');
  }
})

router.route('/changeGoodsQuantity').post(async (req, res) => {

  const { IDs, productsQuant } = req.body;

  console.log(IDs, "IDS");
  console.log(productsQuant, "products quant");


  try {
    const popularWinesCollection = await db.collection('popularWines').get();
    const popularWines = popularWinesCollection.docs.map(e => e.data());

    const winesNewSaleCollection = await db.collection('winesNewSale').get();
    const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());

    const winesPremiumCollection = await db.collection('winesPremium').get();
    const winesPremium = winesPremiumCollection.docs.map(e => e.data());

    const allWinesArr = [popularWines, winesNewSale, winesPremium];
    const winesCategoriesNames = ['popularWines', 'winesNewSale', 'winesPremium'];

    for (let i = 0; i < IDs.length; i++) {
      allWinesArr.forEach((arr, index) => {

        return arr.forEach(async e => {
          if (e.id === IDs[i]) {
            e.avaliableAmount -= productsQuant[i];
            await db.collection(winesCategoriesNames[index]).doc(`${e.id}`).set(e);
          }
        })
      })
    }

    res.sendStatus(200)

  } catch (error) {
    console.log(error, 'quantity changing error');
    res.sendStatus(400)
  }


})

router.route("/getDataArray").post(async (req, res) => {
  let items = [];

  const popularWinesCollection = await db.collection('popularWines').get();
  const popularWines = popularWinesCollection.docs.map(e => e.data());

  const winesNewSaleCollection = await db.collection('winesNewSale').get();
  const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());

  const winesPremiumCollection = await db.collection('winesPremium').get();
  const winesPremium = winesPremiumCollection.docs.map(e => e.data());

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

  const popularWinesCollection = await db.collection('popularWines').get();
  const popularWines = popularWinesCollection.docs.map(e => e.data());

  const winesNewSaleCollection = await db.collection('winesNewSale').get();
  const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());

  const winesPremiumCollection = await db.collection('winesPremium').get();
  const winesPremium = winesPremiumCollection.docs.map(e => e.data());



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
  console.log(req?.body, 'req body');

  const ordersHistoryObj = (await db.collection('Orders').doc(email).get()).data();
  const ordersHistoryArr = [];

  for (let id of Object.keys(ordersHistoryObj)) {
    ordersHistoryArr.push(ordersHistoryObj[id])
  }

  const slicedHistoryArr = ordersHistoryArr.slice(page * 8 - 8, page * 8);
  const historyLength = ordersHistoryArr.length;

  res.send({
    items: slicedHistoryArr,
    pagesCount: Math.ceil(historyLength / 8),
  });
});

router.route("/getAllWinesQuantity").get(async (req, res) => {

  const popularWinesCollection = await db.collection('popularWines').get();
  const popularWines = popularWinesCollection.docs.map(e => e.data());

  const winesNewSaleCollection = await db.collection('winesNewSale').get();
  const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());

  const winesPremiumCollection = await db.collection('winesPremium').get();
  const winesPremium = winesPremiumCollection.docs.map(e => e.data());

  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const length = allWines.length;
  res.send(`${length}`);
});

//getAllWinesQuantity

router.route("/getWine/:id").get(async (req, res) => {
  const id = req.params.id;

  const popularWinesCollection = await db.collection('popularWines').get();
  const popularWines = popularWinesCollection.docs.map(e => e.data());

  const winesNewSaleCollection = await db.collection('winesNewSale').get();
  const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());

  const winesPremiumCollection = await db.collection('winesPremium').get();
  const winesPremium = winesPremiumCollection.docs.map(e => e.data());

  const allWines = [...popularWines, ...winesNewSale, ...winesPremium];
  const wine = allWines.find((wine) => Number(wine.id) === Number(id)) || null;
  res.send(wine);
});

router.route("/search-info").post(async (req, res) => {
  const { inputValue } = req.body;
  console.log(inputValue);

  const popularWinesCollection = await db.collection('popularWines').get();
  const popularWines = popularWinesCollection.docs.map(e => e.data());

  const winesNewSaleCollection = await db.collection('winesNewSale').get();
  const winesNewSale = winesNewSaleCollection.docs.map(e => e.data());

  const winesPremiumCollection = await db.collection('winesPremium').get();
  const winesPremium = winesPremiumCollection.docs.map(e => e.data());

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
