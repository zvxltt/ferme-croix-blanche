import { IMG, LOGO } from '../data'
import { Arrow } from '../icons'
import { useProchaineVente } from './Ventes'

// Sillons de champ en fond
const SILLONS = Array.from({ length: 20 }, (_, i) => {
  const y = 120 + i * 46
  return `M-50 ${y} C 300 ${y - 60 - i * 6}, 700 ${y + 50 + i * 4}, 1500 ${y - 30 - i * 8}`
})

// Titre découpé mot par mot pour l'animation d'entrée
const TITRE = ['La', 'viande', 'de', <em key="e">notre</em>, 'ferme,', 'du', 'pré', 'à', 'votre', 'table']

export default function Hero() {
  const { label } = useProchaineVente()
  return (
    <section className="hero" style={{ paddingBlock: 0 }}>
      <svg className="hero-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {SILLONS.map((d) => <path key={d} d={d} />)}
      </svg>
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div>
          <div className="eyebrow fade" style={{ transitionDelay: '.3s' }}>Exploitation familiale · Vente directe</div>
          <h1 style={{ marginTop: 22 }}>
            {TITRE.map((w, i) => (
              <span key={i}>
                <span className="w"><span style={{ transitionDelay: `${0.45 + i * 0.07}s` }}>{w}</span></span>
                {i < TITRE.length - 1 && ' '}
              </span>
            ))}
          </h1>
          <div className="hero-row">
            <p className="fade" style={{ transitionDelay: '1.1s' }}>
              Éleveurs et polyculteurs à Drocourt, nous vendons au détail une gamme variée de viandes tendres issues de notre élevage, et des œufs fermiers frais. Chaque mois, la ferme vous ouvre ses portes.
            </p>
            <div className="cta fade" style={{ transitionDelay: '1.25s' }}>
              <a className="btn" href="#ventes">Prochaines ventes<Arrow /></a>
              <a className="btn ghost" href="#tarifs">Voir les tarifs</a>
            </div>
          </div>
        </div>

        <div className="collage" aria-label="Photos de la ferme">
          <div className="ph-c ph-1"><img src={IMG + 'Modif%2030.4.24/cow1.jpg'} alt="Génisse Parthenaise" /><span>Génisse Parthenaise</span></div>
          <div className="ph-c ph-2"><img src={IMG + 'AGNEAUX%20LABEL%20ROUGE.webp'} alt="Agneaux label rouge" /><span>Label rouge</span></div>
          <div className="ph-c ph-3"><img src={IMG + 'Modif%2030.4.24/veau.jpg'} alt="Veau de marque" /><span>Veau de marque</span></div>
          <div className="seal" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text><textPath href="#circ">Vente directe • Drocourt • Yvelines • Depuis la ferme • </textPath></text>
            </svg>
            <img src={LOGO} alt="" />
          </div>
        </div>

        <div className="hero-foot fade" style={{ transitionDelay: '1.4s' }}>
          <span className="live"><i />Prochaine vente : <b>{label}</b></span>
          <a className="scroll-cue" href="#ferme"><span />Découvrir</a>
        </div>
      </div>
    </section>
  )
}
