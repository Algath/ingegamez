# 🎮 IngéGamez

Site officiel de l'association étudiante IngéGamez - Regroupement ludique pour jeux de société et jeux vidéo.

## 📋 Description du Projet

**IngéGamez** est une association étudiante dédiée aux jeux sous toutes leurs formes. Basée à l'école d'ingénieurs, l'association organise régulièrement :

- 🎲 **Soirées Jeux de Société** : Rencontres hebdomadaires entre étudiants autour de jeux de plateau
- 🎮 **Soirées Gaming** : Sessions de jeux vidéo en groupe selon les envies
- 🎪 **Événements Spéciaux** : Pixel Jam, Pixel LAN et autres événements tout au long de l'année
- 📅 **Actualités** : Blog des dernières actualités et annonces
- 🖼️ **Galerie** : Photos et retours sur les événements
- 📧 **Contact** : Pour rejoindre l'association et poser vos questions

La plateforme web permet à la communauté de :

- 📅 **Actualités** : Blog des dernières nouvelles et mises à jour
- 🎪 **Événements** : Informations détaillées sur Pixel Jam et Pixel LAN
- 🖼️ **Galerie** : Photographies des événements passés
- 🎲 **Jeux** : Catalogue de jeux de société (données importées depuis BoardGameGeek)
- 📧 **Contact** : Formulaire et carte pour communiquer avec l'équipe
- 🔐 **Espace admin** : Gestion des actualités, événements, galerie et jeux
- 📱 **Design Responsive** : Adapté à tous les appareils

## 📁 Structure du Projet

Monorepo : le **front-end** React (Vite) est à la racine, le **back-end** Node/Express dans `server/`.

```
ingegamez/
├── src/                       # Front-end React (Vite)
│   ├── apollo/
│   │   └── client.js          # Client Apollo (GraphQL), envoie le cookie d'auth
│   ├── components/            # Composants réutilisables
│   │   ├── navigation.jsx     # Navigation (liens conditionnels selon l'état/rôle)
│   │   ├── footer.jsx
│   │   ├── PostCard.jsx       # Carte d'actualité
│   │   └── ProtectedRoute.jsx # Protège les routes /admin (rôle admin)
│   ├── pages/                 # Pages publiques
│   │   ├── home.jsx
│   │   ├── actuality.jsx      # Liste des actualités
│   │   ├── PostDetail.jsx     # Détail d'une actualité
│   │   ├── gallery.jsx        # Galerie (par année / catégorie)
│   │   ├── games.jsx          # Jeux de société (API BoardGameGeek)
│   │   ├── contact.jsx        # Contact + carte (Leaflet)
│   │   ├── register.jsx       # Création de compte
│   │   ├── pixel-jam-2026.jsx / pixel-lan-2025.jsx
│   │   └── admin/             # Espace admin (protégé)
│   │       ├── login.jsx
│   │       ├── news.jsx       # CRUD actualités + upload d'images
│   │       ├── events.jsx     # CRUD événements + calendrier (FullCalendar)
│   │       ├── galerie.jsx    # CRUD galerie + upload
│   │       └── games.jsx      # Import de jeux via l'API BGG
│   ├── hooks/                 # Hooks personnalisés (useBreakpoints…)
│   ├── config.js              # Lecture de VITE_API_URL
│   ├── styles/                # Styles globaux
│   └── main.jsx               # Point d'entrée + définition des routes
├── server/                    # Back-end Node/Express + Apollo GraphQL
│   ├── models/                # Schémas Mongoose (Post, Event, GalleryImage, Game, User)
│   ├── schema/
│   │   ├── typeDefs.js        # Schéma GraphQL (types, queries, mutations)
│   │   ├── resolvers.js       # Resolvers
│   │   └── validation.js      # Validation des données (Simple-Schema)
│   ├── middleware/
│   │   ├── auth.js            # signToken / requireAdmin (JWT)
│   │   └── passport.js        # Stratégie passport-jwt (token lu dans le cookie)
│   ├── services/
│   │   └── bgg.js             # Intégration de l'API BoardGameGeek
│   ├── app.js                 # Construit l'app Express + Apollo (createApp)
│   ├── index.js               # Démarrage : Mongo + app + route /upload + listen
│   ├── seed.js                # Insertion de données d'exemple
│   ├── createAdmin.js         # Création d'un compte admin
│   ├── tests/                 # Tests Jest + supertest
│   └── .env.example           # Variables d'environnement attendues
├── .env                       # VITE_API_URL (front, non versionné)
├── package.json
└── vite.config.js
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** version 18+
- **Docker** (pour MongoDB) — ou une instance MongoDB locale

### 1. Back-end (`server/`)

```bash
cd server
npm install
cp .env.example .env          # puis renseigner MONGO_URI, JWT_SECRET (et BGG_TOKEN)
npm run dev                   # démarre MongoDB (Docker) + le serveur
```

Le serveur GraphQL est accessible sur `http://localhost:4000/graphql`.

