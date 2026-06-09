import React, {useState} from 'react';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import styles from './games.module.css';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { Link } from 'react-router-dom';

const GET_GAMES = gql`
    query GetGames {
        games {
            id
            bggId
            name
            yearPublished
            thumbnail
            minPlayers
            maxPlayers
            rating
        }
    }
`;
const IMPORT_GAME = gql`
    mutation ImportGame($name: String!) {
        importGame(name: $name) {
            id
            name
        }
    }
`;

function Games() {
    const {data} = useQuery(GET_GAMES);
    const games = data?.games ?? [];
    const [importGame, {loading, error}] = useMutation(IMPORT_GAME, {
        refetchQueries: [{ query: GET_GAMES}],
    });
    const [name, setName] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await importGame({ variables: { name } });
            setName('');
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.container}>
            <header>
                <Navigation />
            </header>
            <main className={styles.main}>
                <Link to="/admin" className={styles.backButton}>← Retour au pannel admin</Link>
                <section className={styles.importSection}>
                    <h1>Jeux de société</h1>
                    <form onSubmit={handleSubmit} className={styles.importForm}>
                        <input
                            type="text"
                            placeholder="Nom du jeu à importer depuis BGG"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" disabled={loading} className={styles.button}>
                            {loading ? 'Import en cours...' : 'Importer'}
                        </button>
                    </form>
                    {error && <p>Erreur lors de l'importation: {error.message}</p>}
                </section>
                <section className={styles.gamesSection}>
                    <h2>Jeux importés</h2>
                    {games.length === 0 ? (
                        <p>Aucun jeu importé pour le moment.</p>
                    ) : (
                        <ul className={styles.gameList}>
                            {games.map((game) => (
                                <li key={game.id} className={styles.gameItem}>
                                    <img src={game.thumbnail} alt={game.name} className={styles.gameThumbnail} />
                                    <div className={styles.gameInfo}>
                                        <h3>{game.name} ({game.yearPublished})</h3>
                                        <p>Joueurs: {game.minPlayers}-{game.maxPlayers}</p>
                                        <p>Note: {game.rating}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
            <Footer />
        </div>
                
    )
}

export default Games;