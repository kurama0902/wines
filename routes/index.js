const router = require("express").Router();
const path = require("path");

const checkAuth = (req, res, next) => {
  const login = req
  console.log(login);
  if (login) {
    next();
  } else {
    res.send(400)
  }
};

router.route("/").get(checkAuth, (req, res) => {

  if(req) {
    console.log(req);
    res.send(200);
  } else {
    res.send(400);
  }
});
// router.route("/home").get((req, res) => {
//   if(!req.cookies['m_k']) {
//     res.sendFile(path.join(__dirname, "../public/pages/index.html"));
//   } else {
//     res.redirect('/shopping');
//   }
// });
// router.route("/shopping").get((req, res) => {
//   if(!req.cookies['m_k']) {
//     res.redirect('/');
//   } else {
//     res.sendFile(path.join(__dirname, "../public/pages/index.html"));
//   }
// })
// router.route("/home").get((req, res) => {
//   res.sendFile(path.join(__dirname, "../public/pages/index.html"));
// });
// router.route("/index.html").get((req, res) => {
//   res.sendFile(path.join(__dirname, "../public/pages/index.html"));
// });
// router.route("/login").get(checkAuth, (req, res) => {
//     res.redirect('/user-page');
// });

// router.route("/wine").get((req, res) => {
//   res.sendFile(path.join(__dirname, "../public/pages/wine.html"));
// });

// router.route("/user-page").get(checkAuth, (req, res) => {
//   res.sendFile("C:/Users/vadim/OneDrive/Рабочий стол/wines/public/src/pages/ShoppingBag/Components/Product/index.jsx");
// });

module.exports = router;
