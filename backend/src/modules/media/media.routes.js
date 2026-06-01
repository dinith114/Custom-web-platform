const express = require("express");
const router = express.Router({ mergeParams: true });

const { verifyToken } = require("../auth/auth.middleware");
const { verifySiteOwner } = require("../../middleware/verifySiteOwner");
const { uploadSingleFile } = require("../../middleware/upload");

const { uploadMedia } = require("./media.controller");

// All media routes require auth + site ownership
router.use(verifyToken);
router.use(verifySiteOwner);

router.post("/upload", uploadSingleFile, uploadMedia);

module.exports = router;
