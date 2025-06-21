const express = require("express");
const {
  getAllCoustomer,
  saveCoustomer,
  updateCoustomer,
  deleteCoustomer,
  searchCoustomer,
} = require("../controller/coustomer-controller");

const router = express.Router();

router.get("/", getAllCoustomer);
router.post("/", saveCoustomer);
router.put("/", updateCoustomer);
router.delete("/", deleteCoustomer);
router.get("/:id", searchCoustomer);

module.exports = router;
