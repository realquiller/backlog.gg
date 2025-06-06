const fs = require('fs');
const path = require('path');
const gamesPath = path.join(__dirname, '../data/games.json');

function readGames() {
    if (!fs.existsSync(gamesPath)) return [];
    const raw = fs.readFileSync(gamesPath, 'utf8');
    return JSON.parse(raw);
}

function writeGames(games) {
    fs.writeFileSync(gamesPath, JSON.stringify(games, null, 2));
}

async function addGameToBacklog(newGame) {
    const games = readGames();
    if (games.find(g => g.id === newGame.id)) {
        throw new Error('Game already in backlog');
    }
    games.push(newGame);
    writeGames(games);
    return newGame;
}

module.exports = { readGames, writeGames, addGameToBacklog };

