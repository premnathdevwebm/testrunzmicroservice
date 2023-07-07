const { Router } = require("express");
const {
  createProcedure,
  listAllProcedureAssociate,
  procedureById,
  procedureByTitle,
  editprocedureById,
  deleteprocedureById,
} = require("../../controller");
const { isAuthenticatedProcedure, commonRole } = require("../../../middleware");
const router = new Router();

router.post(
  "/procedure",
  isAuthenticatedProcedure,
  commonRole,
  createProcedure
);
router.get(
  "/procedure",
  isAuthenticatedProcedure,
  commonRole,
  listAllProcedureAssociate
);
router.get(
  "/procedure/byid/:id",
  isAuthenticatedProcedure,
  commonRole,
  procedureById
);
router.get(
  "/procedure/bytitle/:title",
  isAuthenticatedProcedure,
  commonRole,
  procedureByTitle
);
router.patch(
  "/procedure/:id",
  isAuthenticatedProcedure,
  commonRole,
  editprocedureById
);
router.delete(
  "/procedure/:id",
  isAuthenticatedProcedure,
  commonRole,
  deleteprocedureById
);

module.exports = router;
