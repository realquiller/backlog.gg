const { fetchValidToken } = require('../../auth/fetchValidTwitchToken');

async function fetchGamesById() {
    try {
        const tokenObj = await fetchValidToken();
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
        return data["type"];


    } catch (err) {
        console.error("Error when fetching fetchGamesById:", err);
        return null;
    }
}

module.exports = { fetchGamesById };
