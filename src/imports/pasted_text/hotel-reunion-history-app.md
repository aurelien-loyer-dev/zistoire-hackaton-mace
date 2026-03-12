Crée une application web responsive moderne, élégante et immersive pour un hôtel à La Réunion, centrée sur la découverte de l’histoire réunionnaise à travers des écrans interactifs et des QR codes.

Contexte du projet

Dans le hall de l’hôtel, plusieurs écrans / tableaux numériques affichent des visuels historiques animés par IA sur des figures, lieux et événements emblématiques de La Réunion, comme :

Edmond Albius

Mafate

Madame Desbassyns

Le volcan

Le Grand Raid

Le musée de Villèle

La Cité du Volcan

Chaque écran possède un QR code unique.
Quand un utilisateur scanne un QR code, il doit arriver directement sur la page dédiée à l’histoire correspondante.

Exemple :

QR code Albius → ouvre directement /histoires/albius

QR code Mafate → ouvre directement /histoires/mafate

L’application doit aussi avoir une page d’accueil centrale qui regroupe les histoires par catégories.

Objectif UX

Le site doit être :

simple

immersif

élégant

inspiré de La Réunion

facile à utiliser sur mobile

facile à comprendre pour des touristes

Le design doit évoquer :

la culture créole

le patrimoine réunionnais

un univers premium mais chaleureux

une expérience calme, culturelle et moderne

Style visuel

Créer une interface :

haut de gamme

sobre

inspirée de la culture réunionnaise

avec de grandes images

des cartes visuelles

des transitions fluides

Palette recommandée :

bleu profond océan

vert tropical

beige sable

brun / terracotta

orange volcan

accents rouge corail

Utiliser :

coins arrondis

ombres douces

grandes images immersives

typographie élégante et lisible

animations légères et fluides

Le rendu doit être premium, pas trop chargé.

Structure technique attendue

Construire l’application avec :

React

Next.js

Tailwind CSS

routing dynamique

composants réutilisables

Prévoir des routes dynamiques du type :

/

/histoires/[slug]

Chaque histoire doit être alimentée depuis une structure de données simple, type tableau JSON ou mock local.

Fonctionnalités principales
1. Page d’accueil /

Créer une page d’accueil claire avec plusieurs sections.

Header

En haut de la page :

logo ou nom du projet

petit texte d’introduction

interface élégante

éventuellement une recherche ou un bouton “Découvrir les histoires”

Hero

Créer un hero simple avec :

un grand visuel

un titre du style :
Découvrez La Réunion à travers ses histoires

un sous-titre expliquant que les visiteurs peuvent explorer des récits historiques et culturels liés à des partenaires et à des activités réelles

2. Premier bandeau : actualités / événements en cours

Créer une section horizontale scrollable ou carousel intitulée par exemple :

Histoires liées à l’actualité réunionnaise

Cette section doit afficher des cartes pour des histoires mises en avant selon les événements du moment.

Exemples :

si éruption en cours → histoire sur le volcan

si Grand Raid → histoire sur la course

si saison des baleines → histoire sur l’océan ou la faune

si fête locale / événement culturel → histoire liée

Chaque carte doit contenir :

image

titre

courte accroche

bouton ou clic sur la carte pour accéder à la page de l’histoire

Cette section doit avoir un style visuel fort et premium.

3. Deuxième bandeau : histoires sponsorisées par des partenaires

Créer une deuxième section horizontale intitulée par exemple :

Histoires mises en avant par nos partenaires

But :
mettre en avant des histoires sponsorisées / partenaires qui paient pour être plus visibles.

Exemples :

Cité du Volcan

Musée de Villèle

Saga du Rhum

jardin, domaine, lieu culturel, etc.

Chaque carte doit contenir :

image partenaire

titre de l’histoire

petit badge “Mis en avant” ou “Partenaire”

courte description

clic vers la page histoire

Cette section doit être légèrement différenciée visuellement du premier bandeau.

4. Troisième section : toutes les histoires permanentes

Créer une section principale intitulée par exemple :

Toutes les histoires à découvrir

Afficher une grille responsive de cartes pour toutes les histoires disponibles en permanence.

Exemples d’entrées :

Edmond Albius

Mafate

Madame Desbassyns