Première utilisation (optionnel) :

```bash
node seed.js                  # insère quelques actualités d'exemple
node createAdmin.js           # crée un compte admin (identifiants en haut du fichier)
```

### 2. Front-end (racine du projet)

```bash
npm install
echo "VITE_API_URL=http://localhost:4000" > .env   # URL de l'API
npm run dev                   # site sur http://localhost:5173
```

### Commandes Disponibles

| Emplacement | Commande            | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| racine      | `npm run dev`     | Front Vite avec hot reload                       |
| racine      | `npm run build`   | Build de production du front                     |
| racine      | `npm run preview` | Prévisualisation du build                       |
| `server/` | `npm run dev`     | MongoDB (Docker) + serveur avec**nodemon** |
| `server/` | `npm start`       | MongoDB + serveur (sans watch)                   |
| `server/` | `npm test`        | Tests**Jest** + **supertest**        |

## 📦 Dépendances Principales

**Front-end**

- **React** + **React Router** — UI et navigation
- **Vite** — bundler et serveur de développement
- **Apollo Client** + **graphql** — communication GraphQL avec l'API
- **Material-UI**, **Bootstrap**, **Emotion** — composants et styles
- **FullCalendar** — calendrier des événements
- **Leaflet** — carte interactive (page Contact)

**Back-end (`server/`)**

- **Express** + **Apollo Server** (`@as-integrations/express4`) — serveur GraphQL
- **Mongoose** — ODM pour MongoDB
- **passport** + **passport-jwt** — authentification (JWT lu depuis un cookie HttpOnly)
- **jsonwebtoken** + **bcrypt** — signature des tokens & hash des mots de passe
- **cookie-parser** + **cors** — gestion des cookies & CORS
- **multer** — upload de fichiers (images)
- **simpl-schema** — validation des collections
- **xml2js** — parsing des réponses de l'API BoardGameGeek
- **jest**, **supertest**, **mongodb-memory-server** — tests (dev)

## 🎨 Technologies

Application **fullstack JavaScript** :

- **Front-end** : React, Vite, CSS Modules, Apollo Client (GraphQL)
- **Back-end** : Node.js, Express, Apollo Server (GraphQL), MongoDB / Mongoose
- **Authentification** : JWT stocké dans un cookie **HttpOnly**, **passport-jwt**, contrôle de rôle (admin)
- **API externe** : BoardGameGeek (jeux) côté back-end, OpenStreetMap / Leaflet côté front-end
- **Tests** : Jest + supertest (unitaires & intégration)
- **Linting** : ESLint

## 📝 Notes de Développement

- Architecture **fullstack** : front React (Vite) et back Express/Apollo GraphQL séparés, reliés via `VITE_API_URL`.
- Les modules CSS (`.module.css`) évitent les conflits de noms ; chaque page a ses propres styles.
- La navigation est gérée avec React Router ; les routes admin sont protégées par `ProtectedRoute` (front) **et** `requireAdmin` (back).
- L'authentification repose sur un **cookie HttpOnly** (le token n'est jamais exposé au JavaScript) ; le front n'envoie pas de token manuellement (`credentials: 'include'`).
- Les uploads d'images passent par la route `/upload` (multer), réservée aux administrateurs.

## 📄 Licence

Projet étudiant pour l'école d'ingénieurs.

---

## 🗺️ Roadmap — Avancement du projet

