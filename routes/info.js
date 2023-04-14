const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

const InfoController = require("../controllers/info.js");
const uploadCloud = require("../middlewares/uploadMiddleware");
//
router.get("/", authMiddleware, InfoController.getInfo);
router.get("/:id", authMiddleware, InfoController.getInfo);
router.get("/all/:role", authMiddleware, InfoController.getRoleAll);
router.put('/update/image',authMiddleware,
    uploadCloud.single("userImgUrl"),
    InfoController.updateInfo);
router.patch('/update',authMiddleware, InfoController.updateInfo);

module.exports = router;
