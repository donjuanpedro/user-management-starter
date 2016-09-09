const Backbone = require('backbone');
const UserView = require('./UserView');
const UserModel = require('../models/UserModel');

const UserListView = Backbone.View.extend({
  el: `
    <div>
      <form action="/users" method="POST">
        <div>
          <label for="name">Name:</label>
          <input type="text" name="name" />
          <label for="email">Email Address</label>
          <input type="text" name="email" />
          <label for="bio">Bio</label>
          <input type="text" name="bio" />
          <input type="submit" value="Submit" />
        </div>
      </form>
      <ul class="user-list"></ul>
    </div>
  `,

  initialize() {
    this.collection.fetch();
    this.listenTo(this.collection, 'update', this.render);
  },

  events: {
    'submit form': 'handleFormSubmit'
  },

  handleFormSubmit(e) {
    const form = $(e.target);
    const user = new UserModel({
      name: form.find('input[name="name"]').val(),
      email: form.find('input[name="email"]').val(),
      bio: form.find('input[name="bio"]').val(),
    });

    user.save(null, {
      success: () => {
        this.collection.add(user);
        form.find('input[type="text"]').val('');
        this.render();
      }
    });
    e.preventDefault();
  },

  render() {
    this.$el.find('ul').html('');
    this.collection.forEach((user) => {
      const view = new UserItemView({ model: user});
      this.$el.find('ul').append(view.render().el);
    });
    return this;
  }
});

module.exports = UserListView;
