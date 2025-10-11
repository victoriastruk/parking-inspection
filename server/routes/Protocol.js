const protocolRouter = require("express").Router({ mergeParams: true });
const { uploadImages } = require("../middleware/imagesUpload");
const paginate = require("../middleware/paginate");

const ProtocolController = require("../controllers/ProtocolController");

protocolRouter
  .route("/")
  .get(paginate, ProtocolController.getAllProtocolsByOfficerID)
  .post(uploadImages, ProtocolController.createProtocol);

protocolRouter
  .route("/:id")
  .put(uploadImages, ProtocolController.updateProtocolByID)
  .delete(ProtocolController.deleteProtocolByID);

module.exports = protocolRouter;
