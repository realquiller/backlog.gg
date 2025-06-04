import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [q, setQ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSearch(q);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search your game..."
            />
            <button type="submit">Search</button>
        </form>
    );
}