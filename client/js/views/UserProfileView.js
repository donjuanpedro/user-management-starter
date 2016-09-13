const _ = require('lodash');
const Backbone = require('backbone');

const UserProfileView = Backbone.View.extend({
  el: `<div class="profile"></div>`,

  template: _.template(`
    <div>
      <span> <%= user.get("img") %> </span>
    </div>
    <div>
      <label>Name:</label>
      <span> <%= user.get("name") %> </span>
    </div>
    <div>
      <label>Email:</label>
      <span> <%= user.get("email") %> </span>
    </div>
    <div>
      <label>Bio:</label>
      <span> <%= user.get("bio") %> </span>
    </div>
    <div>
      <label>Activated:</label>
      <input type="checkbox" <%= user.get('activated') ? 'checked' : '' %> />
    </div>
    `),

    initialize() {
      this.model.fetch();
      this.listenTo(this.model, 'sync', this.render);
    },

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

module.exports = UserProfileView;
