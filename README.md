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

`public/motos.json` contient 17 modèles. Chaque entrée possède un identifiant stable, marque, modèle, production, pays, catégorie, description, spécifications indicatives et image. Remplacer ce fichier ou l’appel `fetch` dans `src/main.jsx` par une API paginée pour un grand catalogue. Pour plusieurs milliers d’entrées, déplacer les filtres et la recherche côté API et charger les pages avec le même IntersectionObserver. Les collections référencent les identifiants stables.

IndexedDB conserve les collections et les 20 dernières consultations. Workbox précache l’interface et le catalogue ; les images locales optimisées sont distribuées en trois tailles et mises en cache à la consultation. Un visuel de secours local remplace les photos absentes ou non validées. Les favoris restent propres à l’appareil ; pas de synchronisation serveur.

## Vérification

La compilation produit le manifest, les icônes PNG 192/512 et le service worker. Vérifier installation, offline et Lighthouse sur le build de production en HTTPS ; aucun score Lighthouse n’est annoncé sans mesure. Les spécifications sont indicatives et varient selon millésime et marché.

## Photos

Les photographies Wikimedia Commons sont accompagnées de leur page source dans le catalogue. Les éventuelles photos d’ambiance sont explicitement identifiées. Consulter les pages des fichiers pour les crédits et les licences.

## Sources et validation photo

Commons est la source principale des photographies ; Wikipédia est uniquement une référence documentaire complémentaire. L’import n’est jamais exécuté à l’ouverture de la PWA.

- `data/models.json` : identifiants stables, données des motos, références Wikipédia et requêtes multilingues/variantes.
- `scripts/commons_sync.py --search` : recherche Commons avec `generator=search`, namespace 6, puis `prop=imageinfo`, `iiprop=url|size|mime|extmetadata` et `iiurlwidth=800`. Les résultats sont classés par correspondance textuelle et résolution ; ce score ne valide pas le modèle.
- `data/commons-inventory.json` : tous les candidats, miniatures, originaux, auteurs, descriptions, licences et métadonnées brutes. La collecte reprend au dernier modèle terminé. Supprimer une entrée de modèle pour relancer sa recherche.
- `data/photo-reviews.json` : décision éditoriale individuelle, statut `exact`, `approximate` ou rejet, date et justification. Un résultat automatique reste non validé jusqu’à cette étape. « Exact » signifie modèle identifié, pas certification du millésime ou de l’état mécanique.
- `scripts/commons_sync.py --publish` : relit les métadonnées de chaque fichier sélectionné, exclut les licences absentes, inconnues, restrictives, les attributions CC manquantes ou les restrictions supplémentaires non clarifiées. Les seuls formats automatiquement acceptés sont CC BY / BY-SA (versions explicites prises en charge), CC0 ou domaine public identifié. Les autres nécessitent une clarification, pas une supposition.
- `public/photo-inventory.json` : audit de chaque moto et des fichiers retenus ou rejetés. `public/photo-credits.json` : provenance complète des assets publiés.
- `scripts/wikipedia_sync.py` : résout les pages complémentaires et conserve leurs identifiants de révision. Cela ne certifie pas automatiquement les caractéristiques techniques.

```sh
python3 -m pip install -r scripts/requirements.txt
python3 scripts/commons_sync.py --search
# Contrôler visuellement les candidats et modifier data/photo-reviews.json.
python3 scripts/wikipedia_sync.py
python3 scripts/commons_sync.py --publish
python3 scripts/test_commons.py
npm run build
```

Les auteurs et liens de licence/source sont affichés sur les fiches, la grille et les vues immersives. Les versions WebP sont redimensionnées ; leur adaptation conserve la licence de l’original, notamment le partage à l’identique pour CC BY-SA. La licence de la photographie n’est pas celle de l’application entière. Toute incertitude fait afficher le visuel de remplacement ; aucun fichier rejeté n’est livré dans `public/images`.

### Hors ligne et stockage

L’interface, les données et les crédits sont précachés. Les photos autorisées sont servies localement et mises en cache à la consultation avec Workbox (`CacheFirst`, 90 variantes maximum, 30 jours, purge sur quota). Un cache distinct conserve les photos des collections et des 20 consultations récentes, avec 180 variantes maximum. Les variantes sont téléchargées lors de l’ajout ou de l’ouverture ; si le téléchargement échoue ou si le quota dépasse 90 %, l’application affiche un message lors de l’ajout aux favoris. Les images devenues inutiles sont retirées au chargement du garage ; les métadonnées IndexedDB restent disponibles. Une première connexion reste nécessaire pour télécharger les photos. La migration du service worker retire les anciens caches non validés.

Pour étendre le catalogue : importer les modèles par lots, ajouter les variantes de nom et traductions aux requêtes, réviser les correspondances et compléter les lacunes par des musées ou contributeurs avec droits documentés. Aucun résultat de musée ou d’archive n’est accepté automatiquement sans les mêmes informations de licence et de provenance.

## Pionniers

Le catalogue inclut le Copeland Steam Bicycle (vers 1884–1885, vapeur), le Daimler Reitwagen (1885, essence, identifiant 15 conservé) et le Butler Petrol Cycle (construction en 1888, projet présenté en 1884, tricycle à essence). Les prototypes affichent un repère historique plutôt qu’une période de production. Les dates incertaines et les spécifications non documentées sont explicites. Les dessins d’archives sont signalés comme illustrations ; les répliques restent identifiées comme variantes proches. Les références primaires du Smithsonian, de Mercedes-Benz et du Science Museum complètent les liens Wikipédia.
