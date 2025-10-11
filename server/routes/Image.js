const imageRouter = require("express").Router({ mergeParams: true });

const { uploadImages } = require("../middleware/imagesUpload");

const ImageController = require("../controllers/ImageController");

imageRouter
  .route("/")
  .get(ImageController.getProtocolImages)
  .post(uploadImages, ImageController.addProtocolImages);

imageRouter
  .route("/:imageId")
  .get(ImageController.getImageByID)
  .delete(ImageController.deleteImageByID);

module.exports = imageRouter;
