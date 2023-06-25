require("dotenv").config();

const router = require("express").Router();
const nodemailer = require("nodemailer");
const { popularWines, winesNewSale, winesPremium } = require("../db/index");
const { brandCategories } = require("../db/brandCategories");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

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
  if (email === adminEmail && pass === adminPass) {
    console.log("You succsessfully logged");
    res.cookie("m_k", `user_${email}`, { maxAge: 99999 * 1000, httpOnly: true });
    res.redirect('/user-page');
  } else {
    console.log("Not registered");
    // res.cookie("m_k", `user_${email}`, { maxAge: 300000, httpOnly: true });
    // res.redirect("/login");
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

module.exports = router;
