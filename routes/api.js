require("dotenv").config();

const os = require("os");
const fs = require("fs");
var ImageKit = require("imagekit");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { brandCategories } = require("../db/brandCategories");
const multer = require("multer");
const db = require("../firebaseConfig");
const dbb = require("../db/index");

const networkInterfaces = os.networkInterfaces();

var imagekit = new ImageKit({
  publicKey: "public_o8GkazK+J8PCgWzn4e76LM4FNQk=", // move to env
  privateKey: "private_fopWiUVI+uoahH5u+NlTZhqJO7M=", // move to env
  urlEndpoint: "https://ik.imagekit.io/nw50elh8t/", // move to env
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

// console.log(networkInterfaces);

// const fn = () => {
//   for (let ctg of ['popularWines', 'winesNewSale', 'winesPremium']) {
//     console.log(ctg);
//     dbb[ctg].forEach(async e => {
//       await db.collection(ctg).doc(`${e.id}`).set(e)
//     })
//   }
// };

// fn();

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
      const img = (await db.collection("avatarURLS").doc(email).get()).data();
      const IPs = (await db.collection("IPs").doc(email).get()).data();
      const user = (await db.collection("users").doc(email).get()).data();

      if (img !== undefined) {
        user.imgURL = img.url;
      }

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

  let mailOptions = {
    from: "creepysimbaplay@gmail.com",
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

        const img = (await db.collection("avatarURLS").doc(email).get()).data();

        if (img !== undefined) {
          res.send({
            firstname: user.get("firstname"),
            lastname: user.get("lastname"),
            username: user.get("username"),
            email: user.get("email"),
            address: user.get("address"),
            mobile: user.get("mobile"),
            imgURL: img.url,
          });
        } else {
          res.send({
            firstname: user.get("firstname"),
            lastname: user.get("lastname"),
            username: user.get("username"),
            email: user.get("email"),
            address: user.get("address"),
            mobile: user.get("mobile"),
          });
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
});

router.route("/updateUsersInfo").post(async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    pass,
    mobile,
    currentPass,
    newPass,
    repeatedNewPass,
  } = req?.body;

  console.log(email);

  try {
    const currentUsersInfo = (
      await db.collection("users").doc(email).get()
    ).data();

    if (pass === currentPass) {
      if (newPass === repeatedNewPass) {
        currentUsersInfo.pass = newPass;
      }
    }

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
    await db.collection("users").doc(email).set(userData);
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
    res.sendStatus(403);
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
    // console.log(arr);
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

router.route("/updatePhoto").post(upload.single("avatar"), async (req, res) => {
  let { email } = req?.body;

  const emailByDefault = req?.body.email;

  const currentUsersInfo = (
    await db.collection("users").doc(emailByDefault).get()
  ).data();

  email = email.split("@")[0];

  const avatar = req?.file;

  console.log(email, "EMAIL");
  console.log(avatar, "AVATAR");

  imagekit.listFiles(
    {
      tags: [email],
    },
    function (error, result) {
      if (!result.length) {
        const file = fs.readFileSync(`./${avatar.path}`);

        const uploadOptions = {
          file: file,
          fileName: `${email}.${avatar.mimetype.split("/")[1]}`,
          folder: "/home/",
          tags: email,
        };

        imagekit.upload(uploadOptions, async (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(401);
          } else {
            try {
              await db
                .collection("avatarURLS")
                .doc(emailByDefault)
                .set({ url: result.url });
            } catch (error) {
              console.error("AVATAR URL ERROR", error);
            }
            console.log(result);
            fs.unlinkSync(`./${avatar.path}`);
            currentUsersInfo.imgURL = result.url;
            await db.collection("users").doc(emailByDefault).set(currentUsersInfo);
            res.send(result.url);
          }
        });
      } else {
        imagekit.deleteFile(result[0].fileId, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        });

        const file = fs.readFileSync(`./${avatar.path}`);

        const uploadOptions = {
          file: file,
          fileName: `${email}.${avatar.mimetype.split("/")[1]}`,
          folder: "/home/",
          tags: email,
        };

        imagekit.upload(uploadOptions, async (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(401);
          } else {
            try {
              await db
                .collection("avatarURLS")
                .doc(emailByDefault)
                .set({ url: result.url });
            } catch (error) {
              console.error("AVATAR URL ERROR", error);
            }
            console.log(result);
            fs.unlinkSync(`./${avatar.path}`);
            currentUsersInfo.imgURL = result.url;
            await db.collection("users").doc(emailByDefault).set(currentUsersInfo);
            res.send(result.url);
          }
        });
      }
    }
  );
});

module.exports = router;
