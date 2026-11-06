# Inventaire 1901–1910 — rapport du 6 novembre 2026

## Audit et plan d’intervention

L’audit a porté sur le catalogue de 34 fiches, les dates typées, les règles de validation, les constructeurs/marques, les insertions et fusions, les exports et la migration éditoriale IndexedDB. React/Vite, Tailwind, IndexedDB, Fuse et Workbox sont conservés. L’état initial figure dans `data/migrations/catalogue-34-before-1901-1910.json`.

Plan suivi : rapprocher les 75 désignations de travail des fiches existantes ; rechercher des objets et versions documentés ; séparer les faits attestés des propositions ; intégrer les fiches admissibles et les dossiers de recherche ; étendre les filtres/statistiques ; tester la migration et les exports ; contrôler le navigateur et les photos. Les investigations ont été réparties en trois recherches documentaires bornées, sans modification de fichiers par ces recherches.

## Résultat quantifié

- **75 références examinées**, dont les 3 véhicules apparentés demandés.
- **18 nouvelles fiches documentées** : 17 modèles/familles indépendants dans le compteur et 1 variante Indian reliée au Single antérieur.
- **3 réutilisations dans le lot** : Norton Energette, Laurin & Klement BZ, Rudge. Ces références supplémentaires ne créent pas de modèles supplémentaires.
- **54 références en attente**, dans une liste de candidates séparée de `vehicles`. Elles ne correspondent pas nécessairement à 54 modèles distincts.
- **0 véhicule déclaré définitivement inexistant**. Les 54 propositions insuffisantes ne sont pas admises comme fiches validées ; ce sont des attentes documentaires, pas des rejets historiques catégoriques.
- Catalogue : **34 → 52 fiches**. Les 34 véhicules précédents, leurs identifiants et leurs archives sont conservés sans réécriture.
- Parmi les 18 ajouts, 15 revues sont validées pour les faits renseignés ; 3 restent en revue en raison de contradictions explicites (Royal Enfield, Royal Pioneer, L&K BZ). Cela ne transforme pas leurs valeurs techniques litigieuses en certitudes.

La décennie n’est donc **pas entièrement intégrée ou historiquement vérifiée**. Certaines désignations de la liste sont trop génériques, ambiguës, des dates de création de marque ou des dates qui ne correspondent pas à un exemplaire construit.

## Fiches effectivement ajoutées

Les dates ci-dessous datent un exemplaire ou une construction attestée ; elles ne deviennent pas automatiquement des dates du premier prototype. Une année proposée erronée reste conservée dans la référence de travail.

