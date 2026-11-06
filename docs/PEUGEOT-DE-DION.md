# Peugeot et De Dion-Bouton

Le catalogue comporte désormais 27 fiches. Les références incertaines 20 (bicyclette De Dion-Bouton) et 24 (Peugeot 1899) restent archivées et accessibles, avec des liens vers les alternatives documentées. Leurs identifiants et les favoris existants sont conservés.

- 25 : première moto Peugeot présentée en 1898, prototype jamais produit selon L’Aventure Peugeot. Aucun fichier Commons suffisamment identifié et approuvé : visuel de remplacement.
- 26 : Peugeot Motobicyclette ZL présentée en 1901, moteur suisse Zürcher et Lüthi de 198 cm³ et transmission par courroie. Photo Commons de Thesupermat, CC BY-SA 4.0, prise en 2018. Cette date photographique ne devient pas une date de fabrication.
- 27 : tricycle à essence De Dion-Bouton de 1895, explicitement choisi par l’utilisateur. Le catalogue du Cnam documente 1895 ; The Henry Ford date les premiers tricycles à essence de 1895, mais son propre exemplaire est une copie Cuddell vers 1898. Aucune caractéristique de cet exemplaire n’est transférée. Photo historique de Georges Bouton en octobre 1895, domaine public, auteur indiqué « several » par Commons.

Les années de présentation Peugeot sont enregistrées dans `presentation_date`, séparément des dates de construction, de prototype et de commercialisation. Les dates inconnues restent nulles. Les photos approuvées ont leurs métadonnées, liens originaux et variantes WebP locales (480, 800, 1600 pixels) pour le cache hors ligne existant.

## Sources principales

- https://laventure-association.com/article/motos_peugeot/
- https://www.peugeot.fr/marque/univers-peugeot/les-deux-roues.html
- https://cnum.cnam.fr/pgi/redir.php?ident=M6118&onglet=i
- https://www.thehenryford.org/collections/explore/artifact/147364

Les fichiers et licences individuels figurent dans `public/photo-credits.json` et `data/photo-reviews.json`.

## Génération et validation

`npm run add:peugeot-de-dion` ajoute les trois fiches de façon idempotente. La mise à jour IndexedDB crée une sauvegarde, conserve les fiches locales et fusionne uniquement les nouvelles références de champs des sources dont les autres métadonnées sont identiques. Une modification locale substantielle de source reste protégée.

Validation : 44 tests réussis (domaine, migrations IndexedDB, références historiques, nouveaux modèles et photos) et compilation PWA réussie. Aucun score Lighthouse supplémentaire n’a été mesuré pour cette modification.
