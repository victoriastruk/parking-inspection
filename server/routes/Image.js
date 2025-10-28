const imageRouter = require("express").Router({ mergeParams: true });

const { uploadImages } = require("../middleware/imagesUpload");
const { checkToken } = require("../middleware/checkToken");

const ImageController = require("../controllers/ImageController");

imageRouter
  .route("/")
  .get(checkToken, ImageController.getProtocolImages)
  .post(checkToken, uploadImages, ImageController.addProtocolImages);

imageRouter
  .route("/:imageId")
  .get(checkToken, ImageController.getImageByID)
  .delete(checkToken, ImageController.deleteImageByID);

module.exports = imageRouter;
