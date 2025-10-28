const imageRouter = require("express").Router({ mergeParams: true });

const { uploadImages } = require("../middleware/imagesUpload");
const { checkToken } = require("../middleware/checkToken");
const { checkAdmin } = require("../middleware/checkAdmin");
const { checkBan } = require("../middleware/checkBan");

const ImageController = require("../controllers/ImageController");

imageRouter
  .route("/")
  .get(checkToken, checkBan, ImageController.getProtocolImages)
  .post(
    checkToken,
    checkBan,
    checkAdmin,
    uploadImages,
    ImageController.addProtocolImages
  );

imageRouter
  .route("/:imageId")
  .get(checkToken, checkBan, ImageController.getImageByID)
  .delete(checkToken, checkBan, checkAdmin, ImageController.deleteImageByID);

module.exports = imageRouter;
