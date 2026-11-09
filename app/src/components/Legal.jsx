import { LEGAL as L, LOGO } from '../data'
import { Footer } from './Chrome'

function Ligne({ label, children }) {
  if (!children) return null
  return <div className="lg-row"><dt>{label}</dt><dd>{children}</dd></div>
}

const Mail = () => <a href={`mailto:${L.email}`}>{L.email}</a>

function Mentions() {
  return (
    <>
      <h1>Mentions légales</h1>
      <p className="lg-intro">Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations relatives à l'éditeur et à l'hébergeur du site.</p>

      <h2>Éditeur du site</h2>
      <dl>
        <Ligne label="Enseigne">{L.enseigne}</Ligne>
        <Ligne label="Société">{L.societe}</Ligne>
        <Ligne label="Forme juridique">{L.forme}</Ligne>
        <Ligne label="Capital social">{L.capital}</Ligne>
        <Ligne label="Siège social">{L.siege}</Ligne>
        <Ligne label="SIREN">{L.siren}</Ligne>
        <Ligne label="SIRET (siège)">{L.siret}</Ligne>
        <Ligne label="Immatriculation">{L.rcs}</Ligne>
        <Ligne label="N° de TVA intracommunautaire">{L.tva}</Ligne>
        <Ligne label="Activité (code NAF)">{L.naf}</Ligne>
        <Ligne label="Téléphone">{L.telephone}</Ligne>
        <Ligne label="E-mail"><Mail /></Ligne>
      </dl>

      <h2>Directrice de la publication</h2>
      <p>{L.directeur}.</p>

      <h2>Hébergement</h2>
      <p>Le site est hébergé par {L.hebergeur.nom}, {L.hebergeur.adresse} – <a href={L.hebergeur.site} target="_blank" rel="noopener">{L.hebergeur.site.replace('https://', '')}</a>.</p>

      <h2>Conception et réalisation</h2>
      <p>{L.conception}.</p>
      {L.prestataireImages && <p>Certaines photographies sont actuellement diffusées depuis les serveurs de {L.prestataireImages}.</p>}

      <h2>Conditions d'utilisation</h2>
      <p>Le site est accessible à l'adresse la-ferme-de-la-croix-blanche.fr. Son utilisation implique l'acceptation des présentes mentions, qui peuvent être modifiées à tout moment. {L.societe} ne saurait être tenue pour responsable d'une mauvaise utilisation du site.</p>

      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus de ce site (textes, photographies, logo, mise en page) est la propriété de {L.societe} ou de ses partenaires et est protégé par le Code de la propriété intellectuelle. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite. Les photographies sont non contractuelles.</p>

      <h2>Tarifs et commandes</h2>
      <p>Les prix affichés sur le site sont indiqués en euros, toutes taxes comprises (TTC), au kilogramme. Ils sont donnés à titre indicatif : le prix définitif dépend du poids réel des morceaux, pesés lors de la vente à la ferme. Le site ne permet pas de payer en ligne : la liste de commande et le formulaire servent uniquement à transmettre une demande, confirmée ensuite par la ferme. La vente est conclue et réglée sur place, lors des ventes à la ferme.</p>

      <h2>Médiation de la consommation</h2>
      {L.mediateur ? (
        <p>Conformément aux articles L. 611-1 et suivants du Code de la consommation, en cas de litige non résolu avec nous, vous pouvez recourir gratuitement au médiateur de la consommation : {L.mediateur.nom} – <a href={L.mediateur.site} target="_blank" rel="noopener">{L.mediateur.site.replace('https://', '')}</a>.</p>
      ) : (
        <p>En cas de litige, nous vous invitons à nous contacter en priorité au {L.telephone} ou à <Mail /> afin de rechercher une solution amiable. Conformément aux articles L. 611-1 et suivants du Code de la consommation, vous pouvez également recourir gratuitement à un médiateur de la consommation.</p>
      )}

      <h2>Responsabilité</h2>
      <p>{L.societe} s'efforce de fournir des informations exactes et à jour (dates de vente, tarifs, disponibilités), mais ne peut garantir l'absence d'erreur. Les dates et les prix sont susceptibles d'évoluer ; en cas de doute, n'hésitez pas à nous appeler. Si vous constatez une erreur ou un dysfonctionnement, merci de nous le signaler à <Mail />. Les liens vers d'autres sites sont fournis à titre pratique et n'engagent pas la responsabilité de {L.societe}.</p>

      <h2>Données personnelles</h2>
      <p>Le traitement de vos données est décrit dans notre <a href="confidentialite.html">politique de confidentialité</a>.</p>

      <h2>Droit applicable et litiges</h2>
      <p>Les présentes mentions sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des tribunaux français. La langue de référence est le français.</p>
    </>
  )
}

