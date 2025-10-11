const protocolRouter = require("express").Router({ mergeParams: true });
const { uploadImages } = require("../middleware/imagesUpload");
const paginate = require("../middleware/paginate");

const ProtocolController = require("../controllers/ProtocolController");

protocolRouter
  .route("/")
  .get(paginate, ProtocolController.getAllProtocols)
  .post(uploadImages, ProtocolController.createProtocol);

protocolRouter
  .route("/:id")
  .get(paginate, ProtocolController.getAllProtocolsByOfficerID)
  .put(uploadImages, ProtocolController.updateProtocolByID)
  .delete(ProtocolController.deleteProtocolByID);

module.export = protocolRouter();
