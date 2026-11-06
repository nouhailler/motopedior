# Intégration historique 1890–1900 — rapport du 5 novembre 2026

## Résultat réel

14 références de travail examinées : **7 rapprochées de fiches existantes, 4 nouvelles fiches documentées, 3 nouvelles fiches candidates non validées**. Le catalogue passe de 27 à 34 fiches, pas de 27 à 41. Les quatre ajouts documentés ne sont pas tous globalement validés : Perks & Birch conserve une contradiction ouverte. Aucun des 27 véhicules précédents n’a été réécrit ou supprimé.

| Réf. du nouveau lot | Modèle demandé | ID technique conservé/ajouté | Décision et limites |
| --- | --- | --- | --- |
| 005 | Hildebrand & Wolfmüller, 1894 | 18 | Fiche existante. The Henry Ford date son exemplaire circa 1894 ; date approximative conservée. |
| 006 | Millet, 1892–1895 | 21 | Fiche existante. Le prototype 1892 provenant d’une source secondaire ne remplace pas l’exemplaire Cnam de 1893 ; aucune nouvelle période certaine 1892–1895. |
| 007 | Werner, 1897 | 23 | Fiche existante, encore à approfondir. La notice du Science Museum porte sur 1899 et ne certifie pas à elle seule le prototype de 1897. |
| 008 | Peugeot première moto, 1898 | 25 | Fiche existante. Présentation 1898 distincte de construction et commercialisation, qui restent inconnues. |
| 009 | Excelsior britannique, 1896 | 22 | Fiche existante ; confirmation primaire de la datation encore nécessaire. Aucun rapprochement avec la marque américaine. |
| 010 | Geneva Steam Bicycle, 1896 | 28 | Nouvelle candidate. Reconstruction signalée par F.-M. Dumas ; catalogue Guggenheim et ancienne notice AMCA non accessibles lors de cette recherche. Construction, motorisation précise et authenticité non validées. |
| 011 | Roper, second modèle, 1895–1896 | 19 | Fiche existante. Les contradictions déjà archivées sont conservées ; l’année d’utilisation/décès 1896 ne devient pas arbitrairement année de construction. |
| 012 | Marks Motorcycle, 1896–1901 | 29 | Nouvelle candidate. Attribution à Roy C. Marks à vérifier ; ni période de production ni spécifications California ultérieures ne sont reprises. Pays laissé null pour ce modèle précis. |
| 013 | Pennington Motor Bicycle, années 1890 | 30 | Nouvelle candidate. Les archives mentionnent des prototypes et le brevet décrit un projet, mais ne suffisent pas à identifier et dater précisément ce deux-roues américain. |
| 014 | Perks & Birch Motor-Wheel, 1899 | 31 | Nouvel exemplaire documenté du National Motor Museum. Cession Singer contradictoire : 1901 selon Beaulieu, 1900 selon Louwman. Revue globale en attente. |
| 015 | Thomas Auto-Bi, 1900 | 32 | Nouveau prototype Design Number Two de 1900. Commercialisation de la famille modifiée pour 1901 explicitement séparée. Fiche validée pour les faits renseignés. |
| 016 | De Dion-Bouton Tricycle, 1897 | 27 | Famille déjà documentée dès 1895. Une création supplémentaire de « 1897 » est refusée faute de variante distincte démontrée ; l’exemplaire existant garde sa date. |
| 017 | Ariel Tricycle, 1898 | 33 | Nouvel exemplaire 1898, constructeur Components Ltd, marque Ariel. Fiche validée, tricycle séparé. |
| 018 | Clarke Gasoline Tricycle, 1897 | 34 | Nouvel exemplaire de Louis S. Clarke conservé au Smithsonian, expérimental. Fiche validée, tricycle séparé. |

Les références 005–018 sont propres à ce lot. Elles ne remplacent pas les références 005–011 de la liste précédente, ni les identifiants utilisés par les favoris.

## Créations refusées et vérifications en attente

