// Initialize express router
const router = require('express').Router();

// Passport
const passport = require('passport');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 200,
        message: 'Endpoint for all APIs',
    });
});

// Import Player controller
const player = require('./controllers/player');

// Player routes
router.route('/player')
    .get(player.index)
    .post(authenticate, player.new);

router.route('/player/score')
    .get(player.scores);

router.route('/player/:player_id')
    .get(player.view)
    .put(authenticate, player.update);


// Import Task controller
const task = require('./controllers/task');

// Task routes
router.route('/task')
    .get(task.index)
    .post(authenticate, task.new);

router.route('/task/:task_id')
    .get(task.view)
    .put(authenticate, task.update);


// Import Medal controller
const medal = require('./controllers/medal');

// Medal routes
router.route('/medal')
    .get(medal.index)
    .post(authenticate, medal.new);

router.route('/medal/:medal_id')
    .get(medal.view)
    .put(authenticate, medal.update);


// Import Score Controller
const score = require('./controllers/score');

// Score routes
router.route('/score')
    .get(score.index)
    .post(authenticate, score.new);

router.route('/score/:score_id')
    .get(score.view)
    .put(authenticate, score.update)
    .delete(authenticate, score.delete);

// Import User Controller
const user = require('./controllers/user');

// User Routes
router.route('/user/register')
    .post(authenticate, user.register);

router.route('/user/authenticate')
    .post(user.authenticate);

router.route('/user/profile')
    .get(
        authenticate,
        user.profile
    );

function authenticate(req, res, next) {
    passport.authenticate('jwt', { session: false })(req, res, next);
}

// Export API routes
module.exports = router;
