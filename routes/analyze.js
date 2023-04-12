const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

const AnalyzeController = require("../controllers/analyze.js");

router.get('/analyze/:id',authMiddleware, AnalyzeController.getAnalyze);
router.patch('/analyze',authMiddleware, AnalyzeController.updateAnalyze);
router.put('/analyze',authMiddleware, AnalyzeController.addAnalyze);
router.delete('/analyze/:id',authMiddleware, AnalyzeController.deleteAnalyze);

module.exports = router;
