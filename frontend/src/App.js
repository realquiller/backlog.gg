import { useState } from 'react';
import AppHeader from './components/AppHeader';
import SearchBar from './components/SearchBar';
import GameCard from './components/GameCard';
import BacklogPage from './components/BacklogPage';


function App() {
  const [view, setView] = useState('search'); // 'search' or 'backlog'
  const [games, setGames] = useState([]);

  const handleSearch = (q) => {
    console.log('Searching for', q);
      fetch(`/api/games/search?q=${encodeURIComponent(q)}`)
        .then(res => res.json())
        .then(data => setGames(data))
        .catch(err => console.error(err));
  };

  return (
    <div>
      <AppHeader onNavigate={setView} />

      {view === 'backlog' && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
        }}>
          <SearchBar onSearch={q => {
            setView('search'); // switch to search view
            handleSearch(q); // execute fetch
          }} />
        </div>
      )}

      {view === 'search' && (
        <>
          <SearchBar onSearch={handleSearch} />
          <div>
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </>
      )}

      {view === 'backlog' && <BacklogPage />}
    </div>
  );
}

export default App;
