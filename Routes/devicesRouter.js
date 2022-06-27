const { Router } = require("express");

const router = new Router();

const authMiddleware = require("../Middleware/auth-middleware");

router.get("/mydevices", authMiddleware,)

module.exports = router;