function Confidentialite() {
  return (
    <>
      <h1>Politique de confidentialité</h1>
      <p className="lg-intro">Cette politique explique quelles données personnelles nous recueillons via ce site, pourquoi, et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>

      <h2>Responsable du traitement</h2>
      <p>{L.societe} ({L.nom}), {L.siege} – SIREN {L.siren}. Contact : <Mail /> ou {L.telephone}.</p>

      <h2>Données recueillies</h2>
      <p>Uniquement celles que vous nous transmettez via le formulaire de contact : nom et prénom, adresse e-mail, téléphone (facultatif), objet et contenu de votre message, et, le cas échéant, la liste des morceaux que vous souhaitez commander. Aucune donnée n'est collectée à votre insu et aucun compte n'est nécessaire.</p>

      <h2>Pourquoi et sur quelle base</h2>
      <ul>
        <li><b>Répondre à votre demande et préparer votre commande</b> – base légale : mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD).</li>
        <li><b>Vous informer de nos prochaines ventes</b>, uniquement si vous avez coché la case prévue à cet effet – base légale : votre consentement (art. 6.1.a), que vous pouvez retirer à tout moment.</li>
        <li><b>Protéger le formulaire contre les abus et les robots</b> – base légale : notre intérêt légitime à assurer la sécurité du site (art. 6.1.f).</li>
      </ul>

      <h2>Destinataires</h2>
      <p>Vos données sont destinées uniquement à {L.societe}. Elles transitent par notre hébergeur ({L.hebergeur.nom}, situé dans l'Union européenne) pour l'envoi du message. Elles ne sont jamais vendues, louées ni cédées à des tiers, et ne sont jamais utilisées pour de la publicité de partenaires. Elles peuvent uniquement être communiquées aux autorités judiciaires sur réquisition, conformément à la loi.</p>

      <h2>Durée de conservation</h2>
      <ul>
        <li>Demandes et commandes : 2 ans à compter de notre dernier échange.</li>
        <li>Informations sur les ventes (si vous y avez consenti) : jusqu'à votre désinscription, et au maximum 2 ans sans contact de votre part.</li>
        <li>Journaux techniques du serveur : 12 mois au maximum.</li>
      </ul>

      <h2>Cookies et stockage local</h2>
      <p>Ce site n'utilise <b>aucun cookie publicitaire ni outil de mesure d'audience</b>, et ne fait appel à aucun service tiers de suivi. Les polices de caractères sont hébergées sur le site lui-même. Seuls des éléments strictement nécessaires au fonctionnement sont utilisés, ce qui ne requiert pas votre consentement (article 82 de la loi Informatique et Libertés) :</p>
      <ul>
        <li>le <b>stockage local de votre navigateur</b> conserve votre liste de commande sur votre appareil, pour que vous la retrouviez en revenant ; elle n'est jamais transmise sans que vous envoyiez le formulaire, et vous pouvez la vider à tout moment depuis « Ma liste » ;</li>
        <li>un <b>cookie de session</b> technique peut être déposé lors de l'envoi du formulaire pour limiter les envois abusifs ; il est supprimé à la fermeture du navigateur.</li>
      </ul>
      <p>Les photographies sont chargées depuis un service de stockage situé en France (Amazon Web Services, région Paris), qui reçoit à cette occasion l'adresse IP technique de votre appareil{L.prestataireImages ? ` ; ces images sont pour l'instant diffusées par notre ancien prestataire, ${L.prestataireImages}` : ''}.</p>

      <h2>Vos droits</h2>
      <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement à tout moment et de définir des directives sur le sort de vos données après votre décès. Pour les exercer, écrivez-nous à <Mail /> ou par courrier à {L.societe}, {L.siege}. Nous pourrons vous demander un justificatif d'identité avant de répondre. Nous vous répondons dans un délai d'un mois.</p>
      <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener">cnil.fr</a>).</p>

      <h2>Sécurité</h2>
      <p>Le site est servi en connexion chiffrée (HTTPS) et le formulaire est protégé contre les envois automatisés.</p>
    </>
  )
}

export default function LegalPage({ page }) {
  return (
    <>
      <header className="lg-head">
        <div className="wrap">
          <a className="brand" href="./" aria-label="Retour à l'accueil">
            <img src={LOGO} alt="Logo La Ferme de la Croix Blanche" />
            <span><b>La Croix Blanche</b><small>Ferme à Drocourt</small></span>
          </a>
          <a className="btn ghost-d" href="./">Retour au site</a>
        </div>
      </header>
      <main className="lg">
        <div className="wrap">
          <article className="lg-body">
            {page === 'mentions' ? <Mentions /> : <Confidentialite />}
            <p className="lg-maj">Dernière mise à jour : {L.majLe}.</p>
          </article>
        </div>
      </main>
      <Footer base="./" />
    </>
  )
}
