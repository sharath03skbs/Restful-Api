import pino from "pino";
import { StatusCodes } from "http-status-codes"; //This is being used to make the doc more readable

import userService from "../services/user.service";

const logger = pino();
const STATUS = {
  success: true,
  failure: false,
};

/**
 * Retrieve the details of all users.
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const getUserController = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = userService.getUser(id);
  if (user) {
    logger.info(`Retrieving user ${id} details`);
    return res.status(StatusCodes.OK).send(user);
  }
  return res
    .status(StatusCodes.NOT_FOUND)
    .send({ status: STATUS.failure, message: `User ${id} not found` });
};

/**
 * Retrieve individual user using id.
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const getAllUsersController = (req, res) => {
  const users = userService.getAllUsers();
  if (users.length) {
    return res.status(StatusCodes.OK).send(users);
  }
  return res
    .status(StatusCodes.NOT_FOUND)
    .send({ status: STATUS.failure, message: "No Users found" });
};

/**
 * Add a user.
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const addUserController = (req, res) => {
  const { body: user } = req;
  const addedUser = userService.addUser(user);
  logger.info("Creating a user");

  return res.status(StatusCodes.CREATED).send({
    status: STATUS.success,
    user: addedUser,
  });
};

/**
 * Updating a user.
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const updateUserController = (req, res) => {
  const { body: user } = req;
  const id = parseInt(req.params.id, 10);

  const updatedUser = userService.updateUser(id, user);

  if (updatedUser) {
    logger.info(`Updating user with ID:  ${id}`);
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      user: updatedUser,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} Not Found`,
    });
  }
};

/**
 * Remove a user.
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const deleteUserController = (req, res) => {
  const { params } = req;
  const id = parseInt(params.id, 10);
  const deletedUser = userService.removeUser(id);
  if (!deletedUser) {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} Not Found`,
    });
  }
  logger.info(`Removing user with ID: ${id}`);
  return res.status(StatusCodes.OK).send({
    status: STATUS.success,
    message: `User ${id} successfully deleted`,
    user: deletedUser,
  });
};

/*Alternative Delete Logic
Delete user
const deleteUserController =  (req, res) => {
  const { params } = req;
  const id = parseInt(params.id, 10);
  const getUser = userService.getUser(id);
  if (getUser) {
    userService.removeUser(id);
    return res.status(StatusCodes.OK).send({
    status: STATUS.success,
    message: `User ${id} successfully deleted`,
    user: deletedUser,
  });
  return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} Not Found`,
    });
  }
});*/

export default {
  getUserController,
  getAllUsersController,
  addUserController,
  updateUserController,
  deleteUserController,
};
