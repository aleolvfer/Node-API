const UseController = require('./controller/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    hendler: UseController.listUsers
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    hendler: UseController.getUserById
  },
  {
    endpoint: '/users',
    method: 'POST',
    hendler: UseController.createUser
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    hendler: UseController.updateUser
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    hendler: UseController.deleteUser
  },

];