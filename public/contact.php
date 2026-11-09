<?php
/**
 * Formulaire de contact – La Ferme de la Croix Blanche
 * Reçoit les demandes du site et les envoie par e-mail.
 *
 * À RÉGLER AVANT LA MISE EN LIGNE :
 *  - DESTINATAIRE : l'adresse qui reçoit les demandes (celle de la ferme).
 *  - EXPEDITEUR : une adresse du domaine créée dans Hostinger (ex. site@la-ferme-de-la-croix-blanche.fr),
 *    sinon les e-mails risquent d'arriver dans les spams.
 */
const DESTINATAIRE = 'contact@la-ferme-de-la-croix-blanche.fr';
const EXPEDITEUR   = 'site@la-ferme-de-la-croix-blanche.fr';
const NOM_SITE     = 'La Ferme de la Croix Blanche';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function repondre(bool $ok, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    repondre(false, 'Méthode non autorisée', 405);
}

// Piège à robots : ce champ invisible doit rester vide.
if (!empty($_POST['site_web'])) {
    repondre(true, 'Merci');
}

// Limite simple : une demande toutes les 30 secondes par visiteur.
session_start();
if (isset($_SESSION['dernier_envoi']) && time() - $_SESSION['dernier_envoi'] < 30) {
    repondre(false, 'Merci de patienter quelques secondes avant un nouvel envoi', 429);
}

$propre = fn($v, $max = 200) => trim(mb_substr(str_replace(["\r", "\n"], ' ', (string)($v ?? '')), 0, $max));

$nom       = $propre($_POST['nom'] ?? '', 120);
$telephone = $propre($_POST['telephone'] ?? '', 40);
$email     = $propre($_POST['email'] ?? '', 160);
$objet     = $propre($_POST['objet'] ?? 'Demande depuis le site', 120);
$message   = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 5000));
$liste     = trim(mb_substr((string)($_POST['liste'] ?? ''), 0, 3000));
$rgpd      = !empty($_POST['rgpd']);

if ($nom === '' || $message === '') {
    repondre(false, 'Merci d\'indiquer votre nom et votre message', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    repondre(false, 'L\'adresse e-mail n\'est pas valide', 422);
}
if (!$rgpd) {
    repondre(false, 'Merci d\'accepter la politique de confidentialité', 422);
}

$corps  = "Nouvelle demande depuis le site " . NOM_SITE . "\n";
$corps .= str_repeat('-', 40) . "\n\n";
$corps .= "Nom : $nom\n";
$corps .= "E-mail : $email\n";
$corps .= "Téléphone : " . ($telephone !== '' ? $telephone : 'non renseigné') . "\n";
$corps .= "Objet : $objet\n\n";
$corps .= "Message :\n$message\n";
if ($liste !== '' && mb_strpos($message, $liste) === false) {
    $corps .= "\nListe de commande :\n$liste\n";
}
$corps .= "\n" . str_repeat('-', 40) . "\n";
$corps .= "Envoyé le " . date('d/m/Y à H:i') . "\n";

$sujet = '=?UTF-8?B?' . base64_encode("[Site] $objet – $nom") . '?=';
$entetes = [
    'From: ' . '=?UTF-8?B?' . base64_encode(NOM_SITE) . '?= <' . EXPEDITEUR . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

if (!mail(DESTINATAIRE, $sujet, $corps, implode("\r\n", $entetes), '-f' . EXPEDITEUR)) {
    repondre(false, 'L\'envoi a échoué', 500);
}

$_SESSION['dernier_envoi'] = time();
repondre(true, 'Merci, votre demande a bien été envoyée.');
