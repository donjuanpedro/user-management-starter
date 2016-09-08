const Backbone = require('backbone');

const UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/users'
});

module.exports = UserModel;
