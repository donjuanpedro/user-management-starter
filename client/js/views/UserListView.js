const Backbone = require('backbone');
const UserView = require('./UserView');
const UserModel = require('../models/UserModel');

const UserListView = Backbone.View.extend({
  el: `
    <div>
      <form class="form-inline" action="/users" method="POST">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-12 form-group text-left">
              <label for="name">Name:</label>
              <input type="text" class="form-control" name="name" />
            </div>
            <div class="col-xs-12 form-group text-left">
              <label for="email">Email Address</label>
              <input type="text" class="form-control" name="email" />
            </div>
            <div class="col-xs-12 form-group text-left">
              <label for="bio">Bio</label>
              <textarea type="text" class="form-control" class="form-control" name="bio" rows="6"></textarea>
            </div>
            <div class="col-xs-12 form-group text-left">
              <input type="file" name="img" accept="image/*" />
              <input type="submit" class="btn btn-default" value="Submit" />
            </div>
            <div class="col-xs-12 form-group text-left">
              <label>Activated:</label>
              <input type="checkbox" <%= user.get('activated') ? 'checked' : '' %> />
            </div>
          </div>
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
      img: form.find('input[name="img"]').val(),
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
