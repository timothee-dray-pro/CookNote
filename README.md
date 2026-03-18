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
- Création de recettes
- Modification de recettes
- Suppression de recettes
- Gestion dynamique des ingrédients
- Gestion dynamique des étapes
- Organisation des éléments par drag and drop
- Recherche en temps réel
- Filtrage des recettes
- Interface responsive

## Objectifs du projet

CookNote a été conçu comme un projet full-stack de portfolio avec plusieurs objectifs :
- Concevoir une application complète de A à Z
- Travailler la communication entre un frontend et un backend
- Mettre en place une base de données pour stocker les recettes utilisateurs
- Développer une interface agréable et simple à utiliser
- Approfondir la gestion d’état côté client
- Structurer un projet web réaliste et évolutif

## Structure du projet

```
CookNote/
├── backend/
├── frontend/
└── README.md
```

## Installation

1. Cloner le projet

```
git clone https://github.com/votre-pseudo/cooknote.git
cd cooknote
```

2. Installer et lancer le backend

```
cd backend
npm install
npm run dev
```

3. Configurer le backend  
Créer un fichier `.env` dans `backend` avec :

```
CONNECTION_STRING=your_mongodb_connection_string
PORT=3000
```

4. Installer et lancer le frontend

```
cd frontend
npm install
npm run dev
```

5. Configurer le frontend  
Créer un fichier `.env.local` dans `frontend` avec :

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Utilisation

Une fois le projet lancé, l’utilisateur peut :
- Se connecter ou s’authentifier
- Ajouter une nouvelle recette
- Renseigner les ingrédients, quantités et unités
- Ajouter les étapes de préparation
- Modifier ou supprimer une recette existante
- Rechercher rapidement une recette dans la liste disponible
- Filtrer les recettes selon différents critères

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