# La Ferme de la Croix Blanche – site web

Site de la Ferme de la Croix Blanche (Drocourt, 78), en **React + Vite** (JavaScript).

## Développer

```bash
npm install
npm run dev       # site en local sur http://localhost:5173
npm run build     # version de production dans dist/
npm run publish   # recopie dist/ à la racine du dépôt
npm run preview   # tester la version de production
```

## Organisation

Le **code source** est dans `app/`. La **version compilée**, prête à servir, est à la racine du dépôt (`index.html`, `assets/`, `contact.php`…) : c'est elle qu'affichent GitHub Pages et Hostinger. Elle se met à jour toute seule via GitHub Actions à chaque modification de `app/` (ou à la main avec `npm run build && npm run publish`).

| Emplacement | Contenu |
|---|---|
| `app/src/data.js` | **Dates de vente, tarifs, carrousel, villes, informations légales (`LEGAL`)** : c'est ici qu'on met à jour le site |
| `app/mentions-legales.html`, `app/confidentialite.html` | Pages légales (contenu dans `app/src/components/Legal.jsx`) |
| `app/src/components/` | Les sections du site (accueil, ferme, viandes, ventes et tarifs, pension, contact…) |
| `app/src/components/FeatureCarousel.jsx` | Le carrousel des produits (animations `motion`) |
| `app/src/store.jsx` | La liste de commande, le panneau, les messages |
| `app/src/hooks/useScrollFx.js` | Les animations au défilement |
| `app/src/icons.jsx` | Les icônes (dont l'icône de viande) |
| `app/src/styles.css` | La mise en forme |
| `app/public/` | Copié tel quel dans le site : `contact.php`, `.htaccess`, `404.html`, `robots.txt`, `sitemap.xml` |

## Mise en ligne sur Hostinger

**Avant tout :** dans `app/public/contact.php`, remplacer `DESTINATAIRE` (adresse de la ferme qui reçoit les demandes) et `EXPEDITEUR` (une adresse du domaine créée dans hPanel → E-mails).

### Option A – Déploiement automatique depuis GitHub (recommandé)

À chaque modification du code, GitHub compile le site, met à jour la racine de `main` et la branche **`hostinger`** (voir l'onglet *Actions* du dépôt).

1. hPanel → *Sites web* → *Gérer* → *Avancé* → **GIT**.
2. Dépôt : `https://github.com/zvxltt/ferme-croix-blanche.git`, branche : **`main`** (ou `hostinger`, qui ne contient que le site compilé), dossier : laisser vide (racine de `public_html`). `public_html` doit être vide avant le premier déploiement.
3. Activer le **déploiement automatique** et copier l'URL du webhook fournie par Hostinger dans GitHub → *Settings* → *Webhooks* → *Add webhook*.

Le dépôt étant public, aucune clé n'est nécessaire.

### Option B – Envoi manuel

1. `npm run build`
2. hPanel → *Gestionnaire de fichiers* → `public_html` : téléverser **le contenu** du dossier `dist/` (y compris `.htaccess`, fichier caché).

## Aperçu sur GitHub Pages

GitHub → *Settings* → *Pages* → *Deploy from a branch* → `main` / `(root)`. Le site s'affiche sur `https://zvxltt.github.io/ferme-croix-blanche/` (le formulaire, qui a besoin de PHP, ne peut pas envoyer d'e-mail sur GitHub Pages : il propose alors d'appeler).

### Ensuite

- hPanel → *Sécurité* → *SSL* : installer le certificat gratuit (le `.htaccess` force `https://www.`).
- Si le domaine est encore chez Local.fr, pointer ses DNS vers Hostinger.
- Envoyer une demande test depuis le formulaire.

## Images

Les photos et le logo sont encore chargés depuis l'ancien site Local.fr (`IMG` dans `app/src/data.js`). **Si l'abonnement Local.fr est résilié, elles disparaîtront.** Pour les héberger avec le site : les placer dans `app/public/img/` (mêmes noms de fichiers) et remplacer la valeur de `IMG` par `'img/'`.
