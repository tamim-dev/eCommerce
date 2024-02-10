const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const allCategoryController = require("../../controllers/allcategoryController");
const subCategoryController = require("../../controllers/subCategoryController");
// const allsubCategoryController = require("../../controllers/allSubCategoryControllers");
// const productController = require("../../controllers/productController");
// const deleteCategory = require("../../controllers/deleteCategory");
// const editEategoryController = require("../../controllers/editCategory");


router.get("/allcategory", allCategoryController);
// router.get("/allsubcategory", allsubCategoryController);

router.post("/createcategory", categoryController);
router.post("/createsubcategory", subCategoryController);
// router.post("/products", productController);
// router.post("/deletecategory", deleteCategory);
// router.post("/editcategory", editEategoryController);

module.exports = router;