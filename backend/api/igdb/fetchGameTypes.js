require('dotenv').config();
const { fetchValidToken } = require('../../auth/fetchValidTwitchToken');

/**
 * Fetches game types from IGDB and returns a dictionary of {type: id}
 * filtered by the provided desiredTypes array.
 *
 * @param {string[]} desiredTypes - Array of game type strings you want (e.g., ['Main Game', 'Remaster'])
 * @returns {Promise<object>} - Dictionary of matching type → id pairs
 */


async function fetchGameTypes(desiredTypes = []) {
    try {
        const tokenObj = await fetchValidToken();
        const accessToken = tokenObj.access_token;
        const resp = await fetch('https://api.igdb.com/v4/game_types', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization':`${tokenObj.token_type} ${accessToken}`,
            },
            body: `
                fields type;
                limit 50;
            `.trim()
        });
        const data = await resp.json();

        const gameTypesDict = {};
        for (const item of data) {
            if (desiredTypes.includes(item.type)) {
                gameTypesDict[item.type] = item.id;
            }
        }

        return gameTypesDict;
    } catch (err) {
        console.error("Error when fetching game types:", err);
        return null;
    }
}

module.exports = { fetchGameTypes };