Cité du Volcan

Musée de Villèle

Histoire de la vanille

Histoire du marronnage

Histoire du maloya

Chaque carte doit contenir :

image

titre

catégorie

courte description

lien vers la page détail

Page détail d’une histoire /histoires/[slug]

Chaque QR code doit rediriger directement vers cette page.

Exemple :
scanner le QR code Albius ouvre directement la page d’Edmond Albius.

Structure de la page détail
1. Bouton retour

En haut de la page, afficher un bouton clair pour revenir à l’accueil :

“Retour à l’accueil”

ou une flèche + texte

Ce bouton doit renvoyer vers /.

2. Grand visuel / hero de l’histoire

Afficher :

une grande image ou bannière

le titre de l’histoire

un sous-titre ou une phrase d’accroche

Exemple :
Edmond Albius
L’histoire du jeune esclave réunionnais qui a révolutionné la culture de la vanille.

3. Bouton vers une activité partenaire

Sur cette page, afficher un bouton principal visible qui redirige vers un site externe partenaire.

Exemple :

“Découvrir l’activité partenaire”

“Réserver une visite”

“Explorer l’expérience”

Ce bouton doit ouvrir un lien externe dans un nouvel onglet.

Chaque histoire peut avoir son propre lien partenaire.

Exemples :

Albius → activité autour de la vanille / jardin / visite

Mafate → randonnée / guide

Desbassyns → musée / domaine / visite

4. Bloc “En savoir plus”

Créer une grande div / section intitulée :

En savoir plus

Dans cette section, afficher un texte racontant l’histoire.

Le texte doit être consultable dans un format de type slider / pagination avec flèches.

Fonctionnement attendu :

le texte est découpé en plusieurs “slides” ou étapes

l’utilisateur peut naviguer avec une flèche gauche et une flèche droite

chaque slide contient une partie du récit

Exemple :

slide 1 : contexte historique

slide 2 : l’événement clé

slide 3 : l’héritage aujourd’hui

Le composant doit être élégant, lisible, responsive et simple à utiliser sur mobile.

5. Texte historique en bas

Sous la section “En savoir plus”, afficher un texte plus long ou un résumé historique complémentaire, dans un bloc lisible.

But :
permettre au visiteur d’avoir une lecture plus posée de l’histoire.

Prévoir :

belle mise en page

largeur de lecture confortable

bonne hiérarchie typographique

Comportement QR code

Prévoir un système de routing clair.

Chaque histoire doit avoir un slug unique.

Exemples :

albius

mafate

desbassyns

volcan

grand-raid

cite-du-volcan

musee-de-villele

Quand l’utilisateur arrive directement sur une URL d’histoire, la page doit être complète et indépendante, sans avoir besoin de passer par la home.

Données mockées

Créer un jeu de données local avec plusieurs histoires.

Chaque histoire doit contenir au minimum :

slug

title

subtitle

image

category

isCurrentEvent

isSponsored

partnerName

partnerUrl

shortDescription

storySlides (tableau de paragraphes)

fullText

Prévoir au moins ces exemples :

Edmond Albius

Mafate

Madame Desbassyns

Le volcan

Le Grand Raid

Cité du Volcan

Musée de Villèle

Composants à créer

Créer des composants réutilisables :

Header

HeroSection

StoryCard

HorizontalStoryCarousel

SponsoredBadge

BackButton

PartnerCTAButton

StorySlider

Footer

Responsive

Le site doit être optimisé pour :

mobile en priorité

tablette

desktop

Les bandeaux horizontaux doivent être fluides sur mobile, avec scroll horizontal naturel ou carousel propre.

Accessibilité

Prévoir une interface accessible :

contraste suffisant

boutons larges

textes lisibles

navigation clavier de base

aria labels sur les flèches et boutons

liens externes clairement identifiés

Ton éditorial

Les textes doivent être :

inspirants

simples à lire

culturels

accessibles à des touristes

jamais trop académiques

Résultat attendu

Génère une base complète du site avec :

page d’accueil structurée

routes dynamiques pour les histoires

cartes d’histoires

sections horizontales distinctes

page détail avec bouton partenaire, bouton retour, slider “en savoir plus”, texte historique en bas

design premium inspiré de La Réunion