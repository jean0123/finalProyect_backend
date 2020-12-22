const routerx = require('express-promise-router');
//const categoriaRouter = require('./articulo');
const usuarioRouter = require('./usuario.js');
const categoriaRouter = require('./categoria.js');
const articuloRouter = require('./articulo');



const router = routerx();

router.use('/usuario', usuarioRouter);
//.com/api/usuario

router.use('/categoria', categoriaRouter);
//.com/api/categoria

router.use('/articulo', articuloRouter);
//.com/api/articulo

module.exports = router;