const _ = require('lodash');
const Backbone = require('backbone');

const UserEditView = Backbone.View.extend({
  el: `<div class="edit"></div>`,

  template: _.template(`
    <form class="form-inline" action="/users/<%=user['_id']%>?_method=PUT" method="POST">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-12 form-group text-left" id="authorLetters">
            <input value="<%= user['name'] %>" type="text" class="form-control" name="name" id="name" placeholder="Enter Name">
          </div>
          <div class="col-xs-12 form-group text-left" id="dateLetters">
            <input value="<%= user['email'] %>" type="text" class="form-control" name="email" id="date" placeholder="Enter Email">
          </div>
          <div class="col-xs-12 form-group text-left" id="bio">
            <textarea type="text" class="form-control" name="bio" rows="6" id="bio" placeholder="Enter Biography"><%= user['bio'] %></textarea>
          </div>
          <div class="col-xs-12">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </div>
    </form>


})
