const User = require('../models/user.model');


exports.create = function (req, res) {
  const user = new User({
    name: req.body.id
  });
    user.save()
      .then(function (createdUser) {
        return res.status(200).json({
          status: 200,
          data: createdUser,
          message: 'Success'
        });
      })
      .catch(function (err) {
        return res.status(400).json({
          status: 400,
          message: err.message
        });
      });
}
