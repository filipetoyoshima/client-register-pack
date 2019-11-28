/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = {
  
  create: async function(req, res) {
    const crypt = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      username: req.body.username,
      password: crypt,
    }

    console.log(typeof(newUser.password));
    
    User.create(newUser)
      .then(msg => {
        return res.status(200).json({
          msg: 'User created!',
        });
      })
      .catch(err => {
        return res.status(400).json(err);
      })
  },

  login: async function(req, res) {
    User.findOne({username: req.body.username})
      .then(async user => {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
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

