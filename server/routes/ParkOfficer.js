const parkOfficerRouter = require("express").Router();
const imageRouter = require("./Image");
const protocolRouter = require("./Protocol");

const paginate = require("../middleware/paginate");
const { checkToken } = require("../middleware/checkToken");
const { checkAdmin } = require("../middleware/checkAdmin");
const { checkBan } = require("../middleware/checkBan");

const ParkOfficerController = require("../controllers/ParkOfficerController");
const ProtocolController = require("../controllers/ProtocolController");

parkOfficerRouter
  .route("/protocols")
  .get(checkToken, checkBan, paginate, ProtocolController.getAllProtocols);

parkOfficerRouter
  .route("/")
  .get(checkToken, checkBan, paginate, ParkOfficerController.getAllParkOfficers)
  .post(
    checkToken,
    checkBan,
    checkAdmin,
    ParkOfficerController.createParkOfficer
  );

parkOfficerRouter
  .route("/:id")
  .get(checkToken, checkBan, ParkOfficerController.getParkOfficerByID)
  .put(
    checkToken,
    checkBan,
    checkAdmin,
    ParkOfficerController.updateParkOfficerByID
  )
  .delete(
    checkToken,
    checkBan,
    checkAdmin,
    ParkOfficerController.deleteParkOfficerByID
  );

parkOfficerRouter
  .route("/:id/dismiss")
  .put(
    checkToken,
    checkBan,
    checkAdmin,
    ParkOfficerController.dismissParkOfficerByID
  );

parkOfficerRouter
  .route("/:id/restore")
  .put(
    checkToken,
    checkBan,
    checkAdmin,
    ParkOfficerController.restoreParkOfficerByID
  );

parkOfficerRouter.use("/:officerId/protocols", protocolRouter);

parkOfficerRouter.use("/protocols/:protocolId/images", imageRouter);

module.exports = parkOfficerRouter;
