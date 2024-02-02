const { brandCategories } = require("../db/brandCategories");

const getBrands = (req, res) => {
    res.send(brandCategories);
}

module.exports = getBrands