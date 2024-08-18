import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";

import {
  getUserSchema,
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "./user.schemas";
import userController from "./controllers/user.controller";

const router = express.Router();
//router.use(express.json());

//Get all users
router.get("/all", userController.getAllUsersController);

//Get specific user
router.get(
  "/get/:id",
  expressYupMiddleware({ schemaValidator: getUserSchema }),
  userController.getUserController
);

//Add user
router.post(
  "/add",
  expressYupMiddleware({
    schemaValidator: addUserSchema,
  }),
  userController.addUserController
);

//Update user
router.put(
  "/update/:id",
  expressYupMiddleware({
    schemaValidator: updateUserSchema,
  }),
  userController.updateUserController
);

//Delete user
router.delete(
  "/delete/:id",
  expressYupMiddleware({ schemaValidator: deleteUserSchema }),
  userController.deleteUserController
);

export default router;
