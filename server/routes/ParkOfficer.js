const parkOfficerRouter = require("express").Router();
const imageRouter = require("./Image");
const protocolRouter = require("./Protocol");
const ParkOfficerController = require("../controllers/ParkOfficerController");
const ProtocolController = require("../controllers/ProtocolController");

parkOfficerRouter.route("/protocols").get(ProtocolController.getAllProtocols);

parkOfficerRouter
  .route("/")
  .get(ParkOfficerController.getAllParkOfficers)
  .post(ParkOfficerController.createParkOfficer);

parkOfficerRouter
  .route("/:id")
  .get(ParkOfficerController.getParkOfficerByID)
  .put(ParkOfficerController.updateParkOfficerByID)
  .delete(ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
  .route("/:id/dismiss")
  .put(ParkOfficerController.dismissParkOfficerByID);

parkOfficerRouter.use("/:officerId/protocols", protocolRouter);

parkOfficerRouter.use("/protocols/:protocolId/images", imageRouter);

module.exports = parkOfficerRouter;
