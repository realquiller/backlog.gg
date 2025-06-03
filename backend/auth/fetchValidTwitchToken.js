require('dotenv').config();
const fs = require('fs');
const path = require('path');
const tokenFile = path.join(__dirname, '../cache/token.json');

async function fetchToken() {
    try {
        const resp = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.CLIENT_SECRET,
                'grant_type': 'client_credentials'
            })
        });

        const data = await resp.json();

        const token = {
            access_token: data.access_token,
            expires_at: Date.now() + data.expires_in * 1000,
            token_type: data.token_type
        };

        fs.writeFileSync(tokenFile, JSON.stringify(token, null, 2));
        return token;
    } catch (err) {
        console.error("Error fetching new token:", err);
        return null;
    }
}

async function fetchValidToken() {
    try {
        if (fs.existsSync(tokenFile)) {
            const raw = fs.readFileSync(tokenFile, 'utf8');
            const token = JSON.parse(raw);

            if (token.expires_at > Date.now()) {
                return token;
            }

            console.log("Token expired. Fetching a new one...");
        } else {
            console.log("Token file not found. Fetching a new one...");
        }
    } catch (err) {
        console.warn("Token read/parse error. Fetching a new one...");
    }

    return await fetchToken();
}

module.exports = { fetchValidToken };


