# Inventaire historique MotoPedia — schéma 2

## Périmètre et état documentaire

Le système accepte un inventaire de 1867 à aujourd’hui. Il ne prétend pas posséder un véhicule pour chaque année : 17 fiches existantes sont conservées. Aucun modèle de 1867 n’a été créé pour remplir artificiellement la chronologie. Les dates de génération des 14 modèles modernes ne disposaient pas de preuve au champ : elles sont archivées, non transformées en dates de prototype ou de production. Les données techniques reprises du catalogue sont indicatives, niveau D, jusqu’à vérification.

Copeland conserve deux assertions contradictoires (1881 dans la source secondaire ; vers 1884–1885 dans la source Smithsonian) ; aucune année unique n’est choisie. Butler conserve la conception et la construction séparément et appartient aux véhicules apparentés. L’identifiant du Reitwagen reste `15`.

## Tables et relations

`public/inventory.json` est le catalogue initial, normalisé et versionné. Les modifications documentaires sont ensuite locales à l’appareil (IndexedDB), sans serveur partagé ni synchronisation multiappareil.

- `vehicles` : identifiants stables, aliases, constructeur et marque, pays, catégorie/sous-catégorie, motorisation, usages spécialisés, statut historique, variante/génération, six dates typées, caractéristiques, production, sources, assertions, contradictions, relations et historique.
- `manufacturers` : nom usuel, nom officiel nullable, alias, pays, création/disparition nullables, histoire, site, sources, marques et événements de propriété.
- `brands` : marque et constructeur courant ; l’historique conserve les anciens rattachements. Les véhicules historiques ne changent pas automatiquement de constructeur lors d’un rachat.
- `sources` : URL, titre, auteur/organisme, publication/consultation nullables, type documentaire, niveau A–D et champs confirmés. La présence d’une référence n’est pas une vérification globale.
- `redirects` : identifiants fusionnés vers la fiche conservée. Les cycles et cibles absentes sont rejetés.
- `history` : opérations et archives de fusion.
- `legacy_archive` et `vehicle.legacy` : copie intégrale des données de départ, y compris champs anciens et provenance des médias.

Les catégories structurelles sont `motorcycle` et `related`. Les usages spécialisés (route, tout-terrain, compétition, militaire, record, expérimental) sont orthogonaux : une moto militaire ou de compétition conserve sa motorisation et sa catégorie structurelle.

### Dates

Chaque clé `design_year`, `patent_year`, `prototype_year`, `production_start_year`, `production_end_year`, `commercialization_year` contient :

```json
{"year":null,"earliest":null,"latest":null,"precision":"unknown","source_ids":[],"confidence":"D","verified":false,"note":""}
```

Précisions : `unknown`, `exact`, `approximate`, `range`, `conflicting`. Une date inconnue garde ses trois valeurs nulles. Une contradiction garde `year:null` et des bornes, avec les assertions distinctes et leurs sources. Une date de production n’est pas un remplacement automatique de date de construction. Les fiches sans construction documentée apparaissent après les autres dans l’ordre chronologique. Un intervalle qui croise la période sélectionnée est inclus, avec sa précision visible.

### Valeurs techniques

Le moteur, cylindres, cm³, ch, kW, Nm, refroidissement, transmission, rapports, démarrage, vitesse, poids, châssis, freinage et dimensions sont présents et nullables. Aucune conversion mécanique ou déduction de motorisation n’est faite pour remplir un champ. `production` garde le nombre d’exemplaires, les pays, le type, la période et les notes, avec null/listes vides quand inconnus.

### Assertions et validation

`evidence` relie un chemin de champ et une valeur à des sources, un niveau, une note et une vérification déclarée. `confidence` distingue global, dates, technique et production. La validation globale nécessite des preuves correspondant aux valeurs courantes, l’existence/construction documentées, aucun niveau D et aucune contradiction ouverte. Un niveau global ne peut dépasser le plus faible des niveaux détaillés. Une source purement iconographique ne valide pas une caractéristique technique. Modifier une source rouvre les revues concernées et invalide les anciennes déclarations de vérification, sans supprimer les assertions.

Les contradictions conservent sources, descriptions et valeurs divergentes. Une résolution ajoute une justification et des sources ; elle ne les efface pas et ne valide pas automatiquement la fiche.

## Migrations

1. `npm run migrate:history` crée `public/inventory.json` à partir du catalogue média existant. `data/migrations/catalogue-v1.json` garde la première archive ; la commande ne touche pas aux collections utilisateur. Ne pas réexécuter cette génération pour remplacer un export documentaire édité : importer cet export depuis l’application.
2. IndexedDB `motopedia`, **v1 → v2**, conserve le store `state` et toutes ses clés. Ajout de `historical_inventory` et `historical_backups`. Une sauvegarde est créée au premier chargement et avant chaque commit.
3. Le catalogue initial ne remplace pas un inventaire local déjà existant. Les mises à jour documentaires se font par import révisé. Les nouvelles photos doivent d’abord passer la chaîne Commons existante ; l’import JSON ne certifie aucune licence nouvelle.
4. Un ancien onglet peut bloquer la montée de version : l’application indique de fermer les anciens onglets et recharger. Un onglet v2 ferme sa connexion lors d’une demande de version supérieure.

Chaque commit utilise une transaction unique inventaire/sauvegarde/collections et vérifie la révision attendue. Une modification concurrente est refusée ; le bouton de rechargement récupère la version courante. Une erreur de quota/transaction laisse les données précédentes intactes. Les sauvegardes ne sont pas purgées automatiquement ; exporter régulièrement le JSON pour disposer d’une sauvegarde indépendante du navigateur.

## Insertion, import, fusion

