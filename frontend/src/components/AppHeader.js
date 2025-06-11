import React from 'react';

export default function AppHeader({ onNavigate }) {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderBottom: '1px solid #ddd'
        }}>
            <button
                onClick={() => onNavigate('backlog')}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                }}
                aria-label="Go to backlog"
            >
                🏠
            </button>
            <h1 style={{ margin: '0 0 0 8px' }}>Backlog.gg</h1>
        </header>
    );
}