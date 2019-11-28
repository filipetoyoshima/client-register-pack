/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  // ----------------------------------------------------------------
  create: async function (req, res) {
    /* 
      Expected req.body: {
        name,
        cpf,
        email,
        addresses: [{
          number,
          cep,
          complement
        },...]
      }
    */
    var flaverr = require('flaverr');

    // Using transaction to save changes on db only if
    // everything with req is ok!
    await sails.getDatastore()
      .transaction(async (db) => {
        var client = { ...req.body };
        delete client.addresses;

        await Client.create(client).usingConnection(db)
          .catch(err => {
            throw flaverr('E_CREATE_CLIENT', new Error(err));
          });

        let addresses = req.body.addresses;

        for (var i=0; i<addresses.length; i+=1) {
          var adressWithOwner = {
            ...addresses[i],
            owner: client.cpf,
          }
            
          await Address.create(adressWithOwner).usingConnection(db)
            .catch(err => {
              throw flaverr('E_CREATE_ADDRESS', new Error(err));
            });
        }

      })
      .intercept('E_CREATE_CLIENT', () => 'Error creating user')  
      .intercept('E_CREATE_ADDRESS', () => 'Error creating adresses');

    return res.status(200).json({
      msg: "ok",
    })
  },

  // ---------------------------------------------------------------------------
  destroy: async function(req, res) {
    const cpf = req.body.cpf;
    try {
      await Address.destroy({owner: cpf});
      await Client.destroy({cpf: cpf})
        .then(response => {
          res.status(200).json(response);
        });
    } catch {
      res.status(400).json({
        err: 'CPF inválido'
      })
    }
  },

  // ---------------------------------------------------------------------------
  update: async function(req, res) {
    /* 
      Expected req.body: {
        oldCpf,
        name,
        cpf,
        email,
        addresses: [{
          number,
          cep,
          complement
        },...]
      }
    */

    var flaverr = require('flaverr');

    await sails.getDatastore().transaction(async (db) => {
      Client.updateOne(
        {cpf: req.body.oldCpf},
        {
          cpf: req.body.cpf,
          name: req.body.name,
          email: req.body.email,
        })
        .usingConnection(db)
        .catch(err => {
          throw flaverr('E_UPDATE_CLIENT', new Error(err));
        })
      
      Address.destroy({owner: req.body.oldCpf}).usingConnection(db)
        .catch(err => {
          throw flaverr('E_DESTROY_OLD_ADDRESSES', new Error(err));
        });

      let addressess = req.body.addresses.map((address) => {
        return {
          ...address,
          owner: req.body.cpf,
        }
      })

      Address.createEach(addressess).usingConnection(db)
        .catch(err => {
          throw flaverr('E_CREATE_NEW_ADDRESSES', new Error(err));
        });
    })
      .intercept('E_UPDATE_CLIENT', () => 'Erro de atualização dos dados do cliente')
      .intercept('E_DESTROY_OLD_ADDRESSES', () => 'Erro ao desrtuir dados antigos de endereço')
      .intercept('E_CREATE_NEW_ADDRESSES', () => 'Erro de criação de novos endereços');

    return res.status(200).json({
      msg: 'cadastro atualizado',
    })
  },

};