- Insertion : validation du schéma et de la cohérence, puis comparaison constructeur, noms/alias, construction, variante, réédition et motorisation. Même nom sans distinction documentée : blocage. Variante/réédition : relation explicite et revue, aucune fusion automatique.
- Import : JSON schéma 2, limite 20 Mo, validation complète avant écriture, aperçu et rapport téléchargeable. Un identifiant existant modifié, un doublon potentiel ou une référence invalide bloque le lot entier. Les lignes identiques sont idempotentes. Les divergences ne remplacent jamais silencieusement les données. Les données importées qui échouent restent dans le texte/rapport à corriger ; aucune suppression automatique.
- Fusion : choix explicite de la fiche conservée et justification. Sources, assertions, aliases, médias et historiques sont réunis ; les différences deviennent des contradictions. Les deux états sont archivés. Relations, sources et favoris sont redirigés transactionnellement. La fiche fusionnée redevient non vérifiée.
- JSON : export complet, réimportable sans perte des extensions et champs inconnus du schéma visible.
- CSV : colonnes lisibles et colonne `payload_json` par table ; une ligne de métadonnées conserve l’historique, les redirections, les archives et les extensions. Échappement RFC 4180 et protection des cellules de type formule. Le parseur de test permet un aller-retour complet ; l’interface d’import utilise JSON.

## Interface

L’onglet principal « Inventaire » ouvre les espaces Inventaire, Documentation, Constructeurs et Tableau de bord. Filtres : années/période, décennie, constructeur, pays, motorisation, catégorie/sous-catégorie, usage spécialisé, statut, précision. Les constructions inconnues peuvent rester visibles, sans être affectées à une année arbitraire.

Les fiches photo réutilisent les composants et crédits existants et ajoutent chronologie, confiance, caractéristiques, production, sources, relations, contradictions et historique. La gestion documentaire permet l’ajout/modification de sources, l’édition des assertions, les signalements/résolutions et la revue globale. Les formulaires constructeur gèrent les marques, changements de propriétaire, rachats et reprises sourcées.

Les tableaux de bord comptent les dates inconnues, les dates litigieuses et les statuts non confirmés séparément. Un zéro dans « production commerciale » signifie absence de statut de production documenté dans le catalogue migré, et non absence de motos commercialisées dans l’histoire.

## Vérification

```sh
npm test
npm run build
```

- 19 tests de domaine/migration/validation/import/doublons/fusion/exports.
- 3 tests d’intégration IndexedDB avec `fake-indexeddb` : migration v1→v2, persistance, sauvegardes, import, fusion des favoris, conflits de révision et rejet atomique d’un état invalide.
- 4 tests de droits photographiques existants.
- Vérification navigateur : inventaire chronologique, filtre véhicules apparentés, fiche Butler et accès direct à la documentation, tableau de bord et rapport d’import idempotent.

## Limites et travail documentaire restant

- Pas d’inventaire mondial exhaustif : le catalogue de départ reste celui des 17 véhicules existants.
- Les caractéristiques et dates des 14 modèles modernes restent à vérifier sur catalogues techniques/archives au champ. Aucune donnée fictive ne comble les manques.
- La datation de Copeland reste contradictoire et doit être arbitrée par recherche documentaire.
- Les noms juridiques, fondations, propriétaires et volumes de production restent nulls s’ils n’étaient pas documentés.
- Les validations automatiques contrôlent la cohérence et la traçabilité déclarée, pas l’authenticité réelle d’un document externe. La revue historique reste humaine.
- Stockage documentaire local à l’appareil, pas de serveur éditorial partagé. Utiliser les exports pour le transfert et la sauvegarde.

## Extension 1911–1920 (7 novembre 2026)

Le catalogue comporte désormais 70 fiches. L’archive avant ajout en conserve 52. Le schéma reste 2 ; `mechanical_details` est une extension optionnelle (fabricant moteur, cycle, régime, embrayage, transmission finale, suspensions, freins, roues), dont les valeurs sont nulles si inconnues. Le régime est numérique ; les autres valeurs sont textuelles. La validation d’une revue vérifiée exige une assertion au champ pour chaque valeur non nulle. Les dates complémentaires de construction et présentation font également l’objet d’une vérification de concordance des assertions. JSON et CSV conservent cette extension ; aucune ancienne fiche n’est enrichie artificiellement avec des valeurs absentes.

La migration éditoriale ajoute les nouvelles entités et dossiers sans remplacer les modifications locales. Le lot comporte 119 références de recherche : 18 ajouts, 3 réutilisations, 98 dossiers non confirmés. Le [rapport](inventories/1911-1920.md) expose sources, conflits et limites. Les filtres ajoutent cylindrée, architecture moteur et confiance. Les distributions par année/intervalle ne divisent pas les intervalles ; les familles sont comptées indépendamment des variantes et des usages.

## Attestations annuelles — 1921

Extension optionnelle `construction_attestations` du schéma 2 : une preuve annuelle indépendante se rattache au véhicule existant, sans remplacer ses dates. La validation exige des sources A/B non iconographiques et non brevets, une date exacte avec ses sources, un statut, les usages et une confiance cohérente. Les attestations non vérifiées peuvent rester conservées, mais ne participent pas aux compteurs. Modifier une source rouvre la revue ; fusionner explicitement deux véhicules redirige les attestations.

La vue annuelle n’est pas une mutation du véhicule. Elle remplace temporairement la date et le statut pour le filtre/compteur et laisse les caractéristiques mécaniques inconnues. Pour une recherche couvrant déjà la datation initiale, celle-ci reste prioritaire. JSON/CSV conservent la table ; les imports et mises à jour de catalogue sont idempotents et préservent les décisions locales.

Voir [1921](inventories/1921.md) pour les données, les limites et le processus d’importation.
