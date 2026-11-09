import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { IMG, LOGO, MAPS, TARIFS, TEL, TEL_HREF, VENTES } from '../data'
import { ITEMS, useSite } from '../store'
import { Plus, Search } from '../icons'
import FeatureCarousel from './FeatureCarousel'

/* Page de type « lieu » (design-taste) :
   accueil photo, visite en écran 2, l'offre, les tarifs, le moment typographique,
   la ferme (mur de photos), la pension, la commande, la clôture au nom de la ferme. */

const P = {
  hero: IMG + 'Modif%2030.4.24/cow1.jpg',
  visite: IMG + 'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur1.png',
  mur: [
    IMG + 'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur2.png',
    IMG + 'Modif%2030.4.24/veau.jpg',
    IMG + 'IMG_5865.webp',
    IMG + 'AGNEAUX%20LABEL%20ROUGE.webp',
  ],
  pension: IMG + 'Modif%2030.4.24/Un-h%C3%A9bergement-de-qualit%C3%A9-pour-votre-cheval-%C3%A0-Aincourt-et-%C3%A0-Arthies-1.png',
  pensionPetite: IMG + 'Bandeau/frame2.webp',
  commande: IMG + 'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur3.png',
}

export const HORAIRES = [
  { jours: 'Vendredi', heures: '13 h 30 – 19 h', idx: [5] },
  { jours: 'Samedi et dimanche', heures: '9 h – 13 h', idx: [6, 0] },
]

const Fleche = () => (
  <svg className="m-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" /></svg>
)

export function useProchaineVente() {
  return useMemo(() => {
    const now = new Date()
    const v = VENTES.find((x) => new Date(x[3] + 'T13:00') >= now)
    if (!v) return { vente: null, label: 'dates à venir', court: 'dates à venir' }
    const jours = v[0].replace(/, (?=[^,]*$)/, ' et ')
    return { vente: v, label: `${jours} ${v[1].toLowerCase()}`, court: `${v[0].split(',')[0]} ${v[1].split(' ')[0].toLowerCase()}` }
  }, [])
}

/* ---------- Navigation (nav-split) ---------- */
const MOTS = [['#ferme', 'La ferme'], ['#viandes', 'Viandes'], ['#tarifs', 'Tarifs'], ['#pension', 'Pension']]

export function Header() {
  const { menuOpen, setMenuOpen } = useSite()
  const close = () => setMenuOpen(false)
  return (
    <>
      <a className="skip" href="#contenu">Aller au contenu</a>
      <header className="nav" id="hd">
        <div className="wrap nav__row">
          <ul className="nav__words">
            {MOTS.map(([h, l]) => <li key={h}><a className="u-link" href={h}>{l}</a></li>)}
          </ul>
          <a className="nav__name" href="#accueil" aria-label="La Ferme de la Croix Blanche, accueil">
            <img src={LOGO} alt="" width="40" height="40" />
            <span>La Croix Blanche</span>
          </a>
          <div className="nav__end">
            <a className="u-link nav__visit" href="#visit">Venir</a>
            <a className="btn btn--primary" href="#tarifs">Commander</a>
          </div>
          <button
            className="nav__toggle" type="button" aria-expanded={menuOpen} aria-controls="menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen(!menuOpen)}
          ><i /><i /></button>
        </div>
      </header>
      <nav className="menu" id="menu" aria-label="Menu" hidden={!menuOpen}>
        <div className="wrap">
          {[...MOTS, ['#visit', 'Venir à la ferme'], ['#commander', 'Envoyer une commande']].map(([h, l]) => (
            <a key={h} href={h} onClick={close}>{l}</a>
          ))}
          <a className="btn btn--primary btn--full" href="#tarifs" onClick={close}>Commander un colis</a>
        </div>
      </nav>
    </>
  )
}

/* ---------- Accueil (place hero) ---------- */
export function Hero() {
  const { label } = useProchaineVente()
  return (
    <section className="hero hero--photo" id="accueil" data-enter>
      <figure className="hero__photo" data-phone-fill>
        <img src={P.hero} alt="Génisse Parthenaise au pré, à la Ferme de la Croix Blanche" fetchPriority="high" />
      </figure>
      <div className="wrap hero__row">
        <div className="hero__head">
          <p className="notice">Prochaine vente à la ferme : {label}</p>
          <h1>Viande de la ferme, vendue à Drocourt</h1>
        </div>
        <div className="hero__side">
          <p className="hero__sub">Génisse Parthenaise, agneau label rouge, porc et veau, chaque mois à la ferme.</p>
          <a className="btn btn--primary" href="#tarifs" id="hero-action">Commander un colis<Fleche /></a>
        </div>
      </div>
    </section>
  )
}

