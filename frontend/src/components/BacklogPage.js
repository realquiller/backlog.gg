import React, { useState, useEffect } from 'react';

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
                <div
                    key={game.id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px',
                        marginBottom: '12px'
                    }}
                >
                    <h2>{game.name}</h2>
                    <img
                        src={'https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg'}
                        alt={game.name}
                        style={{ maxWidth: '150px', display: 'block', marginBottom: '8px' }}
                    />
                    <textarea
                        placeholder="Add notes..."
                        style={{ width: '100%', minHeight: '60px' }}
                        // later add a hook for sending the note
                    />
                    {/* Button for sending the note */}
                </div>
            ))}
        </main>
    );
}