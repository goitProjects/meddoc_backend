const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

const InfoController = require("../controllers/info.js");
const uploadCloud = require("../middlewares/uploadMiddleware");

router.get("/", authMiddleware, InfoController.getInfo);
router.get("/:id", authMiddleware, InfoController.getInfo);
router.get('/update/image',  authMiddleware,
    uploadCloud.single("userImgUrl"),
    InfoController.updateInfo);
router.patch('/update',authMiddleware, InfoController.updateInfo);

// router.get('/:id',authMiddleware, InfoController.getInfo);
// router.patch('/analyze',authMiddleware, InfoController.updateAnalyze);
// router.put('/analyze',authMiddleware, InfoController.addAnalyze);
// router.delete('/analyze/:id',authMiddleware, InfoController.deleteAnalyze);

module.exports = router;
