require('dotenv').config();
const { fetchValidToken } = require('../../auth/fetchValidTwitchToken');


async function searchGames(querySearch) {
    try {
        const tokenObj = await fetchValidToken();
        const accessToken = tokenObj.access_token;
        const resp = await fetch('https://api.igdb.com/v4/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization':`${tokenObj.token_type} ${accessToken}`,
            },
            body: `
                search "${querySearch}";
                fields name, game;
                limit 100;
            `.trim()
        });
        const data = await resp.json();
        return data;
    } catch (err) {
        console.error("Error when fetching searchGames:", err);
        return null;
    }
}

module.exports = { searchGames };