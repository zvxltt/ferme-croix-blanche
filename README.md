# La Ferme de la Croix Blanche – site web

Site de la Ferme de la Croix Blanche (Drocourt, 78), en **React + Vite** (JavaScript).

## Développer

```bash
npm install
npm run dev       # site en local sur http://localhost:5173
npm run build     # version de production dans dist/
npm run preview   # tester la version de production
```

## Organisation

| Emplacement | Contenu |
|---|---|
| `src/data.js` | **Dates de vente, tarifs, carrousel, villes** : c'est ici qu'on met à jour le site |
| `src/components/` | Les sections du site (accueil, ferme, viandes, ventes et tarifs, pension, contact…) |
| `src/components/FeatureCarousel.jsx` | Le carrousel des produits (animations `motion`) |
| `src/store.jsx` | La liste de commande, le panneau, les messages |
| `src/hooks/useScrollFx.js` | Les animations au défilement |
| `src/icons.jsx` | Les icônes (dont l'icône de viande) |
| `src/styles.css` | La mise en forme |
| `public/` | Copié tel quel dans le site : `contact.php`, `.htaccess`, `404.html`, `robots.txt`, `sitemap.xml` |

## Mise en ligne sur Hostinger

**Avant tout :** dans `public/contact.php`, remplacer `DESTINATAIRE` (adresse de la ferme qui reçoit les demandes) et `EXPEDITEUR` (une adresse du domaine créée dans hPanel → E-mails).

### Option A – Déploiement automatique depuis GitHub (recommandé)

À chaque modification de `main`, GitHub compile le site et le publie sur la branche **`hostinger`** (voir l'onglet *Actions* du dépôt).

1. hPanel → *Sites web* → *Gérer* → *Avancé* → **GIT**.
2. Dépôt : `https://github.com/zvxltt/ferme-croix-blanche.git`, branche : **`hostinger`**, dossier : laisser vide (racine de `public_html`). `public_html` doit être vide avant le premier déploiement.
3. Activer le **déploiement automatique** et copier l'URL du webhook fournie par Hostinger dans GitHub → *Settings* → *Webhooks* → *Add webhook*.

Le dépôt étant public, aucune clé n'est nécessaire.

### Option B – Envoi manuel

1. `npm run build`
2. hPanel → *Gestionnaire de fichiers* → `public_html` : téléverser **le contenu** du dossier `dist/` (y compris `.htaccess`, fichier caché).

### Ensuite

- hPanel → *Sécurité* → *SSL* : installer le certificat gratuit (le `.htaccess` force `https://www.`).
- Si le domaine est encore chez Local.fr, pointer ses DNS vers Hostinger.
- Envoyer une demande test depuis le formulaire.

## Images

Les photos et le logo sont encore chargés depuis l'ancien site Local.fr (`IMG` dans `src/data.js`). **Si l'abonnement Local.fr est résilié, elles disparaîtront.** Pour les héberger avec le site : les placer dans `public/img/` (mêmes noms de fichiers) et remplacer la valeur de `IMG` par `'img/'`.
