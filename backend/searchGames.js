require('dotenv').config();
const { getValidToken } = require('./fetchToken');


async function searchGames(querySearch) {
    try {
        const tokenObj = await getValidToken();
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

(async () => {
    const results = await searchGames("Dark Souls");
    console.log(results);
})();

module.exports = { searchGames };