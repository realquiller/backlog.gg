require('dotenv').config();
const fs = require('fs');
const path = require('path');

const tokenFile = path.join(__dirname, './igdb/token.json');

async function getToken() {
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
        console.error("Fetch error:", err);
        return null;
    }
}

async function getValidToken() {
    try {
        if (fs.existsSync(tokenFile)) {
            try {
                const raw = fs.readFileSync(tokenFile, 'utf8');
                token = JSON.parse(raw);
            }   catch (err) {
                console.warn("Failed to parse token file. Fetching a new one...");
                return await getToken();
            }

            if (token && token.expires_at > Date.now()) {
                return token;
            }

            console.log('Token expired. Fetching a new one...');
        } else {
            console.log('Token file not found. Fetching a new one...');
        }

        return await getToken();
        } catch (err) {
            console.error("token loading error:", err);
            return await getToken();
        }
    }

module.exports = { getToken, getValidToken };


