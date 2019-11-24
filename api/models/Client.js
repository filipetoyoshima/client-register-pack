/**
 * Client.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var cpf = require("gerador-validador-cpf");

module.exports = {

  primaryKey: 'cpf',

  attributes: {
    
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: 'string',
      required: true,
      custom: function (value) {
        // Allow only letters (latin included), the \' char and ONE space BETWEEN words.
        return value.match(/^[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\']+( [a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\']+)*$/)
      },
    },

    cpf: {
      type: 'string',
      required: true,
      unique: true,
      custom: function (value) {
        return !isNaN(value) && cpf.validate(value);
      }
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

