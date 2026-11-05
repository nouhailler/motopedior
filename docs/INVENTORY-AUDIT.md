# Audit avant modification

## Architecture observée

React 19, Vite, Tailwind 4, Fuse.js, IndexedDB (`idb`) et Workbox. Le composant `src/main.jsx` porte la galerie, les filtres, les collections et les fiches. `src/photos.jsx` contrôle les images autorisées et leur conservation locale ; `src/sw.js` porte le cache offline. Ces fonctionnalités sont conservées.

`data/models.json` contient 17 fiches éditoriales plates ; `scripts/commons_sync.py` produit `public/motos.json` et les registres iconographiques après contrôle des licences. `data/photo-reviews.json` garde les décisions éditoriales. La base IndexedDB `motopedia`, version 1, contient uniquement le store `state` (collections et consultations récentes).

## Écarts avec les règles demandées

- `year/endYear` mêlent périodes de production, générations et repères de prototypes.
- Certaines dates de génération et caractéristiques sont indicatives, sans justification au champ.
- Les groupes de véhicules, motorisations, usages et statuts historiques ne sont pas indépendants.
- Aucun registre constructeur normalisé ni historique de propriété.
- Pas de niveaux A–D au champ, de contradictions structurées ni de validation historique.
- Pas de contrôle d’insertion/import, de fusion traçable, de rapport d’erreurs ni d’exports réimportables.
- La navigation est principalement visuelle ; il manque l’inventaire chronologique et la gestion documentaire.

## Plan d’implémentation

1. Ajouter un domaine historique versionné (véhicules, constructeurs, marques, sources, assertions, contradictions, relations, historique). Migrer les 17 identifiants sans suppression ; archiver la source brute. Séparer les six types de dates ; conserver les interprétations douteuses comme assertions non vérifiées. Le périmètre commence en 1867, sans créer de faux véhicule à cette date.
2. Implémenter validations, détection avant insertion et fusion explicite conservant sources, conflits, relations et redirections. Aucune anomalie historique ne déclenche de suppression automatique.
3. Migrer IndexedDB vers v2 et ajouter les espaces Inventaire, Documentation, Constructeurs et Tableau de bord. Réutiliser les photos, crédits, favoris, partage et le cache existants.
4. Ajouter imports JSON transactionnels, exports JSON/CSV complets, rapport téléchargeable et tests unitaires/d’intégration/de migration. Documenter les limites et publier après vérification.

## Principe documentaire

Une URL présente ne vaut pas vérification des champs. Les anciennes données non reliées à une preuve restent D/non vérifiées. Aucun propriétaire, date, moteur ou chiffre manquant n’est inventé. Les anciennes chaînes sont conservées dans `legacy` et l’archive de migration.
