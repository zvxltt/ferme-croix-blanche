# La Ferme de la Croix Blanche – site web

Site vitrine de la Ferme de la Croix Blanche (Drocourt, 78), prêt pour un hébergement Hostinger.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | La page du site |
| `assets/css/style.css` | La mise en forme |
| `assets/js/main.js` | Les animations, les tarifs, la liste de commande, l'envoi du formulaire |
| `contact.php` | Envoie les demandes du formulaire par e-mail |
| `.htaccess` | HTTPS forcé, redirection des anciennes pages, cache, page 404 |
| `404.html` | Page « introuvable » |
| `robots.txt`, `sitemap.xml` | Référencement Google |

## Mise en ligne sur Hostinger

1. **Régler l'e-mail du formulaire.** Ouvrir `contact.php` et modifier en haut :
   - `DESTINATAIRE` : l'adresse qui reçoit les demandes (celle de la ferme) ;
   - `EXPEDITEUR` : une adresse du domaine créée dans hPanel → *E-mails* (par exemple `site@la-ferme-de-la-croix-blanche.fr`). Sans adresse du domaine, les messages risquent d'arriver en spam.
2. **Téléverser les fichiers.** Dans hPanel → *Sites web* → *Gestionnaire de fichiers*, ouvrir `public_html`, supprimer le fichier `default.php` s'il existe, puis téléverser `site-ferme-croix-blanche.zip` et choisir *Extraire*. Les fichiers doivent être directement dans `public_html` (pas dans un sous-dossier).
   - Les fichiers commençant par un point (`.htaccess`) sont parfois masqués : activer « Afficher les fichiers cachés » pour vérifier qu'il est présent.
3. **Activer le SSL.** hPanel → *Sécurité* → *SSL* → installer le certificat gratuit. Le `.htaccess` redirige ensuite tout vers `https://www.`.
4. **Pointer le domaine.** Si le domaine est encore chez Local.fr, remplacer ses serveurs DNS par ceux indiqués par Hostinger (propagation jusqu'à 24 h).
5. **Tester** : envoyer une demande depuis le formulaire et vérifier sa réception.

> Si le site est installé sur un domaine sans `www`, modifier la première règle du `.htaccess` en conséquence.

## Images

Les photos et le logo sont pour l'instant chargés depuis l'ancien site Local.fr. **Si l'abonnement Local.fr est résilié, elles disparaîtront.** Avant la résiliation :

1. récupérer les images (fichiers d'origine auprès de la ferme, ou clic droit → *Enregistrer l'image* sur l'ancien site) ;
2. les placer dans `assets/img/` ;
3. remplacer dans `index.html`, `assets/js/main.js` et `assets/css/style.css` l'adresse
   `https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/115601/` par `assets/img/` (en gardant les mêmes noms de fichiers, ou en les adaptant).

## Mise à jour des contenus

- **Dates de vente** : tableau `V` dans `assets/js/main.js` (la prochaine vente et le compte à rebours se calculent seuls).
- **Tarifs** : objet `T` dans `assets/js/main.js`.
- **Pension, textes** : directement dans `index.html`.
