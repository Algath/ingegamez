import React, { useState } from 'react';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import styles from './games.module.css';
import { gql } from '@apollo/client';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client/react';
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
const SEARCH_GAMES = gql`
    query SearchGames($name: String!) {
        searchGames(name: $name) {
            bggId
            name
            yearPublished
            thumbnail
        }
    }
`;
const IMPORT_GAME_BY_ID = gql`
    mutation ImportGameById($bggId: String!) {
        importGameById(bggId: $bggId) {
            id
            name
        }
    }
`;
const DELETE_GAME = gql`
    mutation DeleteGame($id: ID!) {
        deleteGame(id: $id)
    }
`;

function Games() {
    const { data } = useQuery(GET_GAMES);
    const games = data?.games ?? [];

    const [name, setName] = useState('');
    const [search, { data: searchData, loading: searching, error: searchError }] =
        useLazyQuery(SEARCH_GAMES, { fetchPolicy: 'network-only' });
    const results = searchData?.searchGames ?? [];

    const [importGameById, { loading: importing, error: importError }] = useMutation(IMPORT_GAME_BY_ID, {
        refetchQueries: [{ query: GET_GAMES }],
    });
    const [importedId, setImportedId] = useState(null);

    const [deleteGame] = useMutation(DELETE_GAME, {
        refetchQueries: [{ query: GET_GAMES }],
    });

    async function handleDelete(id) {
        if (!window.confirm('Supprimer ce jeu ?')) return;
        try {
            await deleteGame({ variables: { id } });
        } catch (err) {
            console.error(err);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        if (!name.trim()) return;
        search({ variables: { name } });
    }

    async function handleImport(bggId) {
        try {
            await importGameById({ variables: { bggId } });
            setImportedId(bggId);
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
                    <div className={styles.searchBox}>
                        <form onSubmit={handleSearch} className={styles.importForm}>
                            <input
                                type="text"
                                placeholder="Rechercher un jeu sur BGG"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.input}
                            />
                            <button type="submit" disabled={searching} className={styles.button}>
                                {searching ? 'Recherche…' : 'Rechercher'}
                            </button>
                        </form>

                        {results.length > 0 && (
                            <ul className={styles.searchResults}>
                                {results.map((r) => (
                                    <li key={r.bggId} className={styles.searchItem}>
                                        {r.thumbnail ? (
                                            <img src={r.thumbnail} alt="" className={styles.searchThumb} />
                                        ) : (
                                            <span className={styles.searchThumbPlaceholder} />
                                        )}
                                        <span className={styles.searchName}>
                                            {r.name}{r.yearPublished ? ` (${r.yearPublished})` : ''}
                                        </span>
                                        <button
                                            onClick={() => handleImport(r.bggId)}
                                            disabled={importing}
                                            className={styles.button}
                                        >
                                            {importedId === r.bggId ? '✓ Importé' : 'Importer'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {searchError && <p>Erreur de recherche : {searchError.message}</p>}
                    {importError && <p>Erreur d'import : {importError.message}</p>}
                    {searchData && results.length === 0 && !searching && <p>Aucun résultat trouvé.</p>}
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
                                    <button
                                        onClick={() => handleDelete(game.id)}
                                        className={styles.deleteButton}
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Games;
