const { Router } = require("express");
const multer = require("multer");

const {
  createInventory,
  getInventories,
  getInventory,
  editInventory,
  deleteInventory,
  uploadFileController
} = require("../../controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { isAuthenticatedInventory, commonRole } = require("../../middleware");

const router = new Router();

router.post("/upload", upload.single("file"), uploadFileController);
router.post(
  "/inventory",
  isAuthenticatedInventory,
  commonRole,
  createInventory
);
router.get(
  "/inventories",
  isAuthenticatedInventory,
  commonRole,
  getInventories
);
router.get(
  "/inventory/:id",
  isAuthenticatedInventory,
  commonRole,
  getInventory
);
router.patch(
  "/inventory/:id",
  isAuthenticatedInventory,
  commonRole,
  editInventory
);
router.delete(
  "/inventory/:id",
  isAuthenticatedInventory,
  commonRole,
  deleteInventory
);

module.exports = router;