| ID technique | Fiche | Construction documentée | Origine | Statut | Source principale |
| --- | --- | --- | --- | --- | --- |
| `1901-enfield-motor-bicycle` | Royal Enfield Motor-Bicycle — type 1901 | 1901 | Royaume-Uni | production | [Royal Enfield](https://www.royalenfield.com/in/en/our-world/since-1901/) |
| `1902-indian-single` | Single — exemplaire Smithsonian 1902 | 1902 | États-Unis | production | [Smithsonian — National Museum of American History](https://americanhistory.si.edu/collections/object/nmah_843056) |
| `1902-triumph-no1` | No. 1 — moteur Minerva | 1902 | Royaume-Uni | production | [Triumph](https://www.triumphmotorcycles.co.uk/our-story/brand-timeline) |
| `1905-fn-four` | Four — exemplaire circa 1905 | vers 1905 | Belgique | production | [Franschhoek Motor Museum](https://www.fmm.co.za/two-wheelin-fn-four/) |
| `1909-harley-5d` | Model 5-D — V-Twin | 1909 | États-Unis | limited_production | [Harley-Davidson](https://www.harley-davidson.com/content/dam/h-d/documents/owners/hog/h-o-g-magazine-archive/canada/content-tile-2011-spring.pdf) |
| `1909-royal-pioneer` | Pioneer — type 1909 | 1909 | États-Unis | production | [National Motorcycle Museum](https://nationalmcmuseum.org/featured-bikes/1909-royal-pioneer/) |
| `1908-scott-333` | 333 cm³ — type Jowett 1908 | 1908 | Royaume-Uni | limited_production | [Scott Owners Club](https://scottownersclub.org/models/) |
| `1907-indian-single` | Single Camel Back — évolution 1907 | 1907 | États-Unis | production | [National Motorcycle Museum](https://nationalmcmuseum.org/2022/11/04/1907-indian/) |
| `1902-norton-energette` | Energette — type 1902 | 1902 | Royaume-Uni | production | [Norton](https://www.nortonresurgence.com/en/norton-heritage/norton-motorcycles-a-legacy-of-heritage%2C-innovation-and-resurgence.html) |
| `1902-humber-275` | 2¾ HP — exemplaire de Beeston 1902 | 1902 | Royaume-Uni | production | [Science Museum Group](https://collection.sciencemuseumgroup.org.uk/objects/co24380/humber-motorcycle) |
| `1902-california-motor-bicycle` | Motor Bicycle — exemplaire SFO 1902 | 1902 | États-Unis | production | [SFO Museum](https://www.sfomuseum.org/exhibitions/early-american-motorcycles/gallery) |
| `1903-laurin-klement-bz` | BZ — exemplaire du musée 1903 | 1903 | Bohême (Autriche-Hongrie) | production | [Škoda Auto](https://www.skoda-storyboard.com/en/press-kits/classic-days-2026-press-kit/laurin-klement-bz-1902-1904/) |
| `1905-triumph-3hp` | 3 HP — type 1905 | 1905 | Royaume-Uni | production | [Beaulieu — National Motor Museum](https://www.beaulieu.co.uk/news/110-year-old-motorcycle-rides-into-beaulieu/) |
| `1909-reading-standard-x102` | X1-02 — type 1909 | 1909 | États-Unis | production | [National Motorcycle Museum](https://nationalmcmuseum.org/2019/02/08/1909-reading-standard-x1-02/) |
| `1910-rudge-prototype` | Monocylindre — prototype assemblé en 1910 | 1910 | Royaume-Uni | prototype | [Rudge-Whitworth Club](https://www.rudge-whitworth.com/the-motorcycles/model-history) |
| `1901-nsu-neckarsulmer` | Neckarsulmer Motorrad — moteur Zédel | 1901 | Allemagne | production | [Audi Tradition](https://audi-touchscreen-150-jahre-nsu.timm4.de/touchscreen-1/en/unternehmen) |
| `1910-pierce-four` | Four — exemplaire Barber 1910 | 1910 | États-Unis | production | [Barber Vintage Motorsports Museum](https://www.barbermuseum.org/collection/) |
| `1908-indian-twin-t961` | Twin — exemplaire moteur T961, 1908 | 1908 | États-Unis | production | [RM Sotheby’s](https://rmsothebys.com/auctions/mo26/lots/s0021-1908-indian-twin/) |

## Versions, variantes et doublons évités

L’Indian Single de 1907 est reliée par `variant_of` à la Single 1902 ; les caractéristiques 288 cm³/cadre Camel Back restent propres à sa version. Elle apparaît dans l’inventaire et l’indicateur des variantes, mais n’ajoute pas une famille indépendante au total. L’Indian Twin moteur T961 de 1908 est un autre objet à deux cylindres, et non une attribution des spécifications du Single à un Twin.

Les références « Norton première moto 1901 » et « première production 1905 » sont rapprochées de l’Energette 1902 documentée, sans fabriquer deux premières motos. Les demandes L&K 1903 et BZ 1908 sont rapprochées de la BZ muséale 1903, produite entre 1902 et 1904. Les deux références Rudge sont rapprochées du prototype assemblé en 1910, commercialisé en 1911.

Les premières Harley-Davidson prototype/production de 1903 restent candidates : une mention de premières machines ne suffit pas à inventer deux modèles distincts. La Strap Tank reconstituée avec des composants de plusieurs années n’est pas traitée comme un original homogène certain de 1907. Le 5-D V-twin 1909 est identifié séparément par les archives du constructeur ; les chiffres du 7-D de 1911 ne sont pas transposés.

Les constructeurs sont recherchés par nom normalisé, nom officiel et alias avant création. Les noms historiques sont associés aux nouvelles fiches (`historical_manufacturer`) sans créer une seconde entrée Royal Enfield sous une orthographe différente ni attribuer l’Inde actuelle à la machine de Redditch de 1901. Les nouvelles identités Hendee/Indian, FN/Fabrique Nationale et Pierce/Pierce Cycle Company disposent de noms/alias documentés. Aucune fusion, acquisition ou filiation juridique non prouvée n’est fabriquée. Les noms de constructeurs des candidates restent des propositions, pas des sociétés historiques validées automatiquement.

## Vérification du registre des constructeurs demandés

Un nom proposé dans la liste de travail n’entraîne pas la création automatique d’un constructeur validé. Les noms officiels/alias sont comparés ; les changements de raison sociale et reprises non établis ne sont pas inventés.

| Nom demandé | Registre / décision |
| --- | --- |
| Royal Enfield | Entrée antérieure conservée : Royal Enfield (`manufacturer-4756e66d`) |
| Indian | Nouvelle identité documentée : Indian (`manufacturer-9290d9e6`) |
| Motosacoche | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Matchless | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Norton | Nouvelle identité documentée : Norton (`manufacturer-a57591ed`) |
| Quadrant | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| NSU | Nouvelle identité documentée : NSU (`manufacturer-9ca90b89`) |
| Triumph | Entrée antérieure conservée : Triumph (`manufacturer-b46141ac`) |
| FN | Nouvelle identité documentée : FN (`manufacturer-82d36a55`) |
| BAT | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Humber | Nouvelle identité documentée : Humber (`manufacturer-d1e14742`) |
| Simplex | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Harley-Davidson | Entrée antérieure conservée : Harley-Davidson (`manufacturer-8e9bdc4f`) |
| Laurin & Klement | Nouvelle identité documentée : Laurin & Klement (`manufacturer-9d0b2d9e`) |
| Husqvarna | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Chater-Lea | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Peugeot | Entrée antérieure conservée : Peugeot (`manufacturer-1ac2421e`) |
| Elleham | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Veloce | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Yale | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Merkel | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Wanderer | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Victoria | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| AJS | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| BSA | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Douglas | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Achille | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Bradbury | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Griffon | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| René Gillet | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Terrot | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Thor | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Cito | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| New Imperial | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Pierce | Nouvelle identité documentée : Pierce Cycle Company (`manufacturer-7526caf4`) |
| Reading Standard | Nouvelle identité documentée : Reading Standard (`manufacturer-b5e24c84`) |
| Scott | Nouvelle identité documentée : Scott (`manufacturer-62dd699c`) |
| Calthorpe | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Rudge-Whitworth | Nouvelle identité documentée : Rudge-Whitworth (`manufacturer-57c7ffbb`) |
| Austral | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Alcyon | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Hercules | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Stimula | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| W.E. Brough | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |
| Aiglon | Nom proposé dans les dossiers candidats ; identité et/ou modèle à documenter avant création d’une entrée validée. |

Le nom Royal Enfield sert de point de regroupement existant ; le fabricant historique de la moto de Redditch est explicité dans la nouvelle fiche, avec pays Royaume-Uni. Aucune chronologie de reprise non prouvée n’est ajoutée au registre.

## Caractéristiques renseignées

Seules les caractéristiques suivantes sont portées dans les fiches. Les autres champs techniques restent nulls. Le champ existant `engine_type` décrit l’architecture et le cycle quand ils sont connus ; aucun nouveau format technique incompatible n’est introduit.

| Fiche | Caractéristiques non nulles | Précautions |
| --- | --- | --- |
| Royal Enfield Motor-Bicycle — type 1901 | Cylindres : 1 ; Transmission : Longue courroie croisée en cuir vers la roue arrière | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| Single — exemplaire Smithsonian 1902 | Cylindres : 1 ; Moteur : Monocylindre à quatre temps ; Refroidissement : Air | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| No. 1 — moteur Minerva | Moteur : Moteur Minerva de fabrication belge ; cm³ : 239 ; Transmission : Courroie vers la roue arrière | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| Four — exemplaire circa 1905 | Moteur : Quatre cylindres en ligne ; Cylindres : 4 ; cm³ : 362 | La notice indique une plage de puissance 3,5–3,75 hp : aucune extrémité ni conversion en ch métriques n’est choisie. |
| Model 5-D — V-Twin | Moteur : Bicylindre en V à 45° ; Cylindres : 2 ; cm³ : 810.83 ; Transmission : Courroie sans galet tendeur | Les 7 horsepower et les 27 exemplaires « reportedly » ne deviennent pas une mesure métrique certaine ni un nombre de production certain. |
| Pioneer — type 1909 | Moteur : Monocylindre vertical ; Cylindres : 1 ; cm³ : 500 ; Refroidissement : Air ; Transmission : Courroie en V Watawata ; Démarrage : Pédales ; Freinage : Frein arrière à rétropédalage | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| 333 cm³ — type Jowett 1908 | Moteur : Bicylindre deux temps ; Cylindres : 2 ; cm³ : 333 ; Refroidissement : Eau ; Transmission : Chaîne ; Rapports : 2 ; Châssis : Cadre triangulé | Le kick-starter des machines de 1909 n’est pas attribué aux 333 cm³ de 1908. |
| Single Camel Back — évolution 1907 | Moteur : Monocylindre à quatre temps ; Cylindres : 1 ; cm³ : 288 ; Refroidissement : Air ; Transmission : Chaîne ; Châssis : Cadre diamant Camel Back | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| Energette — type 1902 | Moteur : Moteur Clément ; cm³ : 147 ; Rapports : 2 | Deux transmissions proposées selon versions, chaîne ou courroie : aucune n’est choisie arbitrairement pour ce dossier familial. |
| 2¾ HP — exemplaire de Beeston 1902 | Poids kg : 52.5 | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| Motor Bicycle — exemplaire SFO 1902 | Aucune valeur mécanique ponctuelle suffisamment établie pour cette version. | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| BZ — exemplaire du musée 1903 | Moteur : Monocylindre quatre temps ; Cylindres : 1 ; cm³ : 331 ; Refroidissement : Air ; Transmission : Entraînement direct ; Empattement mm : 1350 | Poids 55–58 kg et puissance « up to 2.5 hp » : aucune valeur ponctuelle en kg/ch n’est inventée. |
| 3 HP — type 1905 | Transmission : Courroie ; pédalier auxiliaire par chaîne ; Démarrage : Pédales | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| X1-02 — type 1909 | Moteur : Bicylindre en V à soupapes latérales ; Cylindres : 2 ; cm³ : 722 ; Refroidissement : Air ; Transmission : Chaîne ; Démarrage : Pédales ; Freinage : Frein à rétropédalage ; Châssis : Tubes d’acier brasés | Valeurs limitées à la version et aux sources citées ; absence de données complétées par supposition. |
| Monocylindre — prototype assemblé en 1910 | Aucune valeur mécanique ponctuelle suffisamment établie pour cette version. | La cylindrée 499 cm³ du modèle commercial 1911 n’est pas attribuée au premier prototype. |
| Neckarsulmer Motorrad — moteur Zédel | Moteur : Moteur Zédel de fabrication suisse | Les cylindrées et puissances divergentes publiées ailleurs ne sont pas transposées à cette première série. |
| Four — exemplaire Barber 1910 | Moteur : Quatre cylindres ; Cylindres : 4 | Les spécifications détaillées des Four de 1909 ou 1911 ne sont pas copiées sur l’exemplaire 1910. |
| Twin — exemplaire moteur T961, 1908 | Moteur : Bicylindre en V à 42° ; Cylindres : 2 ; Rapports : 1 ; Freinage : Frein arrière à rétropédalage | La puissance et la cylindrée ne sont pas choisies parmi des valeurs divergentes de notices commerciales. |

Les puissances exprimées en `hp`, parfois fiscales, approximatives ou divergentes, ne sont pas copiées comme des `ch` métriques. Aucun couple, poids, cylindrée ou nombre d’exemplaires manquant n’est inventé. Les plages de poids/puissance ne sont pas réduites arbitrairement à leur borne inférieure.

Les six dates existantes sont conservées séparément. Rudge : prototype 1910 / commercialisation 1911. Indian : conception 1901 / exemplaire et vente 1902. BZ : présentation 1902 / exemplaire 1903 / production 1902–1904. La FN circa 1905 garde sa précision approximative. Les caractéristiques des exemplaires de 1903, 1909 ou 1911 ne sont pas mélangées aux autres versions sans preuve.

## Décision pour chaque référence de la demande

« Réutilisée » signifie une seconde référence vers une fiche déjà traitée dans ce lot. « Candidate » signifie qu’aucun véhicule validé n’est créé pour cette proposition. Les preuves partielles, dates de présence en course et annonces commerciales sont conservées, sans en déduire une fabrication certaine la même année.

| Réf. | Année proposée | Désignation | Décision | Fiche / justification |
| --- | --- | --- | --- | --- |
| 001 | 1901 | Royal Enfield première motocyclette | Ajout documenté | `1901-enfield-motor-bicycle` — La chronologie et le dossier d’archives du constructeur attestent la machine produite en 1901 ; la reconstruction Project Origin est moderne. |
| 002 | 1901 | Indian Single | Ajout documenté | `1902-indian-single` — Exemplaire TR.309934 daté 1902 par le Smithsonian ; conception 1901 et vente 1902 restent distinctes. |
| 003 | 1901 | Motosacoche A1 | Candidate | L’existence d’un premier moteur Motosacoche vers 1900–1901 ne suffit pas à identifier un A1 construit en 1901. L’exemplaire A1 muséal est référencé sur un intervalle ; aucune année arbitraire choisie. |
| 004 | 1901 | Matchless première motocyclette | Candidate | Les sources divergent entre premier essai, fabrication et commercialisation Matchless. Aucun modèle complet précis de 1901 identifié pour ce dossier. |
| 005 | 1901 | Norton première motocyclette | Ajout documenté | `1902-norton-energette` — La source officielle identifie la première machine complète comme Energette de 1902, et non une première construction 1901 ou 1905. |
| 006 | 1901 | Quadrant | Candidate | La notice du constructeur situe le développement vers 1900–1901, sans désignation ni exemplaire précis ; pays et technique restent à documenter. |
| 007 | 1901 | NSU première motocyclette | Ajout documenté | `1901-nsu-neckarsulmer` — Audi Tradition distingue les premières Neckarsulmer de 1901 à moteur Zédel des moteurs propres et de l’appellation NSU ultérieurs. |
| 008 | 1901 | Clément | Candidate | Le Science Museum conserve un moteur Clément adaptable de 1901, pas une machine complète identifiée. Ne pas attribuer automatiquement les 143 cm³ de l’Autocyclette 1903. |
| 009 | 1902 | Triumph première motocyclette | Ajout documenté | `1902-triumph-no1` — No. 1 produite en 1902 selon Triumph. La notice de Beaulieu distingue la première machine et son exemplaire JAP de 1903. |
| 010 | 1902 | FN Monocylindre | Candidate | La notice muséale cite un premier monocylindre 133 cm³ en 1901, mais son objet est de 1911. Une machine FN précise de 1902 reste à identifier. |
| 011 | 1902 | BAT Motorcycle | Candidate | Début d’activité de Batson vers 1902 documenté rétrospectivement, mais pas de modèle 1902 précis. Le V-twin de 1912 n’est pas transféré. |
| 012 | 1902 | Humber Motorcycle | Ajout documenté | `1902-humber-275` — Objet Science Museum 1925-36, construit par Humber Limited à Beeston en 1902. Les 350 cm³ de l’autre référence ne sont pas transposés. |
| 013 | 1902 | Simplex | Candidate | Simplex est un nom homonyme ; aucun pays, modèle et exemplaire de 1902 suffisamment identifiés. Aucune référence historique n’est créée pour combler ce manque. |
| 014 | 1902 | California Motor Company | Ajout documenté | `1902-california-motor-bicycle` — Objet restauré L2020.2301.001 daté 1902 par le SFO Museum ; les modifications de la traversée de Wyman en 1903 ne sont pas attribuées à cet exemplaire. |
| 015 | 1903 | Harley-Davidson prototype | Candidate | Les premières machines de 1903 sont décrites par le musée, mais ce dossier ne permet pas de distinguer un prototype précis d’une version produite. |
| 016 | 1903 | Harley-Davidson première production | Candidate | Ne pas créer une seconde fiche uniquement à partir du libellé première production : identification et différence avec le prototype encore à établir. |
| 017 | 1903 | New Werner | Candidate | La New Werner doit être distinguée du premier type déjà présent (ID 23). Millésime 1903, variante mécanique et exemplaire précis non établis dans ce lot. |
| 018 | 1903 | Laurin & Klement | Ajout documenté | `1903-laurin-klement-bz` — L’exemplaire restauré du Škoda Museum est daté 1903 ; présentation automne 1902 et production 1902–1904 distinctes. La référence BZ 1908 n’est pas une nouvelle génération démontrée. |
| 019 | 1903 | Husqvarna première motocyclette | Candidate | Le constructeur confirme une motorised bicycle produite en 1903 ; une désignation et une version technique suffisamment précises restent à identifier. |
| 020 | 1903 | Chater-Lea | Candidate | Les archives décrivent des éléments Chater-Lea et des moteurs JAP : un cadre fourni ne suffit pas à identifier la marque d’une machine complète construite en 1903. |
| 021 | 1903 | René Gillet | Candidate | Une René Gillet V-twin de 1910 est répertoriée par le musée, sans prouver la machine générique de 1903. |
| 022 | 1903 | Evart-Hall | Candidate | Le périodique de janvier 1903 décrit une offre Evart-Hall ; version exacte et date de fabrication non établies ici. Ne pas confondre avec le quatre-cylindres Binks ultérieur. |
| 023 | 1903 | Aeolus | Candidate | L’existence même de l’Aeolus proposée est mise en doute par l’étude spécialisée. Ne pas confondre avec Bown-Aeolus de 1914. |
| 024 | 1903 | DOT | Candidate | 1903 est une date de société ; la notice atteste la compétition de 1908 mais pas un modèle construit précisément en 1903. |
| 025 | 1904 | Peugeot 2½ HP | Candidate | Le musée conserve une Peugeot 500 cm³ de 1904 ; sa correspondance avec la désignation 2½ HP n’est pas démontrée. |
| 026 | 1904 | Elleham | Candidate | Le lancement Elleham est situé en 1904 ; les 734 cm³ de la machine muséale 1908 ne sont pas transposés à une machine 1904 sans version identifiée. |
| 027 | 1904 | Veloce | Candidate | Le type Veloce 2 HP est documenté pour Taylor Gue en 1905 ; la construction 1904 proposée n’est pas établie. |
| 028 | 1904 | Yale-California | Candidate | Un catalogue Yale-California 1905 est référencé ; identité, date et lien exact avec California 1904 restent à démontrer. |
| 029 | 1904 | Alcyon | Candidate | Production Alcyon et présence en course attestées en 1904 ; la date de l’événement ne date pas la fabrication d’une version commerciale précise. |
| 030 | 1904 | Hercules | Candidate | Hercules peut désigner la marque allemande ou Curtiss-Hercules aux États-Unis. Le choix de constructeur n’est pas fait implicitement. |
| 031 | 1904 | Stimula | Candidate | Les annonces mêlent moto, tricar et saison 1905 ; aucune version construite en 1904 attribuée arbitrairement. |
| 032 | 1905 | FN Four | Ajout documenté | `1905-fn-four` — Exemplaire du Franschhoek Motor Museum daté circa 1905 ; aucune date exacte de prototype déduite. |
| 033 | 1905 | Triumph 3 HP | Ajout documenté | `1905-triumph-3hp` — Exemplaire 1905 de Nick Jonckheere décrit et essayé à Beaulieu ; les 292 cm³ du modèle JAP 1903 ne sont pas transférés. |
| 034 | 1905 | Norton première production | Réutilisée | `1902-norton-energette` — La source officielle identifie la première machine complète comme Energette de 1902, et non une première construction 1901 ou 1905. |
| 035 | 1905 | Excelsior | Candidate | Excelsior est ambigu entre plusieurs constructeurs, notamment britannique et américain. La moto britannique 1896 existante n’est pas réutilisée automatiquement. |
| 036 | 1905 | Merkel | Candidate | Des Merkel antérieurs et un Model A muséal 1907 sont documentés ; ils n’identifient pas un modèle précis de 1905. |
| 037 | 1905 | Wanderer | Candidate | Annonce Wanderer publiée en 1905, mais une offre commerciale ne date pas la construction d’un exemplaire. Les 300 cm³ de 1908 ne sont pas transposés. |
| 038 | 1905 | Victoria | Candidate | Les sources distinguent prototype 1901, série 1903 et automobile doctor car de 1905. Une Victoria moto 1905 précise reste à identifier. |
| 039 | 1905 | AJS | Candidate | La date 1905 ne suffit pas à établir une AJS complète. Le musée situe la première AJS en 1910 ; l’activité des Stevens n’est pas assimilée à un modèle AJS. |
| 040 | 1905 | Austral | Candidate | Les documents Austral de 1905 concernent notamment un mototricycle. Ne pas le compter comme moto à deux roues. Version exacte et construction à préciser. |
| 041 | 1906 | BSA première motocyclette | Candidate | Les chronologies BSA divergent : sources récentes 1910, brochure 1961 mentionnant 1909. La proposition 1906 et l’identité exacte de la première machine restent à vérifier. |
| 042 | 1906 | Douglas | Candidate | La notice constructeur du Science Museum situe les ventes sous le nom Douglas en 1907. Une Douglas complète de 1906 n’est pas établie. |
| 043 | 1906 | Achille | Candidate | Achille doit être distingué d’Achilles d’Ober-Politz et des homonymes automobiles ; aucune attribution automatique de la machine 1906. |
| 044 | 1906 | Bradbury | Candidate | Le musée conserve une Bradbury monocylindre 500 cm³ de 1906 ; désignation commerciale et version exactes restent à identifier avant insertion d’un modèle. |
| 045 | 1906 | Roland | Candidate | Le catalogue Roland 1906 distingue les Types A et B. Aucun choix arbitraire ni mélange des deux versions. |
| 046 | 1906 | Griffon | Candidate | Plusieurs Griffon 1906 sont décrites dans les documents ; monocylindres et bicylindres doivent être distingués. |
| 047 | 1907 | Harley-Davidson Strap Tank | Candidate | Le lot moteur 1877 est reconstitué avec des éléments de plusieurs années. Il ne prouve pas un original homogène Strap Tank de 1907. |
| 048 | 1907 | Indian Single nouvelle génération | Ajout documenté | `1907-indian-single` — Exemplaire de 1907 et évolution du Single documentés ; le cadre de 1908 et les chiffres de tous les modèles ne sont pas transférés. |
| 049 | 1907 | René Gillet V-Twin | Candidate | La machine bicylindre décrite par le spécialiste est datée 1906 ; elle n’établit pas la variante demandée de 1907. |
| 050 | 1907 | Terrot première motocyclette | Candidate | Les Archives nationales situent les premières motos Terrot dès 1902. Les N°1 et N°2 diffèrent ; ne pas choisir l’une pour fabriquer une première moto 1907. |
| 051 | 1908 | Indian Twin | Ajout documenté | `1908-indian-twin-t961` — Objet restauré en 2002, collection Mann et ancien musée Otis Chandler, attribué à 1908 par le catalogue RM Sotheby’s. Cette datation est celle de l’exemplaire, pas celle du premier Twin. |
| 052 | 1908 | Thor Model 7 | Candidate | Témoignage de conduite d’un Thor Model 7 de collection privée ; datation et identité non corroborées par une archive indépendante. |
| 053 | 1908 | Motosacoche 1908 | Candidate | Le musée mentionne Motosacoche 1908 et A1 sur un intervalle 1900–1910 ; le rapprochement exact des deux notices et de l’exemplaire doit être confirmé. |
| 054 | 1908 | Cito | Candidate | La collection répertorie une Cito monocylindre de 1908, mais sans désignation commerciale ni version exacte. Pas de fiche générique inventée. |
| 055 | 1908 | Wanderer 300 | Candidate | La collection répertorie Wanderer 1908, 300 cm³ et un cylindre ; la désignation et la version précise du modèle restent à vérifier. |
| 056 | 1908 | Elleham 1908 | Candidate | Deux exemplaires Elleham 1908 de 734 cm³ sont listés ; ils ne deviennent pas deux modèles indépendants sans identification des variantes. |
| 057 | 1908 | Laurin & Klement BZ | Réutilisée | `1903-laurin-klement-bz` — L’exemplaire restauré du Škoda Museum est daté 1903 ; présentation automne 1902 et production 1902–1904 distinctes. La référence BZ 1908 n’est pas une nouvelle génération démontrée. |
| 058 | 1908 | Aiglon | Candidate | La date 1908 retrouvée pour Aiglon ne suffit pas à identifier une machine précise construite cette année-là. |
| 059 | 1908 | W.E. Brough | Candidate | L’historique distingue W.E. Brough, premières machines 1902 et bicylindre 1910. Ne pas confondre avec Brough Superior ni créer une version générique 1908. |
| 060 | 1909 | Harley-Davidson V-Twin | Ajout documenté | `1909-harley-5d` — Le dossier Harley-Davidson décrit les 5-D construits en 1909 et l’exemplaire conservé aux archives ; distinct des monocylindres et du 7-D de 1911. |
| 061 | 1909 | Pierce Four | Ajout documenté | `1910-pierce-four` — Barber conserve une Four de 1910 ; la famille est commercialisée en 1909 et les essais antérieurs décrits par Stein ne datent pas la fabrication de cet exemplaire. |
| 062 | 1909 | Reading Standard | Ajout documenté | `1909-reading-standard-x102` — Modèle X1-02 et exemplaire 1909 du National Motorcycle Museum. Les spécifications restent propres à cette notice. |
| 063 | 1909 | Royal Pioneer | Ajout documenté | `1909-royal-pioneer` — Modèle et exemplaire de 1909 documentés par le musée ; le lot Chandler constitue une autre référence d’objet et ses chiffres ne sont pas mélangés. |
| 064 | 1909 | Scott 333 | Ajout documenté | `1908-scott-333` — Le club distingue six machines fabriquées sous contrat chez Jowett en 1908 des 450 cm³ fabriquées en 1909. |
| 065 | 1909 | Griffon 5 HP | Candidate | Documents Griffon 5 HP antérieurs retrouvés ; version et construction de l’exemplaire 1909 non établies. |
| 066 | 1909 | Calthorpe | Candidate | Le type 3½ HP White & Poppe est exposé au salon de 1909. Présentation attestée, date de fabrication non suffisamment établie pour ce dossier. |
| 067 | 1909 | Rudge-Whitworth première motocyclette | Ajout documenté | `1910-rudge-prototype` — Première machine assemblée le 27 juillet 1910 selon l’historique spécialisé, corroborée par Russell p.198 ; vente publique en 1911. |
| 068 | 1910 | Husqvarna Moto-Rêve | Candidate | Le Model 65 Moto-Rêve est documenté, mais des chronologies divergent entre 1910 et 1911 et sur 274/298 cm³. Pas de valeur ni d’année choisie arbitrairement. |
| 069 | 1910 | New Imperial Light Tourist | Candidate | La chronologie Light Tourist 1910 est contestée par l’étude spécialisée ; une machine de 1914 ne doit pas être ramenée à 1910. |
| 070 | 1910 | BSA première motocyclette entièrement BSA | Candidate | La première BSA complète est située en 1910 par des sources récentes ; une brochure ancienne indique 1909 et le spécimen précis du BMCT est de 1911. Identification et conflit à arbitrer. |
| 071 | 1910 | Rudge-Whitworth première gamme | Réutilisée | `1910-rudge-prototype` — Première machine assemblée le 27 juillet 1910 selon l’historique spécialisé, corroborée par Russell p.198 ; vente publique en 1911. |
| 072 | 1910 | AJS V-Twin | Candidate | Les sources distinguent les monocylindres A/B de 1910 et un bicylindre nouveau annoncé en 1911 pour 1912 ; l’attribution V-Twin 1910 reste litigieuse. |
| 073 | 1901–1910 | Austral Tricar | Candidate | Tricar Austral physiquement photographié en course en 1906 ; présence ne suffit pas à dater la fabrication de cet exemplaire. Dossier apparenté distinct. |
| 074 | 1901–1910 | Rochet Tricycle | Candidate | Rochet Tricycle : preuve suffisante d’un exemplaire construit dans la période non obtenue. Ne pas emprunter les données Rochet-Bruneau. |
| 075 | 1901–1910 | Orient Tricycle | Candidate | Les objets Orient clairement datés retrouvés concernent surtout 1900. Ne pas utiliser la moto à deux roues ou le Buckboard à quatre roues pour cette entrée. |

## Sources historiques et fiabilité

Les références suivantes ont été retenues pour des faits confirmés ou pour délimiter les candidates. Une référence partielle ne valide pas tous les champs d’une fiche. A est réservé aux documents primaires/officiels de ce lot ; B aux notices muséales et travaux spécialisés ; C aux éléments secondaires insuffisants pour une insertion définitive. Les niveaux historiques des sources partagées déjà présentes dans la base ne sont pas rétroactivement réécrits ; chaque nouvelle assertion conserve son niveau propre.

Chaque source intégrée conserve titre, auteur/organisme, URL, date de publication connue ou null, date de consultation, type, fiabilité et champs confirmés. Les champs de candidate n’ont pas de prétendue confirmation. Les consultations de recherche du 5 novembre sont conservées, l’intégration et le rapport étant terminés le 6 novembre.

- [Répertoire — catalogue Yale-California 1905](https://library.amf.foundation/pages/search.php?access=&advsearch=true&archive=0&display=xlthumbs&foredit=&k=&modal=&noreload=true&offset=826&order_by=field12&per_page=240&recentdaylimit=&restypes=&search=&sort=DESC) — AMF Vintage Motorcycle Library ; niveau éditorial B ; archive ; publication non datée.
- [1908 Thor Model 7 — témoignage de conduite d’un objet privé](https://motolady.com/1908-thor-model-7-motorcycle/) — Alicia Mariah Elfving / Krystal Hess ; niveau éditorial C ; documented_private_collection ; publication non datée.
- [Achilles — machines d’Ober-Politz](https://achilles-werke.de/achilles-fabrikationen/mopeds-und-motorroller-2/) — Archives Achilles ; niveau éditorial C ; secondary ; publication non datée.
- [Terrot — notice des Archives nationales du monde du travail](https://www.archivesnationales.culture.gouv.fr/camt/fr/egf/donnees_efg/2002_026/Pieces_isolees_icono_INV.pdf) — Archives nationales ; niveau éditorial A ; archive ; publication non datée.
- [Audi AG — histoire de NSU](https://www.audi-mediacenter.com/system/production/uploaded_files/24123/file/8f33886885fa55d408bf7577841fbfce0680828f/AUDI_AG_Historie_Kurzversion_EN.pdf?1691658833=&disposition=attachment) — Audi AG ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [150 Jahre NSU — Neckarsulmer Fahrradwerke et premiers moteurs Zédel](https://audi-touchscreen-150-jahre-nsu.timm4.de/touchscreen-1/en/unternehmen) — Audi Tradition ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [BSA 100 Years, 1961 — chronologie ancienne](https://www.bsafiles.se/history/BSA_100_Years_1961.pdf) — BSA ; niveau éditorial A ; manufacturer_catalog ; publication 1961.
- [History — première moto complète BSA 1910](https://bsacompany.ph/history/) — BSA Motorcycles ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Collection — Pierce Four 1910](https://www.barbermuseum.org/collection/) — Barber Vintage Motorsports Museum ; niveau éditorial B ; museum ; publication non datée.
- [110-year-old motorcycle rides into Beaulieu — Triumph 3HP 1905](https://www.beaulieu.co.uk/news/110-year-old-motorcycle-rides-into-beaulieu/) — Beaulieu — National Motor Museum ; niveau éditorial B ; museum ; publication non datée.
- [Canale sur Alcyon à la course du 22 avril 1904 — photographie](https://catalogue.bnf.fr/ark%3A/12148/cb466314845) — Bibliothèque nationale de France ; niveau éditorial A ; archive ; publication non datée.
- [Catalogue — historique BAT dans la notice 1912](https://images1.bonhams.com/original?src=Images%2Flive%2F2023-01%2F13%2FS-28798-0-1.pdf) — Bonhams ; niveau éditorial B ; documented_private_collection ; publication non datée.
- [Collection — BSA 3.5HP 1911 et premières motos 1910](https://www.bmct.org/the-collection) — British Motorcycle Charitable Trust ; niveau éditorial B ; museum ; publication non datée.
- [First Brough Motorcycles — W.E. Brough](https://www.brough-superior.com/en/heritage/first-brough-motorcycles) — Brough Superior ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Calthorpe — historique](https://calthorpe.info/company-history) — Calthorpe Club ; niveau éditorial B ; historical_book ; publication non datée.
- [The trend to standardization: product development in the British motor cycle industry 1896–1916](https://openaccess.city.ac.uk/id/eprint/14789/) — Bernard Russell ; niveau éditorial B ; historical_book ; publication 1985.
- [La Vie Automobile 1906, p.117 — course et tricar Austral](https://cnum.cnam.fr/pgi/fpage.php?P575.3/122/100/874/0/0=) — Cnam — Cnum ; niveau éditorial A ; technical_publication ; publication 1906.
- [La Vie Automobile, 1905 — mototricycle Austral p.583–585](https://cnum.cnam.fr/pgi/redir.php?ident=P575.2&onglet=i) — Cnam — Cnum ; niveau éditorial A ; technical_publication ; publication 1905.
- [Humber 2.75HP — machine du prince Albert I](https://www.mtcc.mc/portfolio/humber-275-hp/) — Collection des voitures de S.A.S. le Prince de Monaco ; niveau éditorial B ; museum ; publication non datée.
- [Aeolus — identification et existence à confirmer](https://cybermotorcycle.com/marques/british/aeolus.htm) — Cybermotorcycle ; niveau éditorial C ; secondary ; publication non datée.
- [Collection 1897–1925 — exemples datés](https://www.danmarksmotorcykelmuseum.dk/en/mc-1897-1925/) — Danmarks Motorcykelmuseum ; niveau éditorial B ; museum ; publication non datée.
- [Ellehammer — histoire technologique danoise](https://www.danmarksteknologihistorie.dk/ellehammer-danmarks-edison/) — Danmarks Teknologihistorie ; niveau éditorial B ; secondary ; publication non datée.
- [Alcyon — chronologie constructeur](https://www.ffve.org/carte/alcyon-automobiles) — FFVE ; niveau éditorial B ; secondary ; publication non datée.
- [Collection — c1905 FN Four](https://www.fmm.co.za/on-display/) — Franschhoek Motor Museum ; niveau éditorial B ; museum ; publication non datée.
- [Two Wheelin’: FN Four — exemplaire circa 1905](https://www.fmm.co.za/two-wheelin-fn-four/) — Franschhoek Motor Museum ; niveau éditorial B ; museum ; publication non datée.
- [Villa d’Este 2019 — René Gillet bicylindre 1906](https://www.moto-collection.org/blog/villa-deste-2019-vive-la-france/) — François-Marie Dumas ; niveau éditorial B ; specialist_press ; publication non datée.
- [Collection — 1904 Curtiss Hercules Single Cylinder](https://glennhcurtissmuseum.org/exhibits-on-display/) — Glenn H. Curtiss Museum ; niveau éditorial B ; museum ; publication non datée.
- [1909 Royal Pioneer — moteur 786, collection Otis Chandler](https://www.goodingco.com/lot/1909-royal-pioneer/) — Gooding Christie’s ; niveau éditorial B ; documented_private_collection ; publication 2006.
- [The Heart of a Harley-Davidson Motorcycle — Model 5-D, p.28](https://www.harley-davidson.com/content/dam/h-d/documents/owners/hog/h-o-g-magazine-archive/canada/content-tile-2011-spring.pdf) — Harley-Davidson ; niveau éditorial A ; manufacturer_catalog ; publication 2011.
- [The Brand — début des motos en 1903](https://press.husqvarna-motorcycles.com/Info.aspx?l=international&menueid=7460) — Husqvarna Motorcycles ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Husqvarna Era 1911–1920 — Model 65](https://www.husqvarna-motorcycles.com/en-ph/Good-old-times/husqvarna-era-1911-1920.html) — Husqvarna Motorcycles ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Stimula — documents de motos et tricars](https://lestricars.es.tl/Stimula.htm) — Les Tricars ; niveau éditorial C ; secondary ; publication non datée.
- [Harley-Davidson Strap Tank — moteur 1877, reconstruction composite](https://www.mecum.com/lots/435701/) — Mecum ; niveau éditorial B ; documented_private_collection ; publication non datée.
- [Husqvarna / Moto-Rêve — Model 65](https://www.moto-reve.de/english/history/huqvarna--moto-reve/index.html) — Moto-Rêve History ; niveau éditorial B ; secondary ; publication non datée.
- [Société industrielle d’Albert — catalogue Roland 1906](https://motocyclettesaustral.es.tl/La-Soci-e2-t-e2--Industrielle-d-h-Albert.htm) — Motocyclettes Austral ; niveau éditorial C ; secondary ; publication non datée.
- [Collection — exemplaire Motosacoche 1908](https://www.museovehiculosguadalest.com/en/museum-vehicles-guadalest/) — Museo de Vehículos Históricos Guadalest ; niveau éditorial B ; museum ; publication non datée.
- [Inventaire — Motosacoche A1 1900–1910](https://www.museovehiculosguadalest.com/en/list-of-vehicles/) — Museo de Vehículos Históricos Guadalest ; niveau éditorial B ; museum ; publication non datée.
- [FN — exemplaire 1911 et historique du monocylindre](https://museudocaramulo.pt/en/colecoes/fn-2/) — Museu do Caramulo ; niveau éditorial B ; museum ; publication non datée.
- [Legends in Chrome and Steel — Victoria](https://artsandculture.google.com/story/legends-in-chrome-and-steel-museum-for-industrial-culture-nuremberg/LAVxyFEdYeKLIA?hl=en) — Museum for Industrial Culture Nuremberg ; niveau éditorial B ; museum ; publication non datée.
- [Harley-Davidson — chronologie des premiers moteurs](https://www.museumofamericanspeed.org/2harleydavidson.html) — Museum of American Speed ; niveau éditorial B ; museum ; publication non datée.
- [L’Épopée fantastique — René Gillet V-Twin 1910](https://chateaudecompiegne.fr/sites/compiegne/files/dp_epopeefantastique_palaisdecompiegne_.pdf) — Musée national de la Voiture ; niveau éditorial B ; historical_book ; publication non datée.
- [Triumph 2.5HP — exemplaire 1903 et historique 1902](https://nationalmotormuseum.org.uk/collections/vehicles/triumph-25hp/) — National Motor Museum ; niveau éditorial B ; museum ; publication non datée.
- [1909 Royal Pioneer](https://nationalmcmuseum.org/featured-bikes/1909-royal-pioneer/) — National Motorcycle Museum ; niveau éditorial B ; museum ; publication non datée.
- [1909 Reading Standard X1-02](https://nationalmcmuseum.org/2019/02/08/1909-reading-standard-x1-02/) — National Motorcycle Museum ; niveau éditorial B ; museum ; publication 2019-02-08.
- [1907 Indian — exemplaire Camel Back](https://nationalmcmuseum.org/2022/11/04/1907-indian/) — National Motorcycle Museum ; niveau éditorial B ; museum ; publication 2022-11-04.
- [Norton Motorcycles — Energette 1902–1903](https://nationalmotorcyclemuseum.com.au/norton-motorcycles.htm) — National Motorcycle Museum Australia ; niveau éditorial B ; museum ; publication non datée.
- [The Story of AJS Motorcycles — premier monocylindre 1910](https://www.nationalmotorcyclemuseum.co.uk/from-single-cylinders-to-racing-legends-the-story-of-ajs-motorcycles/) — National Motorcycle Museum UK ; niveau éditorial B ; museum ; publication 2023-01-17.
- [The Motorcycle Industry in New York State — Pierce Cycle Company, p.108–111](https://nysm.nysed.gov/sites/default/files/motorcycle_industry_in_nys-geoff_stein.pdf) — Geoffrey N. Stein ; niveau éditorial B ; historical_book ; publication 2001.
- [Norton Motorcycles: A Legacy of Heritage, Innovation and Resurgence](https://www.nortonresurgence.com/en/norton-heritage/norton-motorcycles-a-legacy-of-heritage%2C-innovation-and-resurgence.html) — Norton ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [1908 Indian Twin — moteur T961, collection Mann](https://rmsothebys.com/auctions/mo26/lots/s0021-1908-indian-twin/) — RM Sotheby’s ; niveau éditorial B ; documented_private_collection ; publication 2026.
- [Our Legacy — brochure Royal Enfield](https://www.royalenfield.com/content/dam/royal-enfield/united-kingdom/home/banner/desktop/A4_Brochure.pdf) — Royal Enfield ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Since 1901 — Royal Enfield](https://www.royalenfield.com/in/en/our-world/since-1901/) — Royal Enfield ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Project Origin — archives de la Motor-Bicycle de 1901](https://www.royalenfield.com/content/dam/royal-enfield/united-kingdom/our-world/media/news/product-launches/project-origin/retta-120-show.pdf) — Royal Enfield ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Rudge-Whitworth Model History — première machine du 27 juillet 1910](https://www.rudge-whitworth.com/the-motorcycles/model-history) — Rudge-Whitworth Club ; niveau éditorial B ; historical_book ; publication non datée.
- [Early American Motorcycles — exposition et objets](https://www.sfomuseum.org/exhibitions/early-american-motorcycles/gallery) — SFO Museum ; niveau éditorial B ; museum ; publication non datée.
- [Archives J. A. Prestwich — cadres et composants Chater-Lea](https://discovery.nationalarchives.gov.uk/download/GB%200069%20JAP) — Science Museum / National Archives ; niveau éditorial A ; archive ; publication non datée.
- [Douglas Kingswood Limited — début des ventes 1907](https://collection.sciencemuseumgroup.org.uk/people/cp39676/douglas-kingswood-limited) — Science Museum Group ; niveau éditorial B ; museum ; publication non datée.
- [Clément 1.3 HP clip-on engine, 1901 — composant](https://collection.sciencemuseumgroup.org.uk/objects/co25362/clement-1-3-h-p-clip-on-engine-1901) — Science Museum Group ; niveau éditorial B ; museum ; publication non datée.
- [Dot Cycle & Motor Manufacturing Company — notice constructeur](https://collection.sciencemuseumgroup.org.uk/people/ap2036/dot-cycle-motor-manufacturing-company-limited) — Science Museum Group ; niveau éditorial B ; museum ; publication non datée.
- [Quadrant Cycle Company Limited — notice constructeur](https://collection.sciencemuseumgroup.org.uk/people/cp60456/quadrant-cycle-company-limited) — Science Museum Group ; niveau éditorial B ; museum ; publication non datée.
- [Humber motorcycle, 1902 — 1925-36](https://collection.sciencemuseumgroup.org.uk/objects/co24380/humber-motorcycle) — Science Museum Group ; niveau éditorial B ; museum ; publication non datée.
- [Models — Veteran Machines 1908–1909](https://scottownersclub.org/models/) — Scott Owners Club ; niveau éditorial B ; historical_book ; publication non datée.
- [Indian Motorcycle, 1902 — Smithsonian Collection](https://repository.si.edu/bitstreams/18eed3d2-9ec8-4ba5-8816-ef785b9413a2/download) — Smithsonian Institution ; niveau éditorial B ; historical_book ; publication non datée.
- [Indian Motorcycle, 1902 — TR.309934](https://americanhistory.si.edu/collections/object/nmah_843056) — Smithsonian — National Museum of American History ; niveau éditorial B ; museum ; publication non datée.
- [Griffon — modèles et documents de 1905–1906](https://www.shcourbevoie.fr/griffon/) — Société historique de Courbevoie ; niveau éditorial B ; secondary ; publication non datée.
- [Terrot N°1 et N°2 de 1902](https://terrot-club-ballancourt.fr/musee-terrot/motocyclette-n1-2/) — Terrot Club Ballancourt ; niveau éditorial B ; secondary ; publication non datée.
- [A to Z: New Imperial — contestation de la chronologie 1910](https://www.classicmotorcycle.co.uk/a-to-z-classic-reference-new-imperial-norman/) — The Classic Motorcycle ; niveau éditorial B ; specialist_press ; publication non datée.
- [The Motor, 21 janvier 1903 — Evart-Hall](https://graces-guide-s3-live.s3.amazonaws.com/gracesguide/4/43/Motor-19030121.pdf) — The Motor ; niveau éditorial A ; technical_publication ; publication 1903-01-21.
- [The Motor Cycle, 16 novembre 1911, p.1210 — transcription](https://cybermotorcycle.com/articles/olympia-show-1911-p1210.htm) — The Motor Cycle ; niveau éditorial B ; technical_publication ; publication non datée.
- [The Motor Cycle, 22 novembre 1909, p.913 — transcription](https://cybermotorcycle.com/marques/calthorpe/calthorpe-1909.htm) — The Motor Cycle ; niveau éditorial B ; technical_publication ; publication non datée.
- [Brand Timeline — No. 1 de 1902](https://www.triumphmotorcycles.co.uk/our-story/brand-timeline) — Triumph ; niveau éditorial A ; manufacturer_catalog ; publication non datée.
- [Veloce 2 HP — Taylor Gue, 1905](https://velocetteclub.nl/?page_id=721) — Velocette Club Nederland ; niveau éditorial B ; secondary ; publication non datée.
- [Documentation Motosacoche — chronologie](https://sammlung.verkehrshaus.ch/en/collection/item/163963/) — Verkehrshaus der Schweiz ; niveau éditorial B ; museum ; publication non datée.
- [Archives municipales — Austral, p.84](https://www.puteaux.fr/wp-content/uploads/2025/06/393-juin-2025-V4.pdf) — Ville de Puteaux ; niveau éditorial A ; archive ; publication non datée.
- [Österreichische Fahrrad- und Automobil-Zeitung, 10 août 1905, p.18](https://anno.onb.ac.at/cgi-content/anno?aid=ofa&datum=19050810&seite=18) — Österreichische Nationalbibliothek ; niveau éditorial A ; archive ; publication non datée.
- [Rétromobile — Laurin & Klement BZ et 125 ans de compétition](https://cdn.skoda-storyboard.com/2026/01/260129_Retromobile-exhibition-commemorate-the-125th-anniversary-of-Skoda-Motorsport_c32d950e.pdf) — Škoda Auto ; niveau éditorial A ; manufacturer_catalog ; publication 2026-01-29.
- [Laurin & Klement BZ (1902–1904) — exemplaire du musée 1903](https://www.skoda-storyboard.com/en/press-kits/classic-days-2026-press-kit/laurin-klement-bz-1902-1904/) — Škoda Auto ; niveau éditorial A ; manufacturer_catalog ; publication 2026-10-12.

Pour les propositions sans source suffisamment précise (notamment certains homonymes ou modèles génériques), la liste expose l’absence de référence retenue : aucune notice fictive n’a été créée pour remplir les champs.

## Iconographie Commons

L’API Commons a été interrogée avec les noms des constructeurs, modèles et années, puis les recherches de cinq versions ont été affinées par titre. Le pipeline conserve les anciens résultats et ne relance que les nouvelles requêtes. `imageinfo` et `extmetadata` fournissent miniature, original haute définition, auteur, licence et page du fichier. Chaque fichier est approuvé séparément après contrôle visuel.

Quatre nouvelles photos sont intégrées en WebP local 480/800/1600 avec attribution et liens de licence/source :

- [Four — exemplaire circa 1905](https://commons.wikimedia.org/wiki/File:1905_FN_Four_Cylinder_Petersen_Automotive_Museum.jpg) — TaurusEmerald ; CC BY-SA 4.0 ; correspondance `approximate`. FN Four 1905 exposée au Petersen Museum, autre exemplaire que celui du Franschhoek Motor Museum. La photo illustre le modèle sans attribuer ses caractéristiques à cet exemplaire.
- [Model 5-D — V-Twin](https://commons.wikimedia.org/wiki/File:Harley-Davidson_Museum_December_2023_04_(1909_Model_5-D--Atmospheric-Valve_V-Twin_and_1906_Model_2--Atmospheric-Valve_Single).jpg) — Michael Barera ; CC BY-SA 4.0 ; correspondance `exact`. La 5-D de 1909 est la moto grise à gauche, à moteur V-twin et pancarte 1909. La moto noire à droite est un monocylindre Model 2 de 1906, distinct et non décrit par cette fiche.
- [Neckarsulmer Motorrad — moteur Zédel](https://commons.wikimedia.org/wiki/File:Neckarsulmer_Motorrad_1901_01.jpg) — Huhu Uet ; CC BY 3.0 ; correspondance `exact`. Neckarsulmer Motorrad de 1901, moteur Zédel identifiable sur le carter. Les 230 cm³ indiqués par Commons ne sont pas importés comme caractéristique vérifiée de la première série.
- [Four — exemplaire Barber 1910](https://commons.wikimedia.org/wiki/File:1910PierceFour-Barber.jpg) — DrReload ; CC BY-SA 4.0 ; correspondance `exact`. Pierce Four de 1910 photographiée au Barber Vintage Motorsports Museum, cohérente avec le catalogue de cet objet. Aucun chiffre technique d’un autre millésime n’est transféré.

La FN du Petersen est explicitement un autre exemplaire que celui du Franschhoek Motor Museum. La photo du 5-D distingue la moto grise de 1909 à gauche du monocylindre noir de 1906 à droite. Les chiffres figurant seulement dans Commons ne sont pas importés comme faits techniques vérifiés. Les autres vues, répliques, moteurs isolés, millésimes incompatibles et fichiers non identifiés restent écartés. Les 14 autres fiches utilisent le remplacement existant. Le mécanisme de cache hors ligne existant prend en charge les nouveaux WebP ; aucune dépendance exclusive aux images distantes n’est ajoutée.

## Statistiques et séparation des véhicules apparentés

Le focus 1901–1910 compte 17 familles de motos à deux roues, 1 variante documentée affichée séparément, 1 prototype, 0 machine spécifiquement validée comme version de compétition, 4 dates de commercialisation et 6 débuts de production documentés dans la période. Le 5-D de 1909 est distinct d’une version de compétition non démontrée. Le prototype Rudge est compté en construction, mais sa vente de 1911 est exclue du compteur commercial de la période.

Les 3 dossiers Austral Tricar, Rochet Tricycle et Orient Tricycle restent en attente dans une section apparentée. Ils ne contribuent ni au total des motos à deux roues ni à un faux total de constructions datées 1901–1910. Cela ne signifie pas que ces familles n’ont pas existé : la construction du modèle précis dans cette période reste insuffisamment établie.

Le tableau de bord compte les familles une seule fois : 14 familles/fiches du périmètre ont une revue validée ; 58 fiches ou références nécessitent un approfondissement (54 candidates séparées, 3 conflits et la Peugeot ZL préexistante dont seule la présentation 1901 est datée). Les chiffres ne constituent pas une estimation de la totalité des motos construites dans le monde. Les répartitions par constructeur, pays et motorisation utilisent uniquement les constructions documentées. La période 1890–1900 garde ses 7 constructions documentées, dont 3 tricycles séparés.

## Modifications de données et migration

- 18 véhicules sont ajoutés avec identifiants techniques stables distincts des références de travail ; aucun des 34 véhicules précédents n’est modifié ou supprimé.
- Nouvelle édition documentaire facultative `research_batches` : 75 références, sources, décisions et candidates sans `vehicle_id`. Les dates des candidates restent typées mais inconnues et leurs données techniques restent nulles.
- Champ facultatif `historical_manufacturer`, textuel ou null, seulement sur les nouvelles fiches ; les noms historiques ne modifient pas arbitrairement les constructeurs précédents.
- Validation étendue pour les liens de sources des candidates, leurs valeurs inconnues et leurs groupes séparés. Un dossier ne peut pas être déclaré construit par un import mal formé.
- La migration éditoriale IndexedDB ajoute les fiches et le lot avec sauvegarde préalable, une seule incrémentation de révision, sans perte de favoris, consultations, notes ou modifications locales. Les sources manquantes des candidates sont ajoutées même si tous les véhicules ont déjà été importés.
- Schéma physique IndexedDB v2 et schéma de catalogue 2 conservés : les extensions sont facultatives et les exports JSON/CSV restent sans perte. Les anciennes versions continuent à être lues.
- Un ancien générateur relancé ne rétrograde plus le marqueur de version du catalogue récent.

## Fichiers concernés

Données : `data/verified-1901-1910.json`, `data/research-1901-1910.json`, `data/migrations/catalogue-34-before-1901-1910.json`, catalogue d’images/modèles/revues, fichiers publics d’inventaire, crédits et 12 nouveaux WebP.

Génération et vérification : `scripts/add-1901-1910.mjs`, `scripts/prepare-1901-media.mjs`, `scripts/commons_sync.py`, `scripts/test_commons.py`, adaptation du générateur 1890–1900 et `package.json`.

Domaine/interface : `src/history/domain.js`, `period.js`, `PeriodPanel.jsx`, `Workspace.jsx`, `Detail.jsx`, `seed-update.js`, `history.css`. Les lots disposent d’une recherche et d’un filtre de décision/apparentés ; les filtres d’inventaire ne transforment pas les années proposées en dates de construction.

Tests/documentation : `tests/period-1901-1910.test.js`, fixture du test 1890–1900, ce rapport, README. Les modifications non commitées des interventions antérieures ont été conservées.

## Tests et contrôle visuel

- `npm test` : **77 tests réussis** (72 tests JavaScript et 5 contrôles Python), dont 17 nouveaux scénarios 1901–1910 et le contrôle d’affinement des recherches Commons.
- Préservation exacte des 34 véhicules et des anciens constructeurs/marques ; absence de doublons ; générateur idempotent.
- Construction/commercialisation séparées ; variantes non recomptées ; dates approximatives et valeurs nulles ; sources et droits des photos.
- Migration IndexedDB avec notes, favoris, consultations et sauvegarde ; migration de métadonnées seules et sources de candidates.
- Exports puis réimports JSON/CSV sans perte ; rejet des candidates déclarées construites, valeurs techniques inventées, sources manquantes et noms historiques de type invalide.
- `npm run build` : compilation Vite et service worker Workbox réussie.
- `git diff --check` : réussi.
- Navigateur : catalogue 52, filtre de construction/prototype Rudge 1910, fiche avec vente 1911, section des trois apparentés candidats, statistiques des deux périodes, photo et attribution NSU sur écran mobile 390 px, absence de débordement horizontal.

## Anomalies et travaux restant à faire

54 références doivent encore être identifiées ou mieux documentées. Les conflits de puissance Royal Enfield/Royal Pioneer et de vitesse BZ restent ouverts. Les dates BSA, AJS, Husqvarna/Moto-Rêve et les noms homonymes ne sont pas arbitrés sans preuve. Des photos manquent pour 14 nouvelles fiches et certains documents historiques n’étaient pas accessibles ou ne désignaient pas assez précisément le modèle.

Aucun nouveau score Lighthouse n’a été mesuré. Aucun commit, push ou déploiement n’est inclus dans cette intervention. Le résultat est local et ne remplace pas la version hébergée.
