const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const allCategoryController = require("../../controllers/allcategoryController");
const subCategoryController = require("../../controllers/subCategoryController");
const allsubCategoryController = require("../../controllers/allSubCategoryController");
const productController = require("../../controllers/productController");
const deleteCategory = require("../../controllers/deleteCategory");
const deleteSubCategory = require("../../controllers/deleteSubCategory");
const editCategoryController = require("../../controllers/editCategory");
const editSubCategoryController = require("../../controllers/editSubCategory");
const approveCategoryController = require("../../controllers/approveCategory");
const approveSubCategoryController = require("../../controllers/approveSubCategory");
const storeController = require("../../controllers/storeController");
const allStoreController = require("../../controllers/allstoreController");

router.get("/allcategory", allCategoryController);
router.get("/allsubcategory", allsubCategoryController);
router.get("/allstore/:id", allStoreController);

router.post("/createcategory", categoryController);
router.post("/createsubcategory", subCategoryController);
router.post("/createproduct", productController);
router.post("/createstore", storeController);

router.post("/deletecategory", deleteCategory);
router.post("/deletesubcategory", deleteSubCategory);

router.post("/editcategory", editCategoryController);
router.post("/editsubcategory", editSubCategoryController);

router.post("/approvecategory", approveCategoryController);
router.post("/approvesubcategory", approveSubCategoryController);

module.exports = router;
