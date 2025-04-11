import express from "express";
import { body } from "express-validator";
import * as application from "../controller/application";
const router = express.Router();

router.post(
  "/create",
  body("company", "Company name is required")
    .notEmpty()
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("Company name should only contain letters and numbers"),
  body("role", "Role is required")
    .notEmpty()
    .matches(/^[a-zA-Z0-9 ]+$/)
    .withMessage("Role should only contain letters and numbers"),
  body("status", "Status is required")
    .notEmpty()
    .isIn(["APPLIED", "REJECTED", "OFFER", "INTERVIEW"])
    .withMessage(
      "Status should be one of the following: APPLIED, REJECTED, OFFER, INTERVIEW"
    ),
  body("link", "Link is required")
    .notEmpty()
    .isURL()
    .withMessage("Link should be a valid URL"),
  application.create
);
router.get("/getall", application.getAll);
router.put("/update/:id", application.update);
router.delete("/delete/:id", application.DeleteOne);

export default router;
