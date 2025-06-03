import GameCard from './components/GameCard';

function App() {
  const sampleGames = [
  {
    id: 42982,
    name: 'Dark Souls: Limited Edition',
    summary: 'Dark Souls: Limited Edition…', 
    cover: 185581,
    platforms: [9, 12],
    screenshots: [918590, 1365972],
    game_type: 0
  },
  {
    id: 12345,
    name: 'Hollow Knight',
    summary: 'Hollow Knight je metroidvania…',
    cover: 543210,
    platforms: [6, 10],
    screenshots: [111111, 222222],
    game_type: 0
  }
  ];

  return (
    <div>
      {sampleGames.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
      </div>
  );
}

export default App;
