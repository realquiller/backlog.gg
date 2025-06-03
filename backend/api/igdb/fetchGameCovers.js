require('dotenv').config();
const { fetchValidToken } = require('../../auth/fetchValidTwitchToken');


async function fetchGameCovers(coverIDs) {
    try {
        const tokenObj = await fetchValidToken();
        const accessToken = tokenObj.access_token;
        const resp = await fetch('https://api.igdb.com/v4/covers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': process.env.CLIENT_ID,
                'Authorization':`${tokenObj.token_type} ${accessToken}`,
                'Content-Type': 'text/plain',
            },
            body: `
                fields id, image_id;
                where id = (${coverIDs.join(',')});
                limit ${coverIDs.length};
            `.trim()
        });
        const data = await resp.json();

        return data;
    } catch (err) {
        console.error("Error when fetching game types:", err);
        return null;
    }
}

module.exports = { fetchGameCovers };