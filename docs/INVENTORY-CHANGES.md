# Rapport de livraison — inventaire historique

## Résultat local

Le système d’inventaire demandé est implémenté dans le projet React/Tailwind existant. Il accepte la période 1867–aujourd’hui et conserve les 17 fiches, leurs identifiants, les médias validés et les données brutes antérieures. Il n’ajoute aucun faux véhicule de 1867 et ne prétend pas être un inventaire mondial exhaustif.

Fonctions : chronologie à six types de dates indépendantes ; caractéristiques nullables ; catégories de motocyclettes et véhicules apparentés ; statuts historiques ; registres constructeurs/marques ; sources et preuves au champ ; niveaux A–D ; contradictions conservées ; filtres ; revue documentaire ; rapports d’anomalies ; doublons ; fusion avec archives et redirections ; import JSON et exports complets JSON/CSV ; tableau de bord.

## Fichiers ajoutés

| Fichier | Rôle |
|---|---|
| `src/history/domain.js` | Schéma, taxonomies, dates, validations, fiabilité, doublons, statistiques |
| `src/history/migrate.js` | Migration conservatrice du catalogue initial |
| `src/history/operations.js` | Import transactionnel préparé, insertion, fusion, sources, assertions, contradictions, revue, constructeurs et marques |
| `src/history/serialization.js` | JSON/CSV complets, parseurs et téléchargements |
| `src/history/storage.js` | IndexedDB v2, sauvegardes, commits atomiques, protection des révisions |
| `src/history/context.jsx` | Chargement, persistance et adaptation vers la galerie existante |
| `src/history/Workspace.jsx` | Inventaire, documentation, constructeurs, tableau de bord, import/export/fusion |
| `src/history/Editors.jsx` | Formulaires de sources, preuves, contradictions, revue et fiches |
| `src/history/Detail.jsx` | Sections historiques des fiches photo |
| `src/history/history.css` | Adaptation visuelle responsive |
| `scripts/migrate-inventory.mjs` | Génération contrôlée du catalogue normalisé |
| `public/inventory.json` | Catalogue initial, schéma 2, 17 véhicules/14 constructeurs/39 sources |
| `data/migrations/catalogue-v1.json` | Archive originale préservée |
| `tests/history.test.js` | 19 tests de domaine, validation, migration, imports, doublons, fusion et formats |
| `tests/storage.test.js` | 3 tests d’intégration IndexedDB |
| `docs/INVENTORY-AUDIT.md` | Audit préalable et plan par étapes |
| `docs/INVENTORY-TECHNICAL.md` | Architecture, schéma, migrations, contrôles et limites |
| `docs/INVENTORY-CHANGES.md` | Ce rapport |

## Fichiers modifiés

- `src/main.jsx` : intégration sans remplacement de la galerie, nouvelle navigation, détails historiques et raccordement au stockage v2.
- `package.json`, `package-lock.json` : commandes de test/migration et dépendance de test `fake-indexeddb`.
- `README.md` : documentation des nouvelles fonctions et commandes.
- `index.html`, `vite.config.js` : métadonnées et périmètre 1867–aujourd’hui.

Les composants photographiques, le service worker, les licences et la chaîne Commons sont réutilisés.

## Migrations réalisées

- Schéma des données v1 → v2, sans supprimer les fichiers ou valeurs existants. Copie brute dans l’archive et dans les données migrées.
- IndexedDB v1 → v2 : conservation de `state`, ajout de `historical_inventory` et `historical_backups`.
- Les redirections de fusion remappent favoris, consultations et relations dans une transaction commune ; les originaux sont archivés.
- Les anciennes dates de génération ne sont pas promues en dates de construction. Les valeurs non documentées restent nulles ou D/non vérifiées.

## Vérifications exécutées

- `npm test` : **26 tests réussis** (19 domaine + 3 intégration IndexedDB + 4 droits photographiques).
- `npm run build` : réussite, service worker et manifest produits.
- Navigateur local : inventaire, filtres, séparation du Butler parmi les apparentés, fiche chronologique, accès documentaire, tableau de bord.
- Import identique via l’interface : **0 nouvelle fiche, 17 identiques, 0 conflit, 0 erreur**, 15 avertissements documentaires attendus. Application du lot réussie ; révision locale 1 et sauvegarde précédente conservée.

## Limites documentaires

- 14 fiches modernes restent sans date de construction ni statut de production prouvé au champ ; leurs anciennes valeurs sont conservées en archive, pas inventées.
- La datation Copeland reste contradictoire.
- Les informations juridiques des constructeurs et données de production manquantes restent nulles.
- L’inventaire documentaire reste local à l’appareil, sans synchronisation multiappareil. Les exports assurent sauvegarde et transfert.
- Une vérification automatique de cohérence ne remplace pas une revue des documents historiques.

## Publication

Version locale compilée et vérifiée. Après le refus initial du contrôle automatique, l’utilisateur a explicitement autorisé le commit et le push des sources du projet MotoPedia. La synchronisation Git ne constitue pas à elle seule un déploiement : la publication de cette version reste une opération distincte.
