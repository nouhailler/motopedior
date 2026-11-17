# Audit préalable — 1922

8 novembre 2026, avant insertion. Le dépôt est propre sur main, commit b0e098d. Le catalogue comporte 86 véhicules et 60 constructeurs, les lots 1890–1900, 1901–1910, 1911–1920 (119 références) et 1921 (62 références). Une attestation annuelle Nimbus est déjà séparée des fiches.

Architecture examinée : PWA React 19, Vite 6, Tailwind 4, Workbox, idb et IndexedDB v2 ; inventaire normalisé schéma 2. Entités constructeurs/marques, véhicules, sources, assertions, contradictions, relations, archives, lots de recherche et attestations annuelles. Les usages compétition/militaire sont orthogonaux aux catégories. Les variantes se rattachent à leur parent ; les sources de moteur sont distinctes du constructeur réel. Pas de nouvelle architecture nécessaire.

Les dates typées séparent conception, brevet, prototype, production et vente. L’exemplaire documenté n’est pas le premier exemplaire du modèle. Les attestations annuelles réutilisent un identifiant existant et ne projettent pas les caractéristiques du premier objet sur une nouvelle année. La présence d’une marque à Olympia ou dans un Buyers’ Guide ne prouve pas un assemblage en 1922.

Les doublons sont contrôlés par identifiant, constructeur, noms/alias normalisés, dates, motorisations et relations explicites. Aucune fusion automatique par ressemblance. Points à comparer : Harley W/Sport Twin, F/J, Indian Powerplus/NE, FN Four, Zündapp Z22/Z2G, Nimbus, Norton 16H/Big Four/Tourist/Speedman, Ner-a-Car selon le fabricant régional, familles Rudge et Motosacoche. Cleveland 286 ne doit pas devenir un modèle par son seul numéro de moteur.

Les sources A–D, assertions au champ et contradictions sont traçables. Les dates exactes, approximatives, intervalles et inconnues sont acceptées ; seules les preuves adaptées à l’année entrent dans le total annuel. La revue vérifiée exige des faits sourcés. Les candidats et annotations utilisateur restent hors catalogue confirmé. Les ambiguïtés historiques antérieures, notamment la puissance de la Z22, ne sont pas résolues arbitrairement.

Imports JSON atomiques, CSV/JSON complets, archives réversibles, migration additive avec sauvegarde et conservation des revues locales. Les attestations sont redirigées lors d’une fusion explicite et invalidées lorsque leur source change. Les filtres année, constructeur, pays, cylindrée, moteur, catégorie, usage, statut et confiance sont présents. La suite de départ comporte 124 tests. Les tests du lot 1921 seront attachés à son archive pour conserver leur portée de non-régression.

Les 86 fiches, constructeurs, marques, identifiants et lots antérieurs seront comparés à l’archive avant intégration. Aucun fait vérifié ne sera remplacé par un catalogue moins précis. Un side-car attelé ne change pas une motocyclette en tricycle ; les Sesselräder seront examinés selon leur construction réelle et distingués visuellement des motos conventionnelles.
