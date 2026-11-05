# Ajout des références historiques 005 à 011

Les numéros de la liste utilisateur sont conservés comme `inventory_reference` et les années proposées comme `requested_year`. Les identifiants techniques 18–24 évitent toute collision avec les 17 fiches et favoris existants. Le catalogue contient désormais 24 fiches et 21 constructeurs déclarés.

| Référence | Proposition utilisateur | Traitement documentaire |
|---|---|---|
| 005 | 1894 — Hildebrand & Wolfmüller, Allemagne | Exemplaire conservé daté vers 1894 par The Henry Ford ; date d’exemplaire séparée du premier prototype inconnu. Début de production 1894 sourcé secondairement. |
| 006 | 1895 — Roper, second modèle, États-Unis | Smithsonian et AMA citent une nouvelle machine construite en 1895. Les dates divergentes 1884/1894 de la source secondaire restent conservées ; le modèle des années 1860 et sa photo sont exclus. |
| 007 | 1895 — De Dion-Bouton motorised bicycle, France | Désignation précise non confirmée : les notices consultées attestent des tricycles en 1895. Fiche de recherche distincte, pas de substitution par un tricycle. |
| 008 | 1895 — Millet Motorcycle, France | La source secondaire situe un prototype en 1892 ; le catalogue du Cnam documente une motocyclette de 1893. La référence 1895 et l’épreuve de cette année ne sont pas assimilées à la construction. |
| 009 | 1896 — Excelsior britannique, Royaume-Uni | Première génération de Bayliss, Thomas & Co. selon la source secondaire, distincte des marques américaines/allemandes et des modèles d’après-guerre. |
| 010 | 1897 — Werner Motocyclette, France | Conception du premier type en 1897 selon le Science Museum ; l’exemplaire muséal est de 1899. Les caractéristiques de cet exemplaire ne sont pas recopiées sur 1897. |
| 011 | 1899 — Peugeot Motobicyclette, France | Référence 1899 à confirmer : Peugeot distingue une première moto en 1898 et une motobicyclette en 1901. Aucune date de construction arbitraire sélectionnée. |

## Images

La recherche Commons et les métadonnées `imageinfo/extmetadata` sont conservées dans l’inventaire éditorial. Trois visuels sont intégrés après vérification des licences : Hildebrand & Wolfmüller (modèle identifié), Millet (exemplaire indiqué 1897, variante proche), Werner (illustration indiquée 1898, variante proche). Quatre visuels de remplacement sont conservés pour Roper, De Dion-Bouton, Excelsior et Peugeot ; les photos d’autres modèles ou de tricycles ne leur sont pas attribuées.

## Mises à jour locales

`appendSeedAdditions` ajoute uniquement les identifiants éditoriaux absents de l’inventaire local. Les fiches locales, revues, sources modifiées, archives, collections et redirections existantes ne sont jamais remplacées. Les doublons potentiels et sources conflictuelles sont bloqués. Une sauvegarde et une révision locale sont créées si de nouveaux véhicules sont effectivement ajoutés. La répétition du chargement est idempotente.

`documented_construction` est une date typée d’exemplaire, distincte de `dates.prototype_year`. Elle n’est utilisée pour la chronologie que si le premier prototype reste inconnu, et l’interface affiche « exemplaire documenté ».

## Fichiers

- Données : `data/models.json`, `data/photo-reviews.json`, `data/commons-inventory.json`, `public/motos.json`, `public/photo-inventory.json`, `public/photo-credits.json`, `public/inventory.json`, trois jeux de WebP dans `public/images`.
- Génération additive : `scripts/add-early-inventory.mjs` (`npm run add:early-history`). Ne pas relancer la migration initiale pour écraser cet inventaire enrichi.
- Application : `src/history/seed-update.js`, `storage.js`, `domain.js`, `context.jsx`, `Detail.jsx`, `Workspace.jsx`.
- Tests : `tests/early-additions.test.js`, `tests/storage.test.js`, `tests/history.test.js` et scripts de `package.json`.

## Vérification

`npm test` : 35 tests réussis (19 tests de domaine, 4 intégrations IndexedDB, 8 tests des nouveaux ajouts et 4 tests des droits photographiques). `npm run build` réussit. L’ajout à une base locale de 17 fiches déjà modifiée est testé sans écrasement ni perte de favoris. Les correspondances visuelles des trois fichiers retenus ont été inspectées.

L’utilisateur a ensuite autorisé explicitement le commit et le push des sources. Cette synchronisation Git est distincte du déploiement du site ; aucun déploiement n’est annoncé sur la seule base d’un push.
