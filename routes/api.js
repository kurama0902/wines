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


router.route("/checkAuthorization").post(checkAuthorization);
router.route("/feedback").post(sendFeedBack);
router.route("/login").post(login);
router.route("/updateUsersInfo").post(updateUsersInfo);
router.route("/updatePassword").post(updatePassword);
router.route("/admin-auth").post(adminAuthorization);
router.route("/logout").post(logout);
router.route("/register").post(register);
router.route("/popular-wines").get(getPopularWines);
router.route("/deleteWine").post(deleteWine);
router.route("/winesNewSale").get(getWinesNewSale);
router.route("/winesPremium").get(getWinesPremium);
router.route("/brands").get(getBrands);
router.route("/addToOrderHistory").post(addToOrderHistory);
router.route("/getUsersOrderHistory").post(getUsersOrderHistory);
router.route("/changeGoodsQuantity").post(changeGoodsQuantity);
router.route("/getDataArray").post(getDataArray);
router.route("/getRangedWines").post(getRangedWines);
router.route("/getRangedHistory").post(getRangedHistory);
router.route("/getRangedUsers").post(getRangedUsers);
router.route("/deleteUser").post(deleteUser);
router.route("/getAllWinesQuantity").get(getAllWinesQuantity);
router.route("/updateWineQuantity").post(updateWineQuantity);
router.route("/getWine/:id").get(getWineById);
router.route("/search-info").post(getSearchedInfo);
router.route("/updatePhoto").post(upload.single("avatar"), updatePhoto);

module.exports = router;