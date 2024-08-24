import test from "ava";

import userService from "../user.service";

let sampleUser;

test.beforeEach(() => {
  sampleUser = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    city: "Melbourne",
    country: "Australia",
  };
});

test.after(() => {
  if (userService.getUser(2)) {
    console.log("Cleanup : User 2 being removed");
    userService.removeUser(2);
  }
});
test("must add a user", (t) => {
  const expectedId = 1;
  const user = userService.addUser(sampleUser);
  t.is(user.id, expectedId);
  t.deepEqual(user, { id: expectedId, ...sampleUser });
});

test("must retrieve a user", (t) => {
  const expectedId = 1;
  const user = userService.getUser(1);
  t.is(user.id, expectedId);
  t.deepEqual(user, { id: expectedId, ...sampleUser });
});

test("must retrieve all users", (t) => {
  userService.addUser(sampleUser);
  const users = userService.getAllUsers();
  t.deepEqual(users, [
    { id: 1, ...sampleUser },
    { id: 2, ...sampleUser },
  ]);
});

test("must update a user", (t) => {
  const expectedId = 1;
  const updatedDetails = {
    name: "Rock",
    email: "rock@gmail.com",
    city: "Melbourne",
    country: "Australia",
  };
  const user = userService.updateUser(1, updatedDetails);
  t.is(user.id, expectedId);
  t.deepEqual(user, { id: expectedId, ...updatedDetails });
});

test("must remove a user", (t) => {
  //User 1 doesnt exist
  const userBeforeDeletion = userService.getUser(1);
  const expected = userService.removeUser(1);
  t.is(expected, userBeforeDeletion);
  //Trying to retrieve a removed user and expecting "undefined"
  const user = userService.getUser(1);
  t.is(user, undefined);
});

// // Mock user data
// let users = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Jane Doe' },
//   { id: 3, name: 'Alice' }
// ];
// // Stub the userDao.remove method
// sinon.stub(userDao, 'remove').callsFake((userId) => {
//   return users.find((user, index) => {
//     if (user.id === userId) {
//       users.splice(index, 1);
//       return true;
//     }
//     return false;
//   });
// });

// test('removeUser successfully removes a user', t => {
//   // Run the function
//   removeUser(2);

//   // Assertions
//   t.is(users.length, 2); // Ensure one user was removed
//   t.false(users.some(user => user.id === 2)); // Ensure the correct user was removed
// });

// test.afterEach(() => {
//   // Reset the users array after each test
//   users = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Doe' },
//     { id: 3, name: 'Alice' }
//   ];
// });

// test.after.always(() => {
//   sinon.restore(); // Restore the stubbed methods after all tests
// });
