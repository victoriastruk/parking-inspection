const protocolRouter = require("express").Router({ mergeParams: true });
const { uploadImages } = require("../middleware/imagesUpload");
const paginate = require("../middleware/paginate");
const { checkToken } = require("../middleware/checkToken");

const ProtocolController = require("../controllers/ProtocolController");

protocolRouter
  .route("/")
  .get(checkToken, paginate, ProtocolController.getAllProtocolsByOfficerID)
  .post(checkToken, uploadImages, ProtocolController.createProtocol);

protocolRouter
  .route("/:id")
  .put(checkToken, uploadImages, ProtocolController.updateProtocolByID)
  .delete(checkToken, ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;
