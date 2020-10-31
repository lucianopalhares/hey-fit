const bcrypt = require('bcrypt');
const { user } = require('../models');

module.exports = {
  async index (req, res) {
    try {

      const items = await user.findAll({
        where: req.body.where
      });

      return res.json({items});   

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar buscar os dados'
      })

    }
  },
  async show (req, res) {
    try {
        const item = await user.findByPk(req.params.id);

        return res.json({item});   

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar buscar os dados'
      })

    }
  },
  async store (req, res) {
    try {

        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)

        let item;
      
        await user.create(req.body).then(result => item = result);
  
        return res.json({item});  


    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar salvar os dados'
      })

    }
  },
  async update (req, res) {
    try {

      const salt = await bcrypt.genSalt()
      req.body.password = await bcrypt.hash(req.body.password, salt)
      
        const item = await user.update(req.body, {
            where: {
              id: req.params.id
            }
          });
        
        return res.status(200).json({item});

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar atualizar os dados'
      })

    }
  },
  async delete (req, res) {
    try {
      
      const item = await user.destroy({
        where: {
          id: req.params.id
        }
      });

      res.status(200).send("Deletado");

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar deletar os dados'
      })

    }
  }
}
