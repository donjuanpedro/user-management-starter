const _ = require('lodash');
const Backbone = require('backbone');

const UserView = Backbone.View.extend({
  el: `<li class-"user-info"></li>`,

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: _.template(`
    <div>
      <label>Name:</label>
      <%= user.get("name") %>
    </div>
    <div>
      <label>Email:</label>
      <%= user.get("email") %>
    </div>
    <div>
      <label>Bio:</label>
      <%= user.get("bio") %>
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
      if (this.model.get('activated')) {
        this.$el.addClass('activated');
      } else {
        this.$el.removeClass('activated');
      }

      this.$el.html(this.template({user: this.model}));
      return this;
    }
});

module.exports = UserView;
