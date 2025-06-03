require('dotenv').config();
const { fetchValidToken } = require('../../auth/fetchValidTwitchToken');


async function searchGames(querySearch, gameTypeDict = {}) {
    try {
        const tokenObj = await fetchValidToken();
        const accessToken = tokenObj.access_token;
        const selectedTypeIds = Object.values(gameTypeDict);
        const whereClause = selectedTypeIds.length > 0
            ? `where game_type = (${selectedTypeIds.join(',')});`
            : '';
        
        const resp = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization':`${tokenObj.token_type} ${accessToken}`,
                'Content-Type': 'text/plain',
            },
            body: `
                search "${querySearch}";
                fields name, game_type, summary, screenshots, platforms, cover;
                ${whereClause}
                limit 10;
            `.trim()
        });
        const games = await resp.json();
        return games;
    } catch (err) {
        console.error("Error when fetching games:", err);
        return null;
    }
}

module.exports = { searchGames };