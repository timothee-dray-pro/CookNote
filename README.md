# CookNote

CookNote est une application web permettant de créer, organiser et consulter des recettes de cuisine. Elle offre une expérience fluide avec gestion des ingrédients, étapes détaillées, système de tags et interface moderne.

## Aperçu

CookNote permet aux utilisateurs de :
- Créer leurs propres recettes
- Ajouter des ingrédients avec quantités et unités
- Détailler les étapes de préparation
- Rechercher et filtrer des recettes par titre ou par tags
- Organiser leurs recettes personnelles dans une interface claire et intuitive

## Stack technique

### Frontend
- React
- Next.js
- Redux
- CSS Modules

### Backend
- Node.js
- Express

### Base de données
- MongoDB Atlas

## Fonctionnalités

- Authentification utilisateur par token
- Création, modification et suppression de recettes
- Gestion dynamique des ingrédients
- Gestion dynamique des étapes
- Organisation des éléments par drag and drop
- Recherche en temps réel
- Filtrage des recettes
- Interface responsive

## Objectifs du projet

CookNote a été conçu comme un projet full-stack de portfolio avec plusieurs objectifs :
- Concevoir une application complète de A à Z
- Mettre en place une communication entre frontend et backend
- Structurer une base de données pour stocker les recettes utilisateurs
- Développer une interface claire et agréable à utiliser
- Approfondir la gestion d’état côté client
- Concevoir un projet web réaliste et évolutif

## Structure du projet

```
CookNote/
├── backend/
├── frontend/desktop/
└── README.md
```

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/timothee-dray-pro/CookNote.git
cd CookNote
```

### 2. Installer et lancer le backend

```bash
cd backend
yarn install
yarn start
```

### 3. Configurer le backend

Créer un fichier `.env` dans le dossier `backend` :

```env
CONNECTION_STRING=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_connection_string
```

### 4. Installer et lancer le frontend

```bash
cd frontend/desktop
yarn install
yarn dev
```

### 5. Configurer le frontend

Créer un fichier `.env.local` dans le dossier `frontend/desktop` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Utilisation

Une fois le projet lancé, l’utilisateur peut :
- Se connecter
- Ajouter une recette
- Gérer les ingrédients et les étapes
- Modifier ou supprimer une recette
- Rechercher et filtrer des recettes

## Points travaillés

- Développement d’une application full-stack
- Création d’API REST avec Express
- Gestion d’une base de données MongoDB
- Gestion du state avec Redux
- Mise en place d’un système d’authentification
- Création de composants réutilisables
- Travail sur l’expérience utilisateur et le responsive design

## Auteur

Timothée Dray

Projet réalisé dans le cadre d’un portfolio personnel.