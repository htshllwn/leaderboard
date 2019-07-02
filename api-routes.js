// Initialize express router
const router = require('express').Router();

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
    .post(player.new);

router.route('/player/score')
    .get(player.scores);

router.route('/player/:player_id')
    .get(player.view)
    .put(player.update);


// Import Task controller
const task = require('./controllers/task');

// Task routes
router.route('/task')
    .get(task.index)
    .post(task.new);

router.route('/task/:task_id')
    .get(task.view)
    .put(task.update);


// Import Medal controller
const medal = require('./controllers/medal');

// Medal routes
router.route('/medal')
    .get(medal.index)
    .post(medal.new);

router.route('/medal/:medal_id')
    .get(medal.view)
    .put(medal.update);


// Import Score Controller
const score = require('./controllers/score');

// Score routes
router.route('/score')
    .get(score.index)
    .post(score.new);

router.route('/score/:score_id')
    .get(score.view)
    .put(score.update)
    .delete(score.delete);

// Export API routes
module.exports = router;
