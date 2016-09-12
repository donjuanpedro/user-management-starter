const _ = require('lodash');
const Backbone = require('backbone');

const UserItemView = Backbone.View.extend({
  el: '<li class="user-info"></li>',

  template: _.template(`
    <a href="#users/<%= user.get('_id') %>">
      <img src="<%= user.get('img') %>" alt="Profile Pic" />
    </a>
      <div>
        <span> <%= user.get('name') %> </span>
      </div>
      <div>
        <span> <%= user.get('email') %> </span>
      </div>
      <div>
        <span> <%= user.get('bio') %> </span>
      </div>
      <div>
        <label>Activated:</label>
        <input type="checkbox" <%= user.get('activated') ? 'checked' : '' %> />
      </div>
  `),

  events: {
    'click input[type="checkbox"]' : 'handleCheckBoxClick'
  },

  handleCheckBoxClick(e) {
    this.model.save({ activated: e.target.checked});
  },

  render() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});

module.exports = UserItemView;
