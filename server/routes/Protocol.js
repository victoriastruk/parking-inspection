const protocolRouter = require("express").Router({ mergeParams: true });
const { uploadImages } = require("../middleware/imagesUpload");
const paginate = require("../middleware/paginate");
const { checkToken } = require("../middleware/checkToken");
const { checkAdmin } = require("../middleware/checkAdmin");
const ProtocolController = require("../controllers/ProtocolController");

protocolRouter
  .route("/")
  .get(checkToken, paginate, ProtocolController.getAllProtocolsByOfficerID)
  .post(
    checkToken,
    checkAdmin,
    uploadImages,
    ProtocolController.createProtocol
  );

protocolRouter
  .route("/:id")
  .put(
    checkToken,
    checkAdmin,
    uploadImages,
    ProtocolController.updateProtocolByID
  )
  .delete(checkToken, checkAdmin, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;
