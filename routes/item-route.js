const express = require("express");

const {
  getAllItem,
  saveItem,
  updateItem,
  deleteItem,
  searchItem,
  getVehiclesWithParts,
  saveItemWithSpareParts,
} = require("../controller/item-controller");

const router = express.Router();

router.post("/withparts", saveItemWithSpareParts);
router.get("/vehicleswithparts", getVehiclesWithParts);
router.get("/", getAllItem);
router.post("/", saveItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/:id", searchItem);

module.exports = router;
