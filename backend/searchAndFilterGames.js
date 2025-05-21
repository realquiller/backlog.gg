const { getValidToken } = require('./fetchToken');
const { searchGames } = require('./searchGames');

async function searchAndFilterGames(searchQuery) {
    try {
        const searched_games = await searchGames(searchQuery);
        const tokenObj = await getValidToken();
        const accessToken = tokenObj.access_token;

        const resp = await fetch('https://api.igdb.com/v4/game_types', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': `${tokenObj.token_type} ${accessToken}`,
                'Content-Type': 'text/plain'
            },
            body: 'fields type; limit 50;'
        });

        const data = await resp.json();
        console.log(data);


    } catch (err) {
        console.error("Error when fetching fetchGamesById:", err);
        return null;
    }
}