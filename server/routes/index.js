const router = require("express").Router();

const parlOfficerRouter = require('./ParkOfficer');

router.use('/parlOfficers', parlOfficerRouter);

module.exports = router;