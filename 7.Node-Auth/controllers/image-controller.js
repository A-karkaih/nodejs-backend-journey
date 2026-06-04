const Image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");
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
    const images = await Image.find({});
    if (images) {
      return res.status(200).json({
        success: true,
        data: images,
      });
    }
  } catch (error) {
    console.log("Error in fetching all images");

    next(error);
  }
};

module.exports = { uploadImage  , fetchAllImages};
