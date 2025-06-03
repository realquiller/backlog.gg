const { fetchGameTypes } = require('./api/igdb/fetchGameTypes');
const { searchGames } = require('./api/igdb/searchGames');

game_types = ['Main Game', 'Remaster', 'Remake'];


(async () => {
  try {
    const result = await fetchGameTypes(game_types);
    console.log(result);
    const games = await searchGames('dark souls', result);
    console.log(games);
  } catch (err) {
    console.error("Error:", err);
  }
})();

// console.log(searchGames('halo'));