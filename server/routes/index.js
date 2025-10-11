const router = require("express").Router();

const parlOfficerRouter = require('./ParkOfficer');

router.use('/parkOfficers', parlOfficerRouter);

module.exports = router;