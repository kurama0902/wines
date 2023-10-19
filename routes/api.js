require("dotenv").config();
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { popularWines, winesNewSale, winesPremium } = require("../db/index");
const { brandCategories } = require("../db/brandCategories");

const adminEmail = "creepysimbaplay@gmail.com";
const adminPass = 1234;

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

router.route("/login").post((req, res) => {
  const { email, pass } = req?.body;
  console.log(email, pass);
  if (email === adminEmail && Number(pass) === adminPass) {
    console.log("You succsessfully logged");
    res.sendStatus(200);
  } else {
    console.log("Not registered");
    res.sendStatus(404);
  }
});

// router.route("/logout").post((req, res) => {
//   res.clearCookie('m_k');
//   console.log('Deleted cookie');
//   res.redirect('/');
// });

// router.route("/check-user-able").post((req, res) => {
//   if(req.cookies['m_k']) {
//     console.log('able');
//     res.send({flag: true});
//   } else {
//     console.log('not able');
//     res.send({flag: false});
//   }
// });

router.route("/popular-wines").get((req, res) => {
  res.send(popularWines);
});

router.route("/winesNewSale").get((req, res) => {
  res.send(winesNewSale);
});

router.route("/winesPremium").get((req, res) => {
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
