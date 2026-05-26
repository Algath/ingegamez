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
- 🖼️ **Galerie** : Photographies et vidéos des événements passés
- 📧 **Contact** : Formulaire pour communiquer avec l'équipe
- 📱 **Design Responsive** : Adapté à tous les appareils

## 📁 Structure du Projet

```
ingegamez/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── footer.jsx       # Pied de page
│   │   ├── navigation.jsx   # Barre de navigation
│   │   └── PostCard.jsx     # Carte d'actualité
│   ├── pages/               # Pages principales
│   │   ├── home.jsx         # Accueil
│   │   ├── actuality.jsx    # Actualités/Blog
│   │   ├── gallery.jsx      # Galerie
│   │   ├── contact.jsx      # Contact
│   │   ├── pixel-jam.jsx    # Info Pixel Jam
│   │   ├── pixel-jam-2026.jsx # Édition 2026
│   │   ├── pixel-lan-2025.jsx # Édition 2025
│   │   └── PostDetail.jsx   # Détail d'une actualité
│   ├── data/
│   │   └── postsData.js     # Données des actualités
│   ├── assets/              # Images et ressources
│   │   ├── pixel_jam/
│   │   ├── pixel_lan/
│   │   ├── posts/
│   │   └── sponso/
│   ├── styles/              # Feuilles de style globales
│   ├── utils/               # Utilitaires et helpers
│   └── main.jsx             # Point d'entrée
├── public/                  # Fichiers statiques
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** version 18+ 
- **npm** ou **yarn**

### Installation

1. **Cloner ou télécharger le projet**
   ```bash
   cd ingegamez
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   
   Le site sera accessible à `http://localhost:5173`

### Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement avec hot reload |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Permet de prévisualiser le build en local |

## 📦 Dépendances Principales

- **React** - Bibliothèque UI
- **Vite** - Bundler et serveur de développement ultra-rapide
- **React Router** - Navigation entre pages
- **Bootstrap & React Bootstrap** - Framework CSS et composants
- **Material-UI** - Composants d'interface utilisateur
- **Leaflet** - Cartographie interactive
- **Emotion** - CSS-in-JS

## 🎨 Technologies

- Frontend: React 18
- Build: Vite 8
- Styling: CSS Modules + Bootstrap + Material-UI
- Linting: ESLint

## 📝 Notes de Développement

- Les modules CSS sont utilisés pour éviter les conflits de noms
- La navigation est gérée avec React Router
- Les pages sont réutilisables grâce aux composants modulaires
- Chaque page a ses propres styles (fichiers `.module.css`)

## 📄 Licence

Projet étudiant pour l'école d'ingénieurs.

---

## 🗺️ Roadmap — Avancement du projet

Suivi des exigences FSWD 2026.

### Étape 1 — Structure de l'interface utilisateur

- [x] **1.1** Nettoyage du projet
  - [x] Styles par défaut de Vite.js supprimés
  - [x] Titre de la page : *IngéGamEZ - Soirées Jeux Vidéo & Jeux de Société*
  - [x] Icône personnalisée dans l'onglet du navigateur (`favicon.ico`)
- [x] **1.2** Mise en place de l'interface utilisateur
  - [x] Logo affiché (mascotte + nom de l'asso)
  - [x] Menu de navigation clairement identifiable
- [x] **1.3** Affichage sur mobile
  - [x] Interface réactive (Bootstrap)
  - [x] Menu hamburger sur petit écran

### Étape 2 — Navigation

- [x] **2.1** React-Router installé, `<BrowserRouter>` englobe le composant racine
- [x] **2.2** Contenu différent selon l'URL (routes multiples)
- [x] **2.3** Navigation dynamique sans rechargement de page

### Étape 3 — Fonctionnalité

- [x] **3.1** Fonctionnalités principales implémentées (actualités, événements, galerie, contact, pages admin)

### Étape 4 — Express.js

- [x] **4.1** Serveur Express.js créé
  - [x] ES Modules (`"type": "module"`)
  - [ ] Redémarrage automatique via **nodemon** *(utilise actuellement `node --watch`)*

### Étape 5 — Connexion client / serveur

- [ ] **5.1** Variables d'environnement côté React
  - [x] Fichier `.env` manquant à la racine du projet frontend (`/ingegamez/.env`)
  - [ ] Doit contenir `VITE_API_URL` et être accessible via `import.meta.env`
- [x] **5.2** CORS implémenté sur le serveur

### Étape 6 — MongoDB

- [x] **6.1** Connexion à MongoDB
  - [x] URI stockée dans `server/.env`
  - [x] `server/.env` ignoré par git (via `server/.gitignore`)
- [x] **6.2** Logique d'upsert pour éviter les doublons *(le seed actuel fait `deleteMany` + `insertMany` — à remplacer par `findOneAndUpdate` avec `upsert: true`)*
- [ ] **6.3** Collections contrôlées par **Simple-Schema** *(A utiliser avec GraphQL)*

### Étape 7 — Authentification

- [ ] **7.1** Création de compte et connexion publique
  - [x] Modèle `User` à compléter : ajouter `email`, `nom`, `prénom` *(actuellement uniquement `username`)*
  - [ ] Mutation `register` à créer (email unique insensible à la casse, connexion auto après inscription)
  - [ ] Page de login affichée automatiquement si non authentifié
  - [x] Messages d'erreur explicites en cas d'échec
  - [x] Connexion admin fonctionnelle *(mutation `login`, bcrypt, JWT)*
- [ ] **7.2** Interface adaptée à l'état de connexion (login minimal vs. app complète)
- [ ] **7.3** Déconnexion avec retour automatique à la page de login
- [ ] **7.4** Authentification via **passport.js** *(JWT custom direct actuellement — passport non installé)*
  - [ ] Toutes les routes qui doivent l'être protégées via passport
- [ ] **7.5** Sécurité — token dans un **cookie HttpOnly** *(actuellement retourné dans le payload GraphQL et stocké manuellement)*

### Étape 8 — GraphQL

- [x] **8.1** ApolloServer initialisé côté serveur
  - [x] Utilisateur authentifié injecté dans le `context` des resolvers
  - [ ] **ApolloClient** à initialiser côté React *(non installé)*
- [ ] **8.2** Données récupérées avec GraphQL côté client
  - [ ] Queries retournent `null` / `[]` si non authentifié
- [x] **8.3** Mutations protégées côté serveur (`requireAdmin`)
  - [x] Auteur assigné depuis `context.user` (pas passé en argument)
- [ ] **8.4** Pages mises à jour automatiquement (refetch ou cache Apollo)

### Étape 9 — API externe

- [ ] **9.1** Back-end : utilise au moins une API externe et stocke les données en base
- [x] **9.1** Front-end : affiche les données d'une API externe *(OpenStreetMap via Leaflet sur la page Contact)*

### Étape 10 — Tests automatisés

- [ ] **10.1** Jest et supertest installés en dépendances de développement
  - [ ] `jest.config.js` configuré
  - [ ] Script `test` dans `package.json`
- [ ] **10.2** Au moins 2 tests unitaires pertinents (tous passants)
- [ ] **10.3** Au moins 2 tests d'intégration pertinents (tous passants)
