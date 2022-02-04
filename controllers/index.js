const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./api/comment-routes');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;

// this file will collect the packaged api routes. 
// Much like the API folder's index.js file that collects the endpoints and prefixes them, here we are collecting the packaged group of API endpoints and prefixing them with the path /api.