// models/googleUserModel.js
const users = [];

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

const createUser = (email, name, role = 'candidat') => {
  const user = { id: users.length + 1, email, name, role };
  users.push(user);
  return user;
};

module.exports = {
  findUserByEmail,
  createUser
};
