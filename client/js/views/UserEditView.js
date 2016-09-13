const Backbone = require('backbone');
const _ = require('lodash');
const UserModel = require('./models/UserModel');

const UserEditView = Backbone.View.extend({

  template: _.template(`
      <form class="form-inline" action="/users/<%=user.get('_id')%>?_method=PUT" method="POST">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-12">
              <div class="col-lg-12 form-group text-left">
                <input value="<%= user.get('name')%>" type="text" class="form-control" name="name" placeholder="name"/>
              </div>
              <div class="col-lg-12 form-group text-left">
                <input value="<%= user.get('email')%>" type="text" class="form-control" name="email" placeholder="email"/>
              </div>
              <div class="col-lg-12 form-group text-left">
                <input value="<%= user.get('bio')%>" type="text" class="form-control" class="form-control" name="bio" placeholder="bio" />
              </div>
              <div class="col-lg-12 form-group text-left">
                <input value="<%= user.get('profilePic')%>" type="file" name="profilePic" accept="image/*" />
                <button type="submit" class="btn btn-default">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      `),

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
        this.model.add(user);
        form.find('input[type="text"]').val('');
        this.render();
      }
    });
    e.preventDefault();
  },

  render() {
    this.$el.html(this.template({user: this.model}));
    return this;
  }
});

module.exports = UserEditView;
