import React, { useState, useEffect } from 'react';

export default function BacklogItem({ game }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(`api/notes?gameId=${game.id}`)
        .then(r => r.json())
        .then(setNotes)
        .catch(console.error);
    }, [game.id]);

    const lastNote = notes.length
        ? notes[notes.length - 1].text
        : 'No notes yet';

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            marginBottom: '12px'
        }}>
            <h2>{game.name}</h2>
            <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                alt={game.name}
                style={{ maxWidth: '150px', display: 'block', margin: '8px 0' }}
            />
            <p style={{ fontStyle: 'italic' , color: '#555' }}>
                {lastNote}
            </p>
            
        </div>
    )
}