import { useEffect, useRef } from 'react'
import { FACEBOOK, MAPS, TEL, TEL_HREF } from '../data'
import { ITEMS, useSite } from '../store'
import { CartIcon, HomeIcon, PhoneIcon } from '../icons'

export function Footer({ base = '' }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div style={{ maxWidth: '34ch' }}>
            <h4>La Ferme de la Croix Blanche</h4>
            <p style={{ color: 'rgba(255,255,255,.6)' }}>Exploitation familiale à Drocourt. Vente directe de viandes et d'œufs fermiers, pension familiale de chevaux.</p>
          </div>
          <nav><h4>Navigation</h4><a href={base + '#ferme'}>La ferme</a><a href={base + '#viandes'}>Nos viandes</a><a href={base + '#tarifs'}>Ventes &amp; tarifs</a><a href={base + '#pension'}>Pension chevaux</a></nav>
          <nav><h4>Contact</h4><a href={TEL_HREF}>{TEL}</a><a href={FACEBOOK} target="_blank" rel="noopener">Facebook</a><a href={MAPS} target="_blank" rel="noopener">Google Maps</a></nav>
        </div>
        <div className="word" aria-hidden="true">Croix <em>Blanche</em></div>
        <div className="legal"><span>© {new Date().getFullYear()} La Ferme de la Croix Blanche · SCEA Rosentritt</span><span className="legal-links"><a href="mentions-legales.html">Mentions légales</a><a href="confidentialite.html">Confidentialité</a></span></div>
      </div>
    </footer>
  )
}

// Compteur qui rebondit quand on ajoute un article
function Count({ n }) {
  const { bump } = useSite()
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !bump) return
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump')
  }, [bump])
  return <b className="cnt" ref={ref}>{n}</b>
}

// Barre de navigation façon application (téléphone)
export function AppBar() {
  const { count, setSheetOpen } = useSite()
  return (
    <nav className="appbar" id="callbar" aria-label="Navigation rapide">
      <a href="#accueil" data-s="0"><HomeIcon /><span>Accueil</span></a>
      {count > 0
        ? <button type="button" data-s="3" onClick={() => setSheetOpen(true)}><CartIcon /><span>Ma liste</span><Count n={count} /></button>
        : <a href="#tarifs" data-s="3"><CartIcon /><span>Commander</span></a>}
      <a href={TEL_HREF} className="call" aria-label={`Appeler la ferme au ${TEL}`}><i><PhoneIcon /></i><span>Appeler</span></a>
    </nav>
  )
}

export function Toast() {
  const { toastMsg } = useSite()
  return <div className={'toast' + (toastMsg ? ' on' : '')} role="status" aria-live="polite">{toastMsg}</div>
}

// Liste de commande : pastille (ordinateur) + panneau
export function OrderSheet() {
  const { list, add, remove, clear, count, sheetOpen, setSheetOpen, attachToForm } = useSite()
  const closeRef = useRef(null)
  useEffect(() => { if (sheetOpen) closeRef.current?.focus() }, [sheetOpen])

  return (
    <>
      <div className={'dock' + (count > 0 && !sheetOpen ? ' show' : '')} role="region" aria-label="Ma liste de commande">
        <span>Ma liste <Count n={count} /></span>
        <button className="btn" type="button" onClick={() => setSheetOpen(true)}>Voir et commander</button>
      </div>

      <div className="scrim" onClick={() => setSheetOpen(false)} />
      <aside className="sheet" role="dialog" aria-modal="true" aria-labelledby="shTitle" aria-hidden={!sheetOpen}>
        <div className="sh-head">
          <h3 id="shTitle">Ma liste</h3>
          <button className="x" type="button" aria-label="Fermer" ref={closeRef} onClick={() => setSheetOpen(false)}>×</button>
        </div>
        <div className="sh-body">
          {count ? Object.entries(list).map(([id, n]) => {
            const it = ITEMS[id]
            return (
              <div className="li" key={id}>
                <span className="n">{it.nom}</span>
                <span className="step">
                  <button type="button" aria-label="Retirer un" onClick={() => remove(id)}>−</button>
                  <b>{n}</b>
                  <button type="button" aria-label="Ajouter un" onClick={() => add(id, { notify: false })}>+</button>
                </span>
                <span className="s">{it.cat}{it.detail ? ` · ${it.detail}` : ''}{it.prix ? ` · ${it.prix} €/kg` : ''}</span>
              </div>
            )
          }) : <div className="sh-empty"><p>Votre liste est vide. Ajoutez des morceaux depuis les tarifs.</p></div>}
        </div>
        {count > 0 && (
          <div className="sh-foot">
            <p>Les quantités sont en nombre de pièces ou de colis, comme indiqué au tarif. Le prix final dépend du poids pesé.</p>
            <div className="row2"><button className="btn dark" type="button" onClick={attachToForm}>Joindre à ma demande</button></div>
            <button className="linkbtn" type="button" onClick={clear}>Vider la liste</button>
          </div>
        )}
      </aside>
    </>
  )
}
