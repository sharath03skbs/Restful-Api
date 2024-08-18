//Data access object : Interface to access the db services without exposing the data
import users from "../data/users.data";

/*Retrieve
const get = (userId) => {
  const findUser = users.find((user) => {
    if (user.id === userId) {
      return user;
    }
    return null;
  });
  return findUser;
};*/

//A shorter way
/**
 *
 * @param {number} userId
 * @returns {object|undefined}
 */
const get = (userId) => users.find((user) => user.id === userId);

/*Retrieve All users
const getAll = () => {
  return users;
};*/

//Shorter way
/**
 *
 * @returns {Array}
 */
const getAll = () => users;

/**
 * Inserting a user
 * @param {object} details
 * @returns {*&{id:number}}
 */
const insert = (details) => {
  //Adding index to the user details
  const newUser = { id: users.length + 1, ...details };
  users.push(newUser);
  return newUser;
};

/**
 * Updating the user
 * @param {number} userId
 * @param {object} newDetails
 * @returns {object|boolean}
 */
const update = (userId, newDetails) => {
  let currentUser = null;
  /* let userIndex;
  users.map((user, index) => {
    if (user.id === userId) {
      currentUser = user;
      userIndex = index;
    }
  });*/
  const userIndex = users.findIndex((user) => {
    return user.id === userId;
  });
  if (userIndex === -1) {
    return false;
  }
  currentUser = users[userIndex];
  // if (!currentUser) {
  //   return false;
  // }
  const updatedUser = {
    ...currentUser,
    ...newDetails,
  };
  users.splice(userIndex, 1, updatedUser);
  return updatedUser;
};

/**
 * Remove user using Id
 * @param userId
 * @returns {boolean}
 */
const remove = (userId) => {
  //The Function is simply defined here and is called in the return statement of remove()
  const deleteUser = (user, index) => {
    if (user.id === userId) {
      /*By using of optional chaining we can avoid the return statements
      user?.id: The ?. operator ensures that the code only tries to access id if user is not undefined or null. If user is undefined, the expression will short-circuit to undefined, preventing the TypeError.
      if (user?.id === userId) {*/
      //Remove the user from the array using the index
      users.splice(index, 1);
      return true;
    }
    return false;
  };
  return users.find(deleteUser);
};

export default { insert, get, getAll, update, remove };
