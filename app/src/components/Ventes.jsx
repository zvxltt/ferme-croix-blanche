import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { TARIFS, VENTES, TEL } from '../data'
import { ITEMS, useSite } from '../store'
import { Plus, Search } from '../icons'
import FeatureCarousel from './FeatureCarousel'

// Prochaine vente (la première dont le dernier jour n'est pas passé)
export function useProchaineVente() {
  return useMemo(() => {
    const now = new Date()
    const v = VENTES.find((x) => new Date(x[3] + 'T13:00') >= now)
    if (!v) return { vente: null, label: 'Dates à venir' }
    return { vente: v, label: v[0].replace(/, (?=[^,]*$)/, ' et ') + ' ' + v[1].toLowerCase() }
  }, [])
}

function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id) }, [])
  const s = Math.max(0, (target - now) / 1000)
  if (s <= 0) return <div className="cd"><div style={{ minWidth: 'auto' }}><b style={{ fontSize: '1.4rem' }}>Vente en cours</b><span>Venez nous voir !</span></div></div>
  const parts = [[Math.floor(s / 86400), 'jours'], [Math.floor((s % 86400) / 3600), 'heures'], [Math.floor((s % 3600) / 60), 'min'], [Math.floor(s % 60), 'sec']]
  return (
    <div className="cd" aria-label="Compte à rebours">
      {parts.map(([n, l]) => <div key={l}><b>{String(n).padStart(2, '0')}</b><span>{l}</span></div>)}
    </div>
  )
}

function Dates({ vente }) {
  const ref = useRef(null)
  const now = new Date()
  useEffect(() => {
    const d = ref.current, el = d?.querySelector('.date.now')
    if (el && d.scrollWidth > d.clientWidth) d.scrollLeft = el.offsetLeft - d.clientWidth / 2 + el.offsetWidth / 2
  }, [])
  return (
    <div className="dates rv" ref={ref}>
      {VENTES.map((v) => {
        const isNow = vente && v === vente
        const past = new Date(v[3] + 'T13:00') < now
        return (
          <div key={v[2]} className={'date' + (isNow ? ' now' : past ? ' past' : '')}>
            <small>{isNow ? 'Prochaine vente' : v[1]}</small>
            <b>{v[0]}</b>
            {isNow && <small>{v[1]}</small>}
          </div>
        )
      })}
    </div>
  )
}

const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

function Qty({ id }) {
  const { list, add, remove } = useSite()
  const n = list[id]
  if (!n) return <button className="add" type="button" onClick={() => add(id)}><Plus />Ajouter</button>
  return (
    <span className="step">
      <button type="button" aria-label="Retirer un" onClick={() => remove(id)}>−</button>
      <b>{n}</b>
      <button type="button" aria-label="Ajouter un" onClick={() => add(id)}>+</button>
    </span>
  )
}
export { Qty }

