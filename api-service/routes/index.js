var express = require('express');
var router = express.Router();
var UsersController = require('../src/controllers/UsersController');
var QuotesController = require('../src/controllers/QuotesController');
var HistoryController = require('../src/controllers/HistoryController');
var StatsController = require('../src/controllers/StatsController');
var authUser = require('../src/middlewares/UserMiddleware');
var authAdmin = require('../src/middlewares/AdminMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json');

/* Docs routes */
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

/* User routes */
router.get('/', UsersController.index);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

/* Quotes routes */
router.get('/stock', authUser, QuotesController.quote);

/* History routes */
router.get('/history', authUser, HistoryController.index);

/* Stats routes */
router.get('/stats', [authUser, authAdmin], StatsController.index);

module.exports = router;
