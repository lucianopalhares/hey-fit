'use strict';

const { person } = require('../models');

module.exports = {
  async index (req, res) {
    try {

      const items = await person.findAll({
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
        const item = await person.findByPk(req.params.id);

        return res.json({item});   

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar buscar os dados'
      })

    }
  },
  async store (req, res) {
    try {

      let item;
      
      await person.create(req.body).then(result => item = result);

      return res.json({item});   

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar salvar os dados'
      })

    }
  },
  async update (req, res) {
    try {
        const item = await person.update(req.body, {
            where: {
              id: req.params.id
            }
          });

        return res.json({item});   

    } catch (err) {

      res.status(500).send({
        error: 'um erro ocorreu ao tentar atualizar os dados'
      })

    }
  },
  async delete (req, res) {
    try {
      
      const item = await person.destroy({
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