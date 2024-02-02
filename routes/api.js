require("dotenv").config();

const router = require("express").Router();

// const resetDatabaseByDefaultFn = require('../utils/resetDatabaseByDefaultFn'); import of 'set default DB data function'
// resetDatabaseByDefaultFn(); Set default DB

const checkAuthorization = require('../routesFunctions/checkAuthorization');
const sendFeedBack = require('../routesFunctions/sendFeedBack');
const login = require('../routesFunctions/login');
const updateUsersInfo = require('../routesFunctions/updateUsersInfo');
const updatePassword = require("../routesFunctions/updatePassword");
const adminAuthorization = require("../routesFunctions/adminAuthorization");
const logout = require("../routesFunctions/logout");
const register = require("../routesFunctions/register");
const getPopularWines = require("../routesFunctions/getPopularWines");
const deleteWine = require("../routesFunctions/deleteWine");
const getWinesNewSale = require("../routesFunctions/getWinesNewSale");
const getWinesPremium = require("../routesFunctions/getWinesPremium");
const getBrands = require("../routesFunctions/getBrands");
const addToOrderHistory = require("../routesFunctions/addToOrderHistory");
const getUsersOrderHistory = require("../routesFunctions/getUsersOrderHistory");
const changeGoodsQuantity = require("../routesFunctions/changeGoodsQuantity");
const getDataArray = require("../routesFunctions/getDataArray");
const getRangedWines = require("../routesFunctions/getRangedWines");
const getRangedHistory = require("../routesFunctions/getRangedHistory");
const getRangedUsers = require("../routesFunctions/getRangedUsers");
const deleteUser = require("../routesFunctions/deleteUser");
const getAllWinesQuantity = require("../routesFunctions/getAllWinesQuantity");
const updateWineQuantity = require("../routesFunctions/updateWineQuantity");
const getWineById = require("../routesFunctions/getWineById");
const getSearchedInfo = require("../routesFunctions/getSearchedInfo");
const updatePhoto = require("../routesFunctions/updatePhoto");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    return cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });


router.route("/checkAuthorization").post((req, res) => checkAuthorization(req, res));
router.route("/feedback").post((req, res) => sendFeedBack(req, res));
router.route("/login").post((req, res) => login(req, res));
router.route("/updateUsersInfo").post((req, res) => updateUsersInfo(req, res));
router.route("/updatePassword").post((req, res) => updatePassword(req, res));
router.route("/admin-auth").post((req, res) => adminAuthorization(req, res));
router.route("/logout").post((req, res) => logout(req, res));
router.route("/register").post((req, res) => register(req, res));
router.route("/popular-wines").get((req, res) => getPopularWines(req, res));
router.route("/deleteWine").post((req, res) => deleteWine(req, res));
router.route("/winesNewSale").get((req, res) => getWinesNewSale(req, res));
router.route("/winesPremium").get((req, res) => getWinesPremium(req, res));
router.route("/brands").get((req, res) => getBrands(req, res));
router.route("/addToOrderHistory").post((req, res) => addToOrderHistory(req, res));
router.route("/getUsersOrderHistory").post((req, res) => getUsersOrderHistory(req, res));
router.route("/changeGoodsQuantity").post((req, res) => changeGoodsQuantity(req, res));
router.route("/getDataArray").post((req, res) => getDataArray(req, res));
router.route("/getRangedWines").post((req, res) => getRangedWines(req, res));
router.route("/getRangedHistory").post((req, res) => getRangedHistory(req, res));
router.route("/getRangedUsers").post((req, res) => getRangedUsers(req, res));
router.route("/deleteUser").post((req, res) => deleteUser(req, res));
router.route("/getAllWinesQuantity").get((req, res) => getAllWinesQuantity(req, res));
router.route("/updateWineQuantity").post((req, res) => updateWineQuantity(req, res));
router.route("/getWine/:id").get((req, res) => getWineById(req, res));
router.route("/search-info").post((req, res) => getSearchedInfo(req, res));
router.route("/updatePhoto").post(upload.single("avatar"), (req, res) => updatePhoto(req, res));

module.exports = router;