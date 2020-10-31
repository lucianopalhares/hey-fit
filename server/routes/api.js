var jwt = require('jsonwebtoken');
const express = require('express');
const routes = express();

//controllers
const personController = require('../controllers/personController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

// rotas 
routes.get('/pessoas', verifyJWT, personController.index);
routes.get('/pessoa/:id', verifyJWT, personController.show);
routes.post('/pessoa', verifyJWT, personController.store);
routes.put('/pessoa/:id', verifyJWT, personController.update);
routes.delete('/pessoa/:id', verifyJWT, personController.delete);
routes.post('/filtra-pessoas', verifyJWT, personController.index);

routes.get('/usuarios', verifyJWT, userController.index);
routes.get('/usuario/:id', verifyJWT, userController.show);
routes.post('/usuario', verifyJWT, userController.store);
routes.put('/usuario/:id', verifyJWT, userController.update);
routes.delete('/usuario/:id', verifyJWT, userController.delete);
routes.post('/filtra-usuarios', verifyJWT, userController.index);

routes.post('/login', loginController.login);
routes.get('/logout', loginController.logout);
routes.get('/user', verifyJWT, loginController.user);

function verifyJWT(req, res, next){
    var token = req.headers['authorization'];
    if (!token) {
      console.log('nenhum token fornecido');
      return res.status(401).json({ auth: false, message: 'Nenhum token foi fornecido .' });
    }
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        console.log('Erro ao autenticar token.');
        return res.status(500).json({ auth: false, message: 'Erro ao autenticar token.' });
      }
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id; 
      next();
    });
}

module.exports = routes;