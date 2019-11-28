/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwt = require('jsonwebtoken');

module.exports = {
  
  login: function(req, res) {
    User.findOne({username: req.body.username})
      .then(user => {
        if (user.username === req.body.username) {
          res.status(200).json({
            tolken: jwt.sign(user.toJSON(), 'secret'),
          })
        } else {
          res.status(400).json({
            msg: 'senha errada',
          })
        }
      })
      .catch(err => res.status(401).json({err}));
  },

};

