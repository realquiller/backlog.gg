require('dotenv').config();
const express = require('express');
const path = require('path');
const gamesRouter = require('./routes/games');

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Serve static files from the folder "frontend/build" (after npm run build)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// 2. Connect all /api/games/* routes to the router
app.use('/api/games', gamesRouter);

// 3. For any other requests, serve the index.html file
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});