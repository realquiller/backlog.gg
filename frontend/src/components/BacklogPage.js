import React, { useState, useEffect } from 'react';
import BacklogItem from './BacklogItem';

export default function BacklogPage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('api/backlog')
            .then(r => r.json())
            .then(setGames)
            .catch(console.error);
    }, []);

    return (
        <main style={{ padding: '16px' }}>
            {games.length === 0 && <p>No games in backlog.</p>}
            {games.map(game => (
                <BacklogItem key={game.id} game={game} />
            ))}
        </main>
    );
}