const { Router } = require("express");
const multer = require("multer");

const {
  createInventory,
  listInventories,
  getInventories,
  getInventory,
  editInventory,
  deleteInventory,
  uploadimage
} = require("../../controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { isAuthenticatedInventory, commonRole } = require("../../middleware");

const router = new Router();

router.post("/upload", upload.single("image"), uploadimage);
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
router.get("/inventory", isAuthenticatedInventory, commonRole, listInventories);
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
