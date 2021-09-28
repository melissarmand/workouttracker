const router = require("express").Router();

const apiRoutes = require('./api.js');
const homeRoutes = require('./htmlroutes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;