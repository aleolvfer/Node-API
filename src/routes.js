const UseController = require('./controller/UseController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    hendler: UseController.listUsers
  },
  {
    endpoint: '/products',
    method: 'GET',
    hendler: UseController.listProducts
  },

];