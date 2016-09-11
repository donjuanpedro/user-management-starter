const $ = require('jquery');

// Set jQuery in the window
window.$ = window.jQuery = $;

const UserListView = require('./views/UserListView');
const UsersCollection = require('./collections/UsersCollection');

const users = new UsersCollection();
users.fetch();
const view = new UserListView({ collection: users});
const app = document.querySelector('#app');

app.appendChild(view.render().el);
