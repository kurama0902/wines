require("dotenv").config();
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { popularWines, winesNewSale, winesPremium } = require("../db/index");
const { brandCategories } = require("../db/brandCategories");

const adminEmail = 'creepysimbaplay@gmail.com';
const adminPass = 1234;

/* GET api listing. */
router.route("/feedback").post((req, res, next) => {
  if(req.cookies['m_k']) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // Here is needs to be users email
        pass: "", // Here is needs to be users password
      },
    });
  
    let mailOptions = {
      from: "", // Email
      to: "", // Email
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
  } else {
    res.redirect('/shopping-bag');
  }
});

router.route("/login").post((req, res) => {
  const { email, pass } = req?.body;
  console.log(email, pass);
  if (email === adminEmail && +pass === adminPass) {
    console.log("You succsessfully logged");
    res.send(200)
  } else {
    console.log("Not registered");
    res.send(404)
  } 
});

router.route("/logout").post((req, res) => {
  res.clearCookie('m_k');
  console.log('Deleted cookie');
  res.redirect('/'); // Redirect is not working
});

router.route("/check-user-able").post((req, res) => {
  if(req.cookies['m_k']) {
    console.log('able');
    res.send({flag: true});
  } else {
    console.log('not able');
    res.send({flag: false});
  }
});

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
  let items = []
  for(let ID of req.body) {
    items.push([...popularWines, ...winesNewSale, ...winesPremium].find(item => item.id === ID))
  }
  console.log(items);
  res.send(items)
});

router.route("/search-info").post((req, res) => {
  const { inputValue } = req.body;
  console.log(inputValue);
  const seachedProductsResult = (inputValue.length > 0) ? [...popularWines, ...winesNewSale, ...winesPremium].filter(item => item.description.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())) : [];
  res.send(seachedProductsResult);
})

module.exports = router;
