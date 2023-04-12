const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

const ColleagueController = require("../controllers/colleague.js");

router.get('/',authMiddleware, ColleagueController.getColleague);
router.get('/:id',authMiddleware, ColleagueController.getColleague);
router.patch('/',authMiddleware, ColleagueController.updateColleague);
router.put('/',authMiddleware, ColleagueController.addColleague);
router.delete('/:id',authMiddleware, ColleagueController.deleteColleague);

module.exports = router;