Aucun modèle n’est déclaré historiquement inexistant. Sept créations supplémentaires sont évitées parce que les modèles sont déjà présents. En particulier, une nouvelle fiche De Dion-Bouton « 1897 » n’est pas justifiée par une variante établie.

Geneva, Marks et Pennington sont conservés comme dossiers de recherche (`unconfirmed`, `existence_verified: false`) : toutes leurs dates typées et caractéristiques techniques restent nulles. Les années de la demande restent des références proposées, jamais des années certaines. Le brevet Pennington n’est pas attribué comme brevet d’un exemplaire construit sans correspondance démontrée ; les données de son Autocar à trois roues sont écartées.

Parmi les fiches déjà présentes, Werner 1897, Excelsior 1896, la construction précise Peugeot et les contradictions Roper restent à approfondir. L’existence d’une source ou d’une photo n’entraîne pas une validation globale.

## Audit et architecture

Architecture conservée : React/Vite, Tailwind, IndexedDB via `idb`, inventaire normalisé de schéma 2, Workbox et pipeline Commons existants. Audit des domaines, opérations d’insertion/import/fusion, sérialisation JSON/CSV, sauvegardes IndexedDB et filtres avant modification.

Les 27 véhicules antérieurs sont figés dans `data/migrations/catalogue-27-before-1890-1900.json` pour contrôler leur préservation. Le générateur `npm run add:1890-1900` ajoute uniquement les IDs 28–34 et le lot documentaire ; sa seconde exécution est sans effet.

`research_batches` est une extension facultative validée du schéma 2 : références de travail, décisions, notes et liens vers les fiches. Pas de modification destructive des objets véhicules ni du schéma physique IndexedDB. La migration éditoriale ajoute cette extension même quand les modèles ont déjà été importés ; elle sauvegarde l’état précédent et incrémente une seule fois la révision. Les conflits de sources, doublons locaux et redirections restent protégés.

Les filtres et la galerie utilisent les désignations alternatives. Un choix explicite « construction ou présentation documentée » permet de retrouver Peugeot 1898 par décennie sans changer sa date de construction. Le champ « année de construction » reste strictement fondé sur une construction. Les candidates sans construction connue restent accessibles dans le lot et dans les recherches sans restriction de décennie.

## Sources utilisées et portée

Les dates de consultation sont conservées dans les sources du catalogue. Les dates de publication inconnues restent nulles ; la publication du livre de Stein est 2001, celle de la notice Thomas du National Motorcycle Museum est le 28 septembre 2018. Les niveaux A–D qualifient les documents, pas une validation automatique de tous leurs contenus.

