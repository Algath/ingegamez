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
