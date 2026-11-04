# MotoPedia

PWA mobile-first en français, avec React 19, Vite, Tailwind CSS 4, IndexedDB (`idb`), Fuse.js et Workbox via `vite-plugin-pwa`.

## Développement

```sh
npm install
npm run dev
npm run build
```

Le build statique se trouve dans `dist`. Servir en HTTPS pour l’installation et le service worker (localhost fonctionne pour le développement). Le service worker est généré uniquement pour le build de production.

## Données et extension

`public/motos.json` contient 15 modèles. Chaque entrée possède un identifiant stable, marque, modèle, production, pays, catégorie, description, spécifications indicatives et image. Remplacer ce fichier ou l’appel `fetch` dans `src/main.jsx` par une API paginée pour un grand catalogue. Pour plusieurs milliers d’entrées, déplacer les filtres et la recherche côté API et charger les pages avec le même IntersectionObserver. Les collections référencent les identifiants stables.

IndexedDB conserve les collections et les 20 dernières consultations. Workbox précache l’interface et le catalogue ; les images locales optimisées sont distribuées en trois tailles. Les images distantes de secours sont mises en cache à la consultation. Les favoris restent propres à l’appareil ; pas de synchronisation serveur.

## Vérification

La compilation produit le manifest, les icônes PNG 192/512 et le service worker. Vérifier installation, offline et Lighthouse sur le build de production en HTTPS ; aucun score Lighthouse n’est annoncé sans mesure. Les spécifications sont indicatives et varient selon millésime et marché.

## Photos

Les photographies Wikimedia Commons sont accompagnées de leur page source dans le catalogue. Les éventuelles photos d’ambiance sont explicitement identifiées. Consulter les pages des fichiers pour les crédits et les licences.
