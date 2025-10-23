const parkOfficerRouter = require("express").Router();
const imageRouter = require("./Image");
const protocolRouter = require("./Protocol");

const paginate = require("../middleware/paginate");
const { checkToken } = require("../middleware/checkToken");

const ParkOfficerController = require("../controllers/ParkOfficerController");
const ProtocolController = require("../controllers/ProtocolController");

parkOfficerRouter
  .route("/protocols")
  .get(checkToken, paginate, ProtocolController.getAllProtocols);

parkOfficerRouter
  .route("/")
  .get(checkToken, ParkOfficerController.getAllParkOfficers)
  .post(checkToken, ParkOfficerController.createParkOfficer);

parkOfficerRouter
  .route("/:id")
  .get(checkToken, paginate, ParkOfficerController.getParkOfficerByID)
  .put(checkToken, ParkOfficerController.updateParkOfficerByID)
  .delete(checkToken, ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
  .route("/:id/dismiss")
  .put(checkToken, ParkOfficerController.dismissParkOfficerByID);

parkOfficerRouter
  .route("/:id/restore")
  .put(checkToken, ParkOfficerController.restoreParkOfficerByID);

parkOfficerRouter.use("/:officerId/protocols", protocolRouter);

parkOfficerRouter.use("/protocols/:protocolId/images", imageRouter);

module.exports = parkOfficerRouter;
