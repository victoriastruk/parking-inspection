const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");
const AdminController = require("../controllers/AdminController");
const { checkToken } = require("../middleware/checkToken");
const { hashPass } = require("../middleware/hashPassword");
const { checkAdmin } = require("../middleware/checkAdmin");
const { checkBan } = require("../middleware/checkBan");

userRouter.route("/sign-up").post(hashPass, UserController.registrationUser);

userRouter.route("/sign-in").post(UserController.loginUser);

userRouter.route("/").get(checkToken, checkBan, UserController.checkAuth);

userRouter.route("/refresh").post(checkBan, UserController.refreshSession);

userRouter
  .route("/banlist")
  .post(checkToken, checkBan, checkAdmin, AdminController.ban)
  .delete(checkToken, checkBan, checkAdmin, AdminController.unban);

userRouter
  .route("/all/users")
  .get(checkToken, checkBan, checkAdmin, AdminController.getAllUsers);

userRouter
  .route("all/banned")
  .get(checkToken, checkBan, checkAdmin, AdminController.getAllBannedUsers);

module.exports = userRouter;
