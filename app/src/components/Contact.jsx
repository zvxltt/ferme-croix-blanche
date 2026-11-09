import { useState } from 'react'
import { useSite } from '../store'
import { FACEBOOK, LEGAL, LOGO, MAPS, TEL, TEL_HREF } from '../data'
import { Arrow, Check } from '../icons'

const OBJETS = ['Une commande de viande', 'La pension pour chevaux', 'Une visite de la ferme', 'Autre chose']

export default function Contact() {
  const { objet, setObjet, message, setMessage, count, listText, clear, setSheetOpen } = useSite()
  const [state, setState] = useState({ sending: false, ok: false, err: '' })

  const submit = async (e) => {
    e.preventDefault()
    const f = e.currentTarget
    setState({ sending: false, ok: false, err: '' })
    if (!f.checkValidity()) { f.reportValidity(); return }
    const data = new FormData(f)
    if (count) data.append('liste', listText())
    setState((s) => ({ ...s, sending: true }))
    try {
      const r = await fetch('contact.php', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.ok) throw new Error(j.message || 'Envoi impossible')
      f.reset()
      setMessage('')
      setObjet(OBJETS[0])
      clear()
      setState({ sending: false, ok: true, err: '' })
    } catch (x) {
      const m = x.message && x.message !== 'Failed to fetch' ? x.message + '. ' : "L'envoi n'a pas fonctionné. "
      setState({ sending: false, ok: false, err: m + `Vous pouvez aussi appeler le ${TEL}.` })
    }
  }

  return (
    <section id="commander">
      <div className="wrap contact">
        <div>
          <div className="eyebrow rv">Commander</div>
          <h2 className="rv d1" style={{ marginTop: 18 }}>Laissez-nous <em>votre demande</em></h2>
          <p className="lede rv d2" style={{ marginTop: 18 }}>Une commande pour la prochaine vente, une question sur la pension ? Écrivez-nous, nous vous répondrons dans les plus brefs délais.</p>

          <form className="rv d2" action="contact.php" method="post" noValidate onSubmit={submit}>
            {/* Piège à robots : doit rester vide */}
            <input type="text" name="site_web" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
            <div className="row">
              <div className="f"><input id="nom" name="nom" placeholder=" " autoComplete="name" required /><label htmlFor="nom">Nom et prénom</label></div>
              <div className="f"><input id="tel" name="telephone" type="tel" placeholder=" " autoComplete="tel" /><label htmlFor="tel">Téléphone</label></div>
            </div>
            <div className="f"><input id="mail" name="email" type="email" placeholder=" " autoComplete="email" required /><label htmlFor="mail">E-mail</label></div>
            <div className="f sel">
              <select id="objet" name="objet" value={objet} onChange={(e) => setObjet(e.target.value)}>
                {OBJETS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <label htmlFor="objet">Votre demande concerne</label>
            </div>
            {count > 0 && (
              <div className="recap">
                <b>Votre liste ({count} article{count > 1 ? 's' : ''})</b> sera jointe à votre message.{' '}
                <button type="button" className="linkbtn" style={{ padding: 0 }} onClick={() => setSheetOpen(true)}>Modifier</button>
              </div>
            )}
            <div className="f">
              <textarea id="msg" name="message" placeholder=" " required value={message} onChange={(e) => setMessage(e.target.value)} />
              <label htmlFor="msg">Votre message</label>
            </div>
            <label className="chk" htmlFor="infos">
              <input id="infos" name="infos_ventes" type="checkbox" value="oui" />
              J'accepte de recevoir par e-mail les dates des prochaines ventes de la ferme (facultatif, désinscription à tout moment).
            </label>
            <p className="rgpd-note">Vos informations servent uniquement à {LEGAL.societe} pour répondre à votre demande et préparer votre commande. Elles ne sont jamais cédées à des tiers. Vous pouvez y accéder, les rectifier ou les faire supprimer en écrivant à {LEGAL.email}. En savoir plus : <a href="confidentialite.html">politique de confidentialité</a>.</p>
            <div>
              <button className="btn dark" type="submit" disabled={state.sending} style={state.sending ? { opacity: 0.6 } : undefined}>
                {state.sending ? 'Envoi…' : 'Envoyer ma demande'}<Arrow />
              </button>
            </div>
            {state.err && <div className="err" role="alert">{state.err}</div>}
            {state.ok && <div className="ok"><Check width="20" height="20" />Merci, votre demande a bien été envoyée.</div>}
          </form>
        </div>

        <aside className="infos rv d1">
          <img src={LOGO} alt="Logo La Ferme de la Croix Blanche" loading="lazy" />
          <div><div className="lbl">Passez votre commande</div><a className="tel" href={TEL_HREF}>{TEL}</a></div>
          <div><div className="lbl">Adresse</div><p>983 RD La Croix Blanche<br />78440 Drocourt</p></div>
          <div><div className="lbl">Boucherie dans les Yvelines</div><p>Viande bovine · Produits fermiers · Œufs · Pension de chevaux</p></div>
          <div className="links">
            <a className="btn" href={MAPS} target="_blank" rel="noopener">Itinéraire</a>
            <a className="btn ghost" href={FACEBOOK} target="_blank" rel="noopener">Facebook</a>
          </div>
        </aside>
      </div>
    </section>
  )
}
