require("dotenv-safe").config();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const { user } = require('../models');

module.exports = {
  async login (req, res) {
    try {      
      
      const findUser = await user.findOne({ where: {email: req.body.email}});
      
      if (!findUser) return res.status(500).send('Email ou senha incorretos!')
      
      const validPassword = await bcrypt.compare(req.body.password, findUser.password);
      
      if (!validPassword) return res.status(500).send('Email ou senha incorretos!')

      //auth ok
      const id = findUser.id; 
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "365d" 
      });
      
      return res.json({ auth: true, token: token, user: findUser });

    } catch (err) {

      res.status(500).send('um erro ocorreu ao tentar buscar os dados')

    }
  },
  async logout (req, res) {
    try {
      
      res.json({ auth: false, token: null });

    } catch (err) {

      res.status(500).send('erro inesperado')

    }
  },  

  async user (req, res) {
    try {

      let userId;

      var token = req.headers['authorization'];

      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        
        userId = decoded.id;       

      });

      const findUser = await user.findByPk(userId);

      res.json({data:findUser});
      
    } catch (err) {

      res.status(500).send('erro inesperado')

    }
  }, 
}
