require('dotenv').config();

fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'grant_type': 'client_credentials'
    })
})
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.error("Fetch error:", err));



