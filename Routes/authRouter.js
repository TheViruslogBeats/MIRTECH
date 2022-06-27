const { Router } = require("express");

const router = new Router();

const authController = require("../Controllers/auth-Controller");
const authMiddleware = require("../Middleware/auth-middleware");

const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refresh);
router.get("/users", authMiddleware, authController.getUsers);

module.exports = router;
