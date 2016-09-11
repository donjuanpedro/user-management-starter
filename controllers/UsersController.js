const UserModel = require('../models/UserModel.js');

module.exports = {
  list: function(req, res) {
    UserModel.find(function(err, users) {
      res.json(200, users);
    });
  },

  show: function(req, res) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function (err, user) {
      return res.render('user_view', {user: user});
    });
  },

  edit: function(req, res) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function (err, user) {
      return res.render('user_edit', {user: user});
    });
  },

  create: function(req, res) {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
      img: req.body.img
    });
    user.save((err, user) => {
      res.json(user);
    });
  },

  update: function(req, res) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function(err, user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.bio = req.body.bio;
      user.pic = req.body.pic;
      user.activated = req.body.activated;

      user.save(function (err, user) {
        res.json(user);
      });
    });
  },
  remove: function(req, res) {
    var id = req.params.id;
    UserModel.findByIdAndRemove({_id: id}, function (err, user) {
      users.remove(user);
    });
    users.save(function(err, user) {
      users.save(function(err, users) {
        res.json(users);
      });
    });
  },
};
