const express = require('express');
const router = express.Router();
// my modules
const { fetchGameTypes } = require('../api/igdb/fetchGameTypes');
const { searchGames } = require('../api/igdb/searchGames');

const desiredTypes = ['Main Game', 'Remaster', 'Remake']; //FIGURE OUT HOW ARE COLLECTIONS CALLED

// GET /api/games/types
router.get('/types', async (req, res) => {
    const typesDict = await fetchGameTypes(desiredTypes);
    if (typesDict) return res.json(typesDict);
    res.status(500).json({ error: 'fetchGameTypes failed'});
});

// GET /api/games/search?q=something
router.get('/search', async (req, res) => {
    const q = req.query.q || '';
    const typesDict = await fetchGameTypes(desiredTypes);
    const games = await searchGames(q, typesDict);
    if (games) return res.json(games);
    res.status(500).json({ error: 'searchGames failed' });
});

module.exports = router;