- [National Motor Museum — Perks and Birch Autowheel](https://nationalmotormuseum.org.uk/collections/vehicles/perks-and-birch-autowheel/) : exemplaire 1899, pays, constructeur et caractéristiques ; cession des droits datée 1901.
- [Louwman Museum — Singer Tricycle](https://www.louwmanmuseum.nl/en/collections/automobiles/singer-tricycle) : présentation de la roue en 1899 et reprise des droits un an plus tard. Les données du tricycle Singer 1901 ne sont pas copiées vers Perks 1899.
- [Geoffrey N. Stein, New York State Museum — The Motorcycle Industry in New York State](https://nysm.nysed.gov/sites/default/files/motorcycle_industry_in_nys-geoff_stein.pdf), p. 144–146 : prototype Thomas, observation des machines par la presse, évolution du galet vers la courroie et saison commerciale 1901.
- [National Motorcycle Museum — 1901 Thomas Auto-Bi](https://nationalmcmuseum.org/2018/09/28/1901-thomas-auto-bi/) : version restaurée de production, disponibilité fin 1901. Ses chiffres de cylindrée et de puissance ne sont pas transférés au prototype.
- [National Motor Museum — Ariel Tricycle](https://nationalmotormuseum.org.uk/collections/vehicles/ariel-tricycle/) : exemplaire 1898, Components Ltd et caractéristiques.
- [Ariel Motor Company — Our History](https://www.arielmotor.co.uk/our-history/) : tricycle commercial de 1898 et refroidissement de la culasse ; quadricycle et première moto ultérieurs distingués.
- [Smithsonian — Clarke Gasoline Tricycle, 1897](https://www.si.edu/object/clarke-gasoline-tricycle-1897:nmah_843060) et [Smithsonian — Wheels and Wheeling](https://repository.si.edu/bitstream/handle/10088/2423/SSHT-0024_Hi_res.pdf?isAllowed=y&sequence=1) : constructeur, existence, datation et fonctionnement du tricycle.
- [IMechE Archive and Library — Early Motor Bicycles](https://imechearchive.wordpress.com/2015/12/07/early-motor-bicycles/) et [USPTO — US570440A](https://patents.google.com/patent/US570440A/en) : pistes Pennington, en séparant prototypes mentionnés et projet breveté.
- [VMCC — A to Z](https://old.vmcc.net/A-to-Z-of-Motorcycles), [F.-M. Dumas — anniversaires 1896](https://www.moto-collection.org/blog/1896-a-1996-100-ans-danniversaires/), [Wikipédia — Geneva](https://en.wikipedia.org/wiki/Geneva_steam_bicycle) : pistes Geneva et avertissement sur la reconstruction.
- [Antique Motorcycle and Auto Museum — collection](https://vft.org/Museums/AntiqueMCmuseum/OldIndexPageFirst_files/a.htm) et [Wikipédia — California Motor Company](https://en.wikipedia.org/wiki/California_Motor_Company) : attribution Marks non suffisante pour valider le véhicule précis.
- Sources existantes réexaminées : [The Henry Ford — Hildebrand](https://www.thehenryford.org/collections/explore/artifact/23190), [Cnam/Cnum](https://cnum.cnam.fr/pgi/redir.php?ident=M6118&onglet=i), [Science Museum — Werner 1899](https://collection.sciencemuseumgroup.org.uk/objects/co25333/werner-motor-cycle-1899), [L’Aventure Peugeot](https://laventure-association.com/article/motos_peugeot/). La notice Smithsonian du premier Roper n’était pas accessible lors de cette consultation ; les preuves et contradictions antérieures restent archivées.

## Caractéristiques confirmées des ajouts

| Fiche | Faits renseignés | Champs laissés inconnus notamment |
| --- | --- | --- |
| Perks & Birch 31 | 222 cm³, monocylindre, 28,97 km/h selon la notice de l’exemplaire ; moteur dans la roue | Carburant précis non explicité par les notices consultées, puissance, poids, production, commercialisation |
| Thomas 32 | Essence, monocylindre à quatre temps, refroidissement par air, courroie vers galet du prototype | Cylindrée, puissance, poids, nombre construit ; aucun chiffre de la version 1901 emprunté |
| Ariel 33 | Essence, moteur De Dion-Bouton, 239 cm³, monocylindre, 32,19 km/h ; culasse refroidie par eau uniquement | Puissance, poids, nombre construit, début exact de fabrication |
| Clarke 34 | Essence, monocylindre, refroidissement par air, engrenage vers différentiel arrière, démarrage par pédales | Cylindrée, puissance, poids, vitesse, nombre construit, commercialisation |

## Photos et licences

L’API Commons a été interrogée pour les sept nouvelles fiches avec `imageinfo` et `extmetadata`. Un seul fichier est retenu après contrôle visuel : [Perks & Birch, photo sv1ambo](https://commons.wikimedia.org/wiki/File:1899_Perks_%26_Birch_Autowheel_motorcycle_(5947905171).jpg), CC BY 2.0, en WebP 480/800/1600. Auteur, licence, miniature distante, original HD, page source et modifications sont conservés ; les crédits apparaissent dans la fiche.

Les autres résultats sont conservés dans l’audit, sans intégration : Geneva potentiellement reconstruit, vues Thomas ne certifiant pas la version à galet, panneau Perks montrant aussi un tricycle distinct, absence de résultat pour Marks/Pennington/Clarke. Les fichiers Ariel CC BY-SA 3.0 de sont exclus par la politique technique actuelle de l’importeur, qui ne gère pas les licences portées ; cela ne signifie pas que cette licence est restrictive ou invalide. La licence CC0 des métadonnées Smithsonian ne libère pas automatiquement ses photos. Les fiches concernées utilisent le remplacement existant.

## Statistiques et limites du comptage

Le focus 1890–1900 contient 14 fiches examinées : 7 modèles avec une construction documentée dans la période, 7 constructions non validées pour ce périmètre. Parmi les 7 documentés : **2 motocyclettes, 2 vélocipèdes motorisés, 3 tricycles** ; 2 prototypes, 1 expérimental, 1 commercialisation datée dans la période et 1 début de production daté dans la période. Trois fiches du périmètre sont globalement validées, onze nécessitent encore des recherches. Ces indicateurs ne mesurent pas la totalité des véhicules ayant existé dans le monde.

Une date d’exemplaire vérifiée peut établir une présence dans la période même si le premier prototype reste incertain (Millet). Les intervalles qui débordent la période, les conflits non résolus et les présentations seules ne deviennent pas des constructions certaines. La commercialisation Thomas 1901 est exclue du compteur 1890–1900. Production et commercialisation sont calculées séparément. Les variantes explicitement reliées à un parent présent ne sont pas recomptées comme modèles indépendants.

## Fichiers concernés par cette intervention

- Données : `data/models.json`, `data/commons-inventory.json`, `data/photo-reviews.json`, archive `data/migrations/catalogue-27-before-1890-1900.json` ; fichiers publics `inventory.json`, `motos.json`, `photo-inventory.json`, `photo-credits.json` et trois WebP Perks.
- Génération : `scripts/add-1890-1900.mjs`, scripts npm dans `package.json`.
- Domaine et migration : `src/history/domain.js`, `period.js`, `seed-update.js`, `storage.js`.
- Interface : `src/history/PeriodPanel.jsx`, `Workspace.jsx`, `Detail.jsx`, `context.jsx`, `history.css`, `src/main.jsx`.
- Tests : `tests/period-1890-1900.test.js`, adaptation des fixtures des tests Peugeot et stockage.
- Documentation : présent rapport et README.

Les modifications Peugeot/De Dion de l’intervention précédente étaient déjà présentes sans commit au début ; elles sont conservées. Cette intervention ne crée aucun commit, push ou déploiement.

## Vérifications effectuées

- `npm test` : **59 tests réussis**, dont 15 nouveaux tests ciblés 1890–1900, les régressions historiques, IndexedDB et les licences des photos.
- Import idempotent réel du générateur, doublons/noms alternatifs, préservation exacte des 27 fiches antérieures.
- Migration IndexedDB 27→34 avec sauvegarde, conservation des notes locales, favoris et consultations ; index documentaire ajouté même si les véhicules existent déjà.
- JSON et CSV : export/réimport sans perte des références, nulls, preuves, contradictions ou dates ; rejet de lots mal formés.
- Tests des filtres, intervalles, présentation séparée, catégories, variantes et statistiques.
- `npm run build` : compilation Vite et service worker Workbox réussie.
- `git diff --check` : réussi.
- Navigateur : 34 fiches visibles, lot de 14 références, fiche Thomas et dates séparées, tableau de bord ; disposition des compteurs contrôlée à 390 px sans débordement horizontal.

Limites restantes : catalogue non exhaustif, trois candidates non validées, certaines fiches antérieures encore documentées seulement par des sources secondaires, conflit Singer non résolu et plusieurs photos absentes. Aucun nouveau score Lighthouse n’a été mesuré. Les données éditoriales sont locales au dépôt ; le site hébergé n’est pas déployé par cette intervention.
