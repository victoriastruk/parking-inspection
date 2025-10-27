const imageRouter = require("express").Router({ mergeParams: true });

const { uploadImages } = require("../middleware/imagesUpload");
const { checkToken } = require("../middleware/checkToken");
const { checkAdmin } = require("../middleware/checkAdmin");
const ImageController = require("../controllers/ImageController");

imageRouter
  .route("/")
  .get(checkToken, ImageController.getProtocolImages)
  .post(
    checkToken,
    checkAdmin,
    uploadImages,
    ImageController.addProtocolImages
  );

imageRouter
  .route("/:imageId")
  .get(checkToken, ImageController.getImageByID)
  .delete(checkToken, checkAdmin, ImageController.deleteImageByID);

module.exports = imageRouter;