function Tarifs() {
  const { tarifCat, setTarifCat } = useSite()
  const [q, setQ] = useState('')
  const tabsRef = useRef(null)
  const [pill, setPill] = useState({ w: 0, x: 0 })
  const term = norm(q.trim())

  const rows = useMemo(() => {
    const all = Object.values(ITEMS)
    return term ? all.filter((it) => norm(`${it.nom} ${it.detail} ${it.cat}`).includes(term)) : all.filter((it) => it.cat === tarifCat)
  }, [term, tarifCat])

  // Position de la pastille sous l'onglet actif
  useLayoutEffect(() => {
    const place = () => {
      const b = tabsRef.current?.querySelector('.tab[aria-selected="true"]')
      if (b) setPill({ w: b.offsetWidth, x: b.offsetLeft })
    }
    place()
    document.fonts?.ready.then(place)
    addEventListener('resize', place)
    return () => removeEventListener('resize', place)
  }, [tarifCat, term])

  const choose = (k, el) => { setTarifCat(k); setQ(''); el.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' }) }

  return (
    <>
      <div className="tarifs-head" id="tarifs">
        <div className="stack">
          <div className="eyebrow rv">Tarifs au kilo</div>
          <h2 className="rv d1">Nos prix, <em>en toute transparence</em></h2>
        </div>
        <p className="how rv d2"><b>+</b>Ajoutez les morceaux qui vous intéressent : votre liste sera jointe à votre demande de commande.</p>
      </div>

      <div className="tbar">
        <div className="search">
          <Search />
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher : entrecôte, gigot…" autoComplete="off" enterKeyHint="search" aria-label="Rechercher un morceau"
          />
          {q && <button type="button" aria-label="Effacer la recherche" onClick={() => setQ('')}>×</button>}
        </div>
        <div className={'tabs' + (term ? ' off' : '')} role="tablist" ref={tabsRef}>
          <span className="pill" style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} />
          {Object.keys(TARIFS).map((k) => (
            <button key={k} className="tab" type="button" role="tab" aria-selected={!term && k === tarifCat} onClick={(e) => choose(k, e.currentTarget)}>
              {k}<small>{TARIFS[k].length}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="plist" role="tabpanel" aria-live="polite" key={term ? 'q' : tarifCat}>
        {rows.length ? rows.map((it, i) => (
          <div className="pr" key={it.id} style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
            <div className="pr-t">
              {term && <span className="pr-c">{it.cat}</span>}
              <span className="pr-n">{it.nom}</span>
              {it.detail && <span className="pr-s">{it.detail}</span>}
              {it.surCommande && <span className="badge">Sur commande</span>}
            </div>
            {it.prix == null
              ? <b className="pr-p ask">Nous consulter</b>
              : <b className="pr-p">{it.prix} €<small>/kg</small></b>}
            <div className="qty"><Qty id={it.id} /></div>
          </div>
        )) : (
          <p className="empty">Aucun morceau ne correspond à « {q} ». Appelez-nous au {TEL}, nous avons peut-être ce que vous cherchez.</p>
        )}
      </div>
      <p className="note">Prix TTC au kilo, indicatifs : le prix final dépend du poids pesé à la vente. Joues et foie de porc sur commande.</p>
    </>
  )
}

export function Viandes() {
  return (
    <section id="viandes">
      <div className="wrap">
        <div className="v-head">
          <div className="stack">
            <div className="eyebrow rv">Nos viandes de haute qualité</div>
            <h2 className="rv d1">Des viandes fraîches, <em>élevées ici</em></h2>
          </div>
          <p className="lede rv d2">Nous élevons nos animaux dans nos pâturages verdoyants pour vous faire profiter d'une expérience gustative incomparable. Bœuf, agneau, porc et veau, découpés avec savoir-faire.</p>
        </div>
        <FeatureCarousel />
        <div className="eggs rv">
          <svg viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M23 4c8 0 15 13 15 22a15 15 0 0 1-30 0C8 17 15 4 23 4z" /><path d="M16 27a7 7 0 0 0 7 7" strokeLinecap="round" /></svg>
          <div><h3>Œufs fermiers</h3><p>À la texture parfaite, de poules élevées en plein air. Choisissez nos produits de qualité et préparez des plats savoureux.</p></div>
          <a className="btn ghost-d" href="#commander">Nous les demander</a>
        </div>
      </div>
    </section>
  )
}

export default function Ventes() {
  const { vente, label } = useProchaineVente()
  return (
    <section id="ventes" className="ventes">
      <div className="wrap">
        <div className="v-top">
          <div className="stack">
            <div className="eyebrow rv">Nos ventes au détail</div>
            <h2 className="rv d1">Rendez-vous <em>à la ferme</em></h2>
            <p className="lede rv d2">Commandez votre colis : vos morceaux sont découpés avec savoir-faire, en fonction de vos demandes. Venez goûter la fraîcheur et la saveur de nos produits.</p>
            <div className="hours rv d3">
              <div><span>Vendredi</span><b>13 h 30 – 19 h</b></div>
              <div><span>Samedi et dimanche</span><b>9 h – 13 h</b></div>
            </div>
          </div>
          <div className="next-card rv d2">
            <small>Prochaine vente</small>
            <div className="big">{label}</div>
            <p>À la ferme, 983 RD La Croix Blanche, Drocourt</p>
            {vente && <Countdown target={new Date(vente[2] + 'T13:30').getTime()} />}
          </div>
        </div>
        <Dates vente={vente} />
        <Tarifs />
      </div>
    </section>
  )
}
