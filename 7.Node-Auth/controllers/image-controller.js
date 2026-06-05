const Image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res, next) => {
  try {
    //check if file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }
    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store the image url and public id with the uploader user id
    const newUploadImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newUploadImage.save();
    //delete the file from local storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newUploadImage,
    });
  } catch (error) {
    next(error);
  }
};

//fetch all images Controller

const fetchAllImages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const totaleImages = await Image.countDocuments();
    const totalPages = Math.ceil(totaleImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find()
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: images,
      currentPage: page,
      totalPages,
      totaleImages,
    });

  } catch (error) {
    console.log("Error in fetching all images", error);
    next(error);
  }
};
//delete image controller

const deleteImageController = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image with this id",
      });
    }
    //is the image uploaded by the same user
    if (image.uploadedBy.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "You are not authorised to delete this image",
      });
    }
    //delete this image first from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);
    //delete this image from mongoDb database
    await Image.findByIdAndDelete(imageId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting images");
    next(error);
  }
};

module.exports = { uploadImage, fetchAllImages, deleteImageController };
