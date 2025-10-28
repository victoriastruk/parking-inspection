const protocolRouter = require("express").Router({ mergeParams: true });
const { uploadImages } = require("../middleware/imagesUpload");
const paginate = require("../middleware/paginate");
const { checkToken } = require("../middleware/checkToken");
const { checkAdmin } = require("../middleware/checkAdmin");
const { checkBan } = require("../middleware/checkBan");

const ProtocolController = require("../controllers/ProtocolController");

protocolRouter
  .route("/")
  .get(checkToken, checkBan, paginate, ProtocolController.getAllProtocolsByOfficerID)
  .post(
    checkToken,
    checkBan,
    checkAdmin,
    uploadImages,
    ProtocolController.createProtocol
  );

protocolRouter
  .route("/:id")
  .put(
    checkToken,
    checkBan,
    checkAdmin,
    uploadImages,
    ProtocolController.updateProtocolByID
  )
  .delete(checkToken, checkBan, checkAdmin, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;
