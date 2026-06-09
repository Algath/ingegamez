import Navigation from '../components/navigation';
import Footer from '../components/footer';
import styles from './games.module.css';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_GAMES = gql`
    query GetGames {
        games {
            id
            name
            yearPublished
            image
            minPlayers
            maxPlayers
            playingTime
            rating
        }
    }
`;

function Games() {
    const { loading, error, data } = useQuery(GET_GAMES);
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error.message}</p>;
    const games = data.games;

    return (
        <div className={styles.container}>
            <header>
                <Navigation />
            </header>
            <main className={styles.main}>  
                <h1>Jeux de société</h1>
                <div className={styles.gamesGrid}>
                    {games.map(game => (
                        <div key={game.id} className={styles.gameCard}>
                            <img src={game.image} alt={game.name} className={styles.gameImage} />
                            <h2>{game.name} ({game.yearPublished})</h2>
                            <p>Joueurs: {game.minPlayers}-{game.maxPlayers}</p>
                            <p>Durée: {game.playingTime} min</p>
                            <p>Note: {game.rating.toFixed(1)}/10</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Games;