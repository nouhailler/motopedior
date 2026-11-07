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

`public/inventory.json` contient 70 fiches normalisées, dont les anciennes fiches non validées conservées pour compatibilité. Les 54 nouvelles candidates du lot 1901–1910 sont séparées dans `research_batches`, hors de la liste des véhicules. C’est la source historique chargée par `HistoryProvider`, puis conservée dans IndexedDB. `data/models.json` et le catalogue généré `public/motos.json` alimentent le pipeline iconographique ; ils ne remplacent pas les assertions documentaires de l’inventaire. Pour plusieurs milliers d’entrées, prévoir une API paginée, déplacer les filtres et la recherche côté API et charger les pages avec le même IntersectionObserver. Les collections référencent les identifiants techniques stables.

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

## Inventaire historique, schéma 2

L’application inclut un inventaire chronologique à partir de 1867, sans prétendre posséder une fiche par année. Les 17 fiches originales sont conservées avec archive brute, six dates indépendantes, spécifications nullables, constructeurs/marques, sources, assertions, confiance A–D, contradictions, détection de doublons, fusion documentée et imports/exports sans écrasement silencieux.

Lire `docs/INVENTORY-AUDIT.md` pour l’audit préalable et le plan, et `docs/INVENTORY-TECHNICAL.md` pour le schéma, les migrations, les contrôles et les limites documentaires.

```sh
npm run migrate:history  # génération initiale, ne remplace pas un inventaire édité
npm test                # domaine, intégration IndexedDB et droits des photos
npm run build
```

IndexedDB passe de v1 à v2 sans suppression des collections. Les modifications documentaires sont locales à l’appareil ; les sauvegardes automatiques et l’export JSON complet conservent les états antérieurs. Les anciennes dates non qualifiées restent archivées au lieu d’être promues en dates de construction. Les fiches ne deviennent pas « vérifiées » par la seule présence d’un lien Wikipédia ou d’une photo.

### Références historiques 005–011

Sept fiches supplémentaires sont ajoutées avec leurs références et années proposées, distinctes des années effectivement documentées. Voir `docs/EARLY-REFERENCES-005-011.md`. Cette étape a porté le catalogue normalisé à 24 fiches. Les dates incertaines, variantes iconographiques et identifications non confirmées restent visibles ; aucune confusion de tricycle ou de millésime n’est masquée.

Les nouveautés éditoriales sont ajoutées à IndexedDB de façon additive et idempotente, avec sauvegarde préalable, sans remplacer les modifications locales. `npm run add:early-history` génère ces nouveaux enregistrements normalisés ; ne pas utiliser la migration initiale pour régénérer un inventaire documentaire enrichi.

### Peugeot 1898, ZL 1901 et De Dion-Bouton 1895

Cette étape a porté le catalogue à 27 entrées avec trois fiches documentées : prototype Peugeot présenté en 1898, Motobicyclette ZL présentée en 1901, et tricycle à essence De Dion-Bouton de 1895. Les dates de présentation restent distinctes de la construction. Deux photos Commons approuvées sont intégrées avec attribution ; le prototype de 1898 conserve un visuel de remplacement. Les références incertaines précédentes restent accessibles avec des liens vers ces alternatives. Voir `docs/PEUGEOT-DE-DION.md` et `npm run add:peugeot-de-dion`.

### Lot historique 1890–1900

Le catalogue contient désormais 34 fiches : les 14 références de ce lot réutilisent 7 fiches, ajoutent 4 modèles documentés et conservent 3 candidates non validées. `npm run add:1890-1900` génère les ajouts de façon idempotente. L’inventaire affiche les décisions, un focus statistique distinct des tricycles et une base de filtre séparant construction et présentation. La migration éditoriale conserve notes locales, favoris, consultations et sauvegardes. Le [rapport 1890–1900](docs/INTEGRATION-1890-1900.md) détaille chaque modèle, les sources, les limites et les 59 tests réussis.

### Lot historique 1901–1910

75 références examinées : 18 nouvelles fiches documentées (dont une variante), 3 réutilisations et 54 références en attente séparées de l’inventaire des véhicules. Cette livraison portait le catalogue à 52 fiches ; le compteur de la période compte 17 familles de motos sans recomptage de la variante Indian. Les 3 tricycles demandés restent des dossiers à documenter. `npm run add:1901-1910` est idempotent ; `npm run prepare:1901-media` prépare les requêtes iconographiques. Le [rapport 1901–1910](docs/INTEGRATION-1901-1910.md) détaille les 75 décisions, les sources, les conflits, les 4 photos Commons autorisées, la migration et les 77 tests réussis.

## Lot historique 1911–1920

18 fiches documentées ajoutées ; variantes reliées, 98 références en attente hors du catalogue confirmé. Voir le [rapport et les sources](docs/inventories/1911-1920.md) et l’[audit préalable](docs/inventories/1911-1920-audit.md). `npm run add:1911-1920` est idempotent et conserve les 52 fiches antérieures.

## Inventaire annuel 1921

16 nouvelles fiches et une continuité Nimbus sourcée, sans recréer la famille : 86 véhicules au total. Les 70 fiches antérieures sont préservées. Le lot compte 62 références, dont 45 en attente. Voir [audit](docs/inventories/1921-audit.md) et [rapport avec sources et décisions](docs/inventories/1921.md). Import : `npm run add:1921` ; préparation média : `npm run prepare:1921-media`.
