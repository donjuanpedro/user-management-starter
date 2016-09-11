const Backbone = require('backbone');
const UserModel = require('./models/UserModel');
const UsersCollection = require('./collections/UsersCollection');
const UserListView = require('./views/UserListView');

let currentview;

const Router = Backbone.Router.extend({
  routes: {
    "/": "users",
    "users/:id": "user",
    "*users": "users",
  },

  users() {
    const view = new UserListView({ collection: new UsersCollection() });
    setView(view);
  },

  user(id) {
    const user = new UserModel({ _id: id});
    const view = new UserProfileView({ model: user});
    setView(view);
  }
});

function setView(view) {
  if (currentView) {
    currentView.remove();
  }
  currentView = view;

  const app = document.querySelector('#app');
  app.innerHTML = '';
  app.appendChild(view.render().el);
}

module.exports = Router;
