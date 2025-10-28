const parkOfficerRouter = require("express").Router();
const imageRouter = require("./Image");
const protocolRouter = require("./Protocol");

const paginate = require("../middleware/paginate");
const { checkToken } = require("../middleware/checkToken");
const { checkAdmin } = require("../middleware/checkAdmin");
const ParkOfficerController = require("../controllers/ParkOfficerController");
const ProtocolController = require("../controllers/ProtocolController");

parkOfficerRouter
  .route("/protocols")
  .get(checkToken, paginate, ProtocolController.getAllProtocols);

parkOfficerRouter
  .route("/")
  .get(checkToken, paginate, ParkOfficerController.getAllParkOfficers)
  .post(checkToken, checkAdmin, ParkOfficerController.createParkOfficer);

parkOfficerRouter
  .route("/:id")
  .get(checkToken, ParkOfficerController.getParkOfficerByID)
  .put(checkToken, checkAdmin, ParkOfficerController.updateParkOfficerByID)
  .delete(checkToken, checkAdmin, ParkOfficerController.deleteParkOfficerByID);

parkOfficerRouter
  .route("/:id/dismiss")
  .put(checkToken, checkAdmin, ParkOfficerController.dismissParkOfficerByID);

parkOfficerRouter
  .route("/:id/restore")
  .put(checkToken, checkAdmin, ParkOfficerController.restoreParkOfficerByID);

parkOfficerRouter.use("/:officerId/protocols", protocolRouter);

parkOfficerRouter.use("/protocols/:protocolId/images", imageRouter);

module.exports = parkOfficerRouter;
