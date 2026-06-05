const express = require("express");
const protectMiddleware = require("../middlewares/auth-middleware");
const isAdmin = require("../middlewares/admin-middleware");
const uploadMiddleware = require("../middlewares/upload-middleware");
const {
  uploadImage,
  fetchAllImages,
  deleteImageController
} = require("../controllers/image-controller");
const router = express.Router();

//upload the image
router.post(
  "/upload",
  protectMiddleware,
  isAdmin,
  uploadMiddleware.single("image"),
  uploadImage,
);

//to get all images

router.get("/get-images", protectMiddleware, isAdmin, fetchAllImages);

//delete image

router.delete("/delete-image/:id", protectMiddleware, isAdmin, deleteImageController);

module.exports = router;
