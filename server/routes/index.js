const router = require("express").Router();

const parlOfficerRouter = require("./ParkOfficer");

const userRouter = require("./User");

router.use("/parkOfficers", parlOfficerRouter);
router.use("/users", userRouter);

module.exports = router;
