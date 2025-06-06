import { useState } from 'react'; 
import GameCard from './components/GameCard';
import SearchBar from './components/SearchBar';

function App() {
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
      <SearchBar onSearch={handleSearch} />
      <div>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default App;
