const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

const ExperienceController = require("../controllers/experience.js");
const uploadCloud = require("../middlewares/uploadMiddleware");
const InfoController = require("../controllers/info");
//The basic medical sciences look at the molecular, cellular, and systems organization of the human body and the biological mechanisms it uses to adapt to environmental changes and disease.
router.get('/',authMiddleware, ExperienceController.getExperience);
router.get('/:id',authMiddleware, ExperienceController.getExperience);
router.patch('/:id',authMiddleware, ExperienceController.updateExperience);
router.put('/',authMiddleware, ExperienceController.addExperience);
router.delete('/:id',authMiddleware, ExperienceController.deleteExperience);
router.get('/update/image',  authMiddleware,
    uploadCloud.single("ImgUrl"),
    ExperienceController.updateExperience);

module.exports = router;
