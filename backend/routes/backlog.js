const express = require('express');
const router = express.Router();
const { readGames, addGameToBacklog } = require('../api/backlog');

router.use(express.json());

// GET /api/backlog/
router.get('/', (req, res) => {
    const games = readGames();
    res.json(games);
});

// POST /api/backlog/add
router.post('/add', async (req, res) => {
    try {
        const saved = await addGameToBacklog(req.body);
        res.json({ success: true, game: saved});
    } catch (err) {
        res.status(400).json( { error: err.message });
    }
});

module.exports = router;