Suivi des exigences FSWD 2026.

### Étape 1 — Structure de l'interface utilisateur

- [X] **1.1** Nettoyage du projet
  - [X] Styles par défaut de Vite.js supprimés
  - [X] Titre de la page : *IngéGamEZ - Soirées Jeux Vidéo & Jeux de Société*
  - [X] Icône personnalisée dans l'onglet du navigateur (`favicon.ico`)
- [X] **1.2** Mise en place de l'interface utilisateur
  - [X] Logo affiché (mascotte + nom de l'asso)
  - [X] Menu de navigation clairement identifiable
- [X] **1.3** Affichage sur mobile
  - [X] Interface réactive (Bootstrap)
  - [X] Menu hamburger sur petit écran

### Étape 2 — Navigation

- [X] **2.1** React-Router installé, `<BrowserRouter>` englobe le composant racine
- [X] **2.2** Contenu différent selon l'URL (routes multiples)
- [X] **2.3** Navigation dynamique sans rechargement de page

### Étape 3 — Fonctionnalité

- [X] **3.1** Fonctionnalités principales implémentées (actualités, événements, galerie, contact, pages admin)

### Étape 4 — Express.js

- [X] **4.1** Serveur Express.js créé
  - [X] ES Modules (`"type": "module"`)
  - [X] Redémarrage automatique via **nodemon** *(utilise actuellement `node --watch`)*

### Étape 5 — Connexion client / serveur

- [X] **5.1** Variables d'environnement côté React
  - [X] Fichier `.env` manquant à la racine du projet frontend (`/ingegamez/.env`)
  - [X] Doit contenir `VITE_API_URL` et être accessible via `import.meta.env`
- [X] **5.2** CORS implémenté sur le serveur

### Étape 6 — MongoDB

- [X] **6.1** Connexion à MongoDB
  - [X] URI stockée dans `server/.env`
  - [X] `server/.env` ignoré par git (via `server/.gitignore`)
- [X] **6.2** Logique d'upsert pour éviter les doublons
- [X] **6.3** Collections contrôlées par **Simple-Schema** *(A utiliser avec GraphQL)*

### Étape 7 — Authentification

- [X] **7.1** Création de compte et connexion publique
  - [X] Modèle `User` à compléter : ajouter `email`, `nom`, `prénom`
  - [X] Mutation `register` à créer (email unique insensible à la casse, connexion auto après inscription)
  - [X] Page de login affichée automatiquement si non authentifié
  - [X] Messages d'erreur explicites en cas d'échec
  - [X] Connexion admin fonctionnelle *(mutation `login`, bcrypt, JWT)*
- [X] **7.2** Interface adaptée à l'état de connexion (login minimal vs. app complète)
- [X] **7.3** Déconnexion avec retour automatique à la page de login
- [X] **7.4** Authentification via **passport.js**
  - [X] Toutes les routes qui doivent l'être protégées via passport
- [X] **7.5** Sécurité — token dans un **cookie HttpOnly**

### Étape 8 — GraphQL

- [X] **8.1** ApolloServer initialisé côté serveur
  - [X] Utilisateur authentifié injecté dans le `context` des resolvers
  - [X] **ApolloClient** à initialiser côté React
- [X] **8.2** Données récupérées avec GraphQL côté client
  - [X] Queries retournent `null` / `[]` si non authentifié
- [X] **8.3** Mutations protégées côté serveur (`requireAdmin`)
  - [X] Auteur assigné depuis `context.user`
- [X] **8.4** Pages mises à jour automatiquement (refetch ou cache Apollo)

### Étape 9 — API externe

- [X] **9.1** Back-end : utilise au moins une API externe et stocke les données en base (_en attente du token de BGG_)
- [X] **9.1** Front-end : affiche les données d'une API externe *(OpenStreetMap via Leaflet sur la page Contact)*

### Étape 10 — Tests automatisés

- [X] **10.1** Jest et supertest installés en dépendances de développement
  - [X] `jest.config.js` configuré
  - [X] Script `test` dans `package.json`
- [X] **10.2** Au moins 2 tests unitaires pertinents (tous passants)
- [X] **10.3** Au moins 2 tests d'intégration pertinents (tous passants)
