import userDao from "../models/persistence/user.dao";

/**
 *Get user details using Id using Implicit return
 * @param {number} userId
 * @returns {object|undefined}
 */
const getUser = (userId) => userDao.get(userId);

/**
 * Get all users details
 * @returns {Array}
 */
const getAllUsers = () => userDao.getAll();

/**
 * Add a user
 * @param {object} details
 * @returns {object}
 */
const addUser = (details) => userDao.insert(details);

/**
 * Update the user
 * @param {number} userId
 * @param {object} details
 * @returns {object}
 */
const updateUser = (userId, details) => userDao.update(userId, details);

/**
 *Remove the user using id
 * @param {number} userId
 * @returns {boolean}
 */
const removeUser = (userId) => userDao.remove(userId);

export default { getUser, getAllUsers, addUser, updateUser, removeUser };
