const Backbone = require('backbone');
const UserItemView = require('./UserItemView');
const UserModel = require('../models/UserModel');

const UserListView = Backbone.View.extend({
  el: `
    <div>
      <form class="form-inline" action="/users" method="POST">
        <div class="container-fluid">
          <div class="row">
           <div class="col-xs-12">
            <div class="col-lg-12 form-group text-lef">
              <input type="text" class="form-control" name="name" placeholder="name"/>
            </div>
            <div class="col-lg-12 form-group text-left">
              <input type="text" class="form-control" name="email" placeholder="email"/>
            </div>
            <div class="col-lg-12 form-group text-left">
              <input type="text" class="form-control" class="form-control" name="bio" placeholder="bio" />
            </div>
            <div class="col-lg-12 form-group text-left">
              <input type="file" name="profilePic" accept="image/*" />
              <button type="submit" class="btn btn-default">Submit</button>
            </div>
           </div>
          </div>
        </div>
      </form>
      <ul></ul>
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
