export default function GameCard({ game }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '8px', margin: '8px' }}>
            <h2>{game.name}</h2>
            <p>{game.summary}</p>
        </div>
    )
}