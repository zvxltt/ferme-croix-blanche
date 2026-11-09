import { useSite } from '../store'
import { LOGO, TEL, TEL_HREF } from '../data'
import { Arrow } from '../icons'

const LIENS = [
  ['#ferme', 'La ferme'],
  ['#viandes', 'Nos viandes'],
  ['#ventes', 'Ventes & tarifs'],
  ['#pension', 'Pension chevaux'],
  ['#commander', 'Contact'],
]

export default function Header() {
  const { menuOpen, setMenuOpen } = useSite()
  const close = () => setMenuOpen(false)

  return (
    <>
      <header id="hd">
        <div className="wrap bar">
          <a className="brand" href="#accueil" aria-label="Accueil">
            <img src={LOGO} alt="Logo La Ferme de la Croix Blanche" />
            <span><b>La Croix Blanche</b><small>Ferme à Drocourt</small></span>
          </a>
          <ul className="nav">
            {LIENS.map(([h, l]) => <li key={h}><a href={h}>{l}</a></li>)}
          </ul>
          <a className="btn" href="#tarifs">Commander<Arrow /></a>
          <button
            className="burger" type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen} aria-controls="drawer"
            onClick={() => setMenuOpen(!menuOpen)}
          ><i /><i /></button>
        </div>
      </header>

      <nav className="drawer" id="drawer" aria-label="Menu" aria-hidden={!menuOpen}>
        {LIENS.map(([h, l], i) => (
          <a key={h} className="l" href={h} onClick={close} tabIndex={menuOpen ? 0 : -1}>
            {l} <small>{String(i + 1).padStart(2, '0')}</small>
          </a>
        ))}
        <div className="foot">
          <p>983 RD La Croix Blanche, 78440 Drocourt</p>
          <a className="btn dark" href={TEL_HREF} tabIndex={menuOpen ? 0 : -1}>Appeler le {TEL}</a>
        </div>
      </nav>
    </>
  )
}
