import { useState } from 'react';

export default function GameCard({ game }) {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        fetch('/api/backlog/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        })
        .then(res => res.json())
        .then(resData => {
            if (resData.success) setSaved(true);
            else console.error(resData.error);
        })
        .catch(err => console.error(err));
    };
    
    return (
        <div style={{ border: '1px solid #ccc', padding: '8px', margin: '8px' }}>
            <h2>{game.name}</h2>
            <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                alt={game.name}
                style={{ maxWidth: '150px', display: 'block', margin: '8px 0' }}
            />
            <p>{game.summary}</p>
            {saved
            ? <button disabled>Saved</button>
            : <button onClick={handleSave}>Save to backlog</button>
            }
        </div>
    )
}