/* ---------- Visite (écran 2) ---------- */
export function Visit() {
  const { label } = useProchaineVente()
  const today = new Date().getDay()
  const now = new Date()
  const avenir = VENTES.filter((v) => new Date(v[3] + 'T13:00') >= now)
  return (
    <section className="sec" id="visit" data-place="visit" style={{ '--h': 1 }}>
      <div className="wrap">
        <h2>Venir à la ferme</h2>
        <div className="split">
          <div className="visit">
            <p className="visit__next"><span>Prochaine vente</span><strong>{label}</strong></p>
            <div className="visit__cols">
              <div className="stack-s">
                <a className="visit__addr u-link" href={MAPS} target="_blank" rel="noopener">983 route départementale<br />La Croix Blanche, 78440 Drocourt</a>
                <a className="u-link" href={TEL_HREF}>{TEL}</a>
                <a className="btn btn--secondary" href={MAPS} target="_blank" rel="noopener">Obtenir l'itinéraire</a>
              </div>
              <dl className="hours">
                {HORAIRES.map((h) => (
                  <div key={h.jours} className={h.idx.includes(today) ? 'is-today' : undefined}>
                    <dt>{h.jours}</dt><dd>{h.heures}</dd>
                  </div>
                ))}
                <p className="hours__note">Les jours de vente uniquement.</p>
              </dl>
            </div>
          </div>
          <figure className="pl-photo pl-photo--43">
            <img src={P.visite} alt="La Ferme de la Croix Blanche à Drocourt" loading="lazy" />
          </figure>
        </div>
        <div className="dates">
          <p className="t-label">Les dates de vente</p>
          <ul className="dates__list">
            {avenir.map((v, i) => (
              <li key={v[2]} className={i === 0 ? 'is-next' : undefined}><span>{v[1]}</span><b>{v[0]}</b></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- L'offre : les viandes (bande de surface) ---------- */
export function Viandes() {
  return (
    <section className="sec ground-surface" id="viandes" style={{ '--h': 1 }}>
      <div className="wrap">
        <div className="head-row">
          <h2>Nos viandes, élevées à Drocourt</h2>
          <p>80 bovins sur 50 hectares de prairies. <a className="u-link link-arrow" href="#tarifs">Voir les tarifs<Fleche /></a></p>
        </div>
        <FeatureCarousel />
        <p className="eggs">Nous vendons aussi des œufs fermiers, de poules élevées en plein air. <a className="u-link" href="#commander">Les demander avec votre commande</a></p>
      </div>
    </section>
  )
}

/* ---------- Tarifs ---------- */
const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

function Qty({ id, nom }) {
  const { list, add, remove } = useSite()
  const n = list[id]
  if (!n) return <button className="add" type="button" onClick={() => add(id)} aria-label={`Ajouter ${nom} à ma liste`}><Plus /><span className="add__txt">Ajouter</span></button>
  return (
    <span className="step">
      <button type="button" aria-label={`Retirer un ${nom}`} onClick={() => remove(id)}>−</button>
      <b aria-live="polite">{n}</b>
      <button type="button" aria-label={`Ajouter un ${nom}`} onClick={() => add(id)}>+</button>
    </span>
  )
}

export function Tarifs() {
  const { tarifCat, setTarifCat } = useSite()
  const [q, setQ] = useState('')
  const term = norm(q.trim())
  const rows = useMemo(() => {
    const all = Object.values(ITEMS)
    return term ? all.filter((it) => norm(`${it.nom} ${it.detail} ${it.cat}`).includes(term)) : all.filter((it) => it.cat === tarifCat)
  }, [term, tarifCat])

  return (
    <section className="sec" id="tarifs" style={{ '--h': 2 }}>
      <div className="wrap">
        <div className="head-row">
          <h2>Tarifs au kilo</h2>
          <p>Prix TTC. Le poids exact est pesé à la vente.</p>
        </div>
        <div className="tbar">
          <label className="search" htmlFor="q">
            <Search />
            <span className="sr-only">Rechercher un morceau</span>
            <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher : entrecôte, gigot…" autoComplete="off" enterKeyHint="search" />
            {q && <button type="button" aria-label="Effacer la recherche" onClick={() => setQ('')}>×</button>}
          </label>
          <div className="cats" role="tablist" aria-label="Catégories">
            {Object.keys(TARIFS).map((k) => (
              <button key={k} type="button" role="tab" className="cat u-link" aria-selected={!term && k === tarifCat}
                onClick={() => { setTarifCat(k); setQ('') }}>{k}</button>
            ))}
          </div>
        </div>
        <p className="tarifs__how">Ajoutez des morceaux à votre liste : elle sera jointe à votre commande.</p>
        <div className="rows rows--2" role="tabpanel" key={term ? 'q' : tarifCat}>
          {rows.length ? rows.map((it) => (
            <div className="row" key={it.id}>
              <div className="row__t">
                {term && <span className="row__cat">{it.cat}</span>}
                <span className="row__n">{it.nom}{it.surCommande && <em> · sur commande</em>}</span>
                {it.detail && <span className="row__d">{it.detail}</span>}
              </div>
              <span className="row__p">{it.prix == null ? 'Nous consulter' : <>{it.prix} €<small> /kg</small></>}</span>
              <Qty id={it.id} nom={it.nom} />
            </div>
          )) : <p className="empty">Aucun morceau ne correspond à « {q} ». Appelez-nous au {TEL}.</p>}
        </div>
      </div>
    </section>
  )
}

/* ---------- Moment : word-highlight ---------- */
const MANIFESTE = "Depuis de nombreuses années, nous avons choisi la vente directe à la ferme : le goût de la tradition, en circuit court, pour une agriculture locale et respectueuse de l'environnement."

export function Manifeste() {
  return (
    <section className="sec sec--statement" id="engagement" data-moment="word-highlight" style={{ '--h': 1 }}>
      <div className="wrap">
        <h2>Pourquoi la vente directe</h2>
        <p className="statement" id="manifest">
          {MANIFESTE.split(' ').map((w, i) => <span key={i}><span className="t">{w}</span> </span>)}
        </p>
      </div>
    </section>
  )
}

/* ---------- La ferme : mur de photos + histoire ---------- */
export function Ferme() {
  const alts = ['La ferme et ses produits', 'Veaux de la ferme', 'Porcs fermiers', 'Agneaux label rouge']
  return (
    <section className="sec" id="ferme" style={{ '--h': 1 }}>
      <div className="wrap">
        <div className="head-row">
          <h2>Trois générations à la ferme</h2>
          <p>Le lait chez les grands-parents, la viande avec le père, les Parthenaises aujourd'hui. <a className="u-link link-arrow" href="#visit">Venir nous voir<Fleche /></a></p>
        </div>
        <div className="wall">
          {P.mur.map((src, i) => (
            <a key={src} className="wall__item" href={i === 0 ? '#tarifs' : '#viandes'}>
              <img src={src} alt={alts[i]} loading="lazy" />
            </a>
          ))}
        </div>
        <div className="story">
          <div className="figs">
            <p className="fig"><b>50</b><span>hectares de prairies</span></p>
            <p className="fig"><b>80</b><span>bovins élevés sur l'exploitation</span></p>
          </div>
          <div className="story__text">
            <p className="lead">Marie-Sophie a repris la ferme familiale. Elle élève des vaches Parthenaises, à la robe froment et aux yeux soulignés de noir, et prend soin des veaux femelles dès leur plus jeune âge.</p>
            <p>Au pré à la belle saison, les vaches sont nourries en partie avec les cultures de la ferme : blé, colza, maïs, avoine et betterave sucrière. Leur viande est notée U+ sur la grille Europa et classée A en propreté.</p>
            <p className="quote">« Être productrice me procure un sentiment de liberté que je n'ai pas trouvé ailleurs. » <span>Marie-Sophie, gérante</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Pension (tall-small) ---------- */
const EQUIP = [
  ['Hébergement', 'En box (10 box spacieux) ou au pré'],
  ['Installations', "Carrière entretenue toute l'année, sellerie, douche"],
  ['Soins', 'Fourrage de qualité, surveillance sur place'],
  ['Balades', 'Accès à des sentiers autour de la ferme'],
]

export function Pension() {
  const { setObjet } = useSite()
  return (
    <section className="sec" id="pension" style={{ '--h': 1 }}>
      <div className="wrap tall-small">
        <figure className="pl-photo pl-photo--45 ts__tall">
          <img src={P.pension} alt="Les écuries de la ferme" loading="lazy" />
        </figure>
        <div className="ts__side">
          <div className="stack-m">
            <h2>Pension pour chevaux</h2>
            <p className="lead">Chevaux, ânes et poneys en pension familiale : loisirs, retraite ou convalescence.</p>
            <p className="price">350 € <span>par mois</span></p>
            <div className="rows">
              {EQUIP.map(([n, d]) => <div className="row row--info" key={n}><span className="row__n">{n}</span><span className="row__d">{d}</span></div>)}
            </div>
            <a className="u-link link-arrow" href="#commander" onClick={() => setObjet('La pension pour chevaux')}>Demander une place<Fleche /></a>
          </div>
          <figure className="pl-photo pl-photo--11 ts__small">
            <img src={P.pensionPetite} alt="Les prés autour de la ferme" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ---------- Commande (formulaire, en place de la clôture) ---------- */
const OBJETS = ['Une commande de viande', 'La pension pour chevaux', 'Une visite de la ferme', 'Autre chose']

export function Commande() {
  const { objet, setObjet, message, setMessage, count, listText, clear, setSheetOpen } = useSite()
  const [state, setState] = useState({ sending: false, ok: false, err: '', fields: {} })

  const submit = async (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const fields = {}
    if (!f.nom.value.trim()) fields.nom = 'Indiquez votre nom.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) fields.email = 'Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.'
    if (!f.message.value.trim()) fields.message = 'Écrivez votre message ou joignez votre liste.'
    if (Object.keys(fields).length) { setState({ sending: false, ok: false, err: '', fields }); f.querySelector('[aria-invalid="true"], #' + Object.keys(fields)[0])?.focus(); return }
    const data = new FormData(f)
    if (count) data.append('liste', listText())
    setState({ sending: true, ok: false, err: '', fields: {} })
    try {
      const r = await fetch('contact.php', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.ok) throw new Error(j.message || '')
      f.reset(); setMessage(''); setObjet(OBJETS[0]); clear()
      setState({ sending: false, ok: true, err: '', fields: {} })
    } catch (x) {
      setState({ sending: false, ok: false, fields: {}, err: (x.message ? x.message + '. ' : "La commande n'a pas pu être envoyée. ") + `Appelez-nous au ${TEL}.` })
    }
  }
  const err = (k) => state.fields[k] ? <span className="field__err" id={`${k}-err`}>{state.fields[k]}</span> : null
  const inv = (k) => ({ 'aria-invalid': !!state.fields[k], 'aria-describedby': state.fields[k] ? `${k}-err` : undefined })

  return (
    <section className="sec" id="commander" style={{ '--h': 1 }}>
      <div className="wrap">
        <div className="head-row">
          <h2>Envoyer votre commande</h2>
          <p>Nous vous recontactons pour la confirmer avant la vente.</p>
        </div>
        <div className="split split--book">
          <figure className="pl-photo pl-photo--43">
            <img src={P.commande} alt="Viande préparée à la ferme" loading="lazy" />
          </figure>
          <form className="book" action="contact.php" method="post" noValidate onSubmit={submit}>
            <input type="text" name="site_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
            <div className="field-row">
              <div className="field"><label htmlFor="nom">Nom et prénom</label><input id="nom" name="nom" autoComplete="name" {...inv('nom')} />{err('nom')}</div>
              <div className="field"><label htmlFor="tel">Téléphone</label><input id="tel" name="telephone" type="tel" autoComplete="tel" /></div>
            </div>
            <div className="field-row">
              <div className="field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" {...inv('email')} />{err('email')}</div>
              <div className="field"><label htmlFor="objet">Votre demande</label>
                <select id="objet" name="objet" value={objet} onChange={(e) => setObjet(e.target.value)}>{OBJETS.map((o) => <option key={o}>{o}</option>)}</select>
              </div>
            </div>
            {count > 0 && <p className="recap">Votre liste ({count} article{count > 1 ? 's' : ''}) sera jointe. <button type="button" className="u-link" onClick={() => setSheetOpen(true)}>Voir ma liste</button></p>}
            <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)} {...inv('message')} />{err('message')}</div>
            <label className="check" htmlFor="infos"><input id="infos" name="infos_ventes" type="checkbox" value="oui" />Recevoir par e-mail les dates des prochaines ventes (facultatif)</label>
            <button className="btn btn--primary" type="submit" disabled={state.sending}>{state.sending ? 'Envoi en cours' : 'Envoyer la commande'}</button>
            {state.err && <p className="form-msg form-msg--err" role="alert">{state.err}</p>}
            {state.ok && <p className="form-msg" role="status">Commande envoyée. Nous vous recontactons pour la confirmer.</p>}
            <p className="small">Vos données servent uniquement à traiter votre demande. <a className="u-link" href="confidentialite.html">Politique de confidentialité</a></p>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ---------- Clôture (close-word : le nom de la ferme) ---------- */
export function Close() {
  const { label } = useProchaineVente()
  return (
    <section className="sec close-word" id="fin" style={{ '--h': 1 }}>
      <div className="wrap">
        <div className="close__row">
          <div>
            <h2>À bientôt à la ferme</h2>
            <p>Prochaine vente : {label}.</p>
          </div>
          <a className="btn btn--primary" href="#tarifs">Commander un colis<Fleche /></a>
        </div>
        <p className="close__name" aria-hidden="true">La Croix Blanche</p>
      </div>
    </section>
  )
}

/* ---------- Pied de page (footer-visit) ---------- */
export function FooterVisit({ base = '' }) {
  const today = new Date().getDay()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__addr">
            <a className="u-link" href={MAPS} target="_blank" rel="noopener">983 route départementale La Croix Blanche, Drocourt</a>
            <p>Drocourt, dans les Yvelines. <a className="u-link" href={TEL_HREF}>{TEL}</a></p>
          </div>
          <dl className="hours">
            {HORAIRES.map((h) => (
              <div key={h.jours} className={h.idx.includes(today) ? 'is-today' : undefined}><dt>{h.jours}</dt><dd>{h.heures}</dd></div>
            ))}
            <p className="hours__note">Les jours de vente uniquement.</p>
          </dl>
        </div>
        <nav className="footer__nav" aria-label="Pied de page">
          {[...MOTS, ['#visit', 'Venir'], ['#commander', 'Commander']].map(([h, l]) => <a key={h} className="u-link" href={base + h}>{l}</a>)}
          <a className="u-link" href="https://www.facebook.com/Fermedelacroixblanche78" target="_blank" rel="noopener">Facebook</a>
        </nav>
        <div className="footer__legal">
          <span>© {new Date().getFullYear()} La Ferme de la Croix Blanche, SCEA Rosentritt</span>
          <span className="footer__links"><a className="u-link" href="mentions-legales.html">Mentions légales</a><a className="u-link" href="confidentialite.html">Confidentialité</a></span>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Effets : entrée de l'accueil, moment, navigation, barre mobile ---------- */
export function usePlaceFx() {
  useLayoutEffect(() => { document.documentElement.classList.add('is-entering') }, [])
  useEffect(() => {
    const root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-entered')))

    const words = [...document.querySelectorAll('#manifest .t')]
    const sec = document.getElementById('engagement')
    const heroBtn = document.getElementById('hero-action')
    const bar = document.getElementById('callbar')
    const ids = ['ferme', 'viandes', 'tarifs', 'pension']
    const links = [...document.querySelectorAll('.nav__words a')]
    let tick = false
    const frame = () => {
      tick = false
      const vh = innerHeight
      // Moment word-highlight : les mots s'allument pendant que sa section traverse l'écran
      if (sec && !reduce) {
        const r = sec.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height * 0.7)))
        const n = Math.round(p * words.length)
        words.forEach((w, i) => w.classList.toggle('lit', i < n))
      }
      // Lien actif dans la navigation
      let cur = -1
      ids.forEach((id, i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < vh * 0.4) cur = i })
      links.forEach((a, i) => a.toggleAttribute('aria-current', i === cur))
      // Barre du téléphone : visible une fois le bouton de l'accueil passé
      if (bar && heroBtn) bar.classList.toggle('show', heroBtn.getBoundingClientRect().bottom < 0)
    }
    if (reduce) words.forEach((w) => w.classList.add('lit'))
    const on = () => { if (!tick) { tick = true; requestAnimationFrame(frame) } }
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    frame()
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
}
