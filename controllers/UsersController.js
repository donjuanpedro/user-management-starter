const UserModel = require('../models/UserModel.js');

module.exports = {
  list(req, res, next) {
    UserModel.find().exec()
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      return next(err);
    });
  },

  show(req, res, next) {
    UserModel.findOne({ _id: req.params.id }).exec()
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return next(err);
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
      return res.json(user);
    });
  },
};
