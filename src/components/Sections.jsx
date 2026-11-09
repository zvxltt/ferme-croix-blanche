import { IMG, VILLES } from '../data'
import { Arrow, Check } from '../icons'
import { useSite } from '../store'

const PRODUITS = ['Génisse Parthenaise', 'Agneau label rouge', 'Porc fermier', 'Veau de marque', 'Œufs fermiers', 'Pension de chevaux']

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {[...PRODUITS, ...PRODUITS].map((p, i) => <span key={i}>{p}</span>)}
      </div>
    </div>
  )
}

const MANIFESTE = "Depuis de nombreuses années, nous avons choisi la vente directe à la ferme. Le vrai goût de la tradition, en circuit court, pour soutenir une agriculture locale et respectueuse de l'environnement."
const DORES = ['vente', 'directe', 'tradition,', 'circuit', 'court,']

export function Ferme() {
  return (
    <section id="ferme">
      <div className="wrap">
        <div className="manifest">
          <div className="eyebrow rv" style={{ marginBottom: 30 }}>La ferme</div>
          <p id="manifest">
            {MANIFESTE.split(' ').map((w, i) => (
              <span key={i}><span className={'t' + (DORES.includes(w.toLowerCase()) ? ' g' : '')}>{w}</span> </span>
            ))}
          </p>
        </div>

        <div className="split" style={{ marginTop: 'clamp(80px,10vw,140px)' }}>
          <div className="ferme-media">
            <div className="photo clip">
              <img className="par" data-speed="-.08" src={IMG + 'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur1.png'} alt="La Ferme de la Croix Blanche à Drocourt" loading="lazy" />
              <span className="chip"><i />Drocourt, Yvelines</span>
            </div>
            <div className="photo mini clip d2"><img src={IMG + 'Modif%2030.4.24/cow1.jpg'} alt="Génisse Parthenaise au pré" loading="lazy" /></div>
          </div>
          <div className="stack">
            <h2 className="rv">Une exploitation <em>familiale</em> à Drocourt</h2>
            <p className="lede rv d1">La Ferme de la Croix Blanche est une exploitation familiale. En tant que polyculteurs et éleveurs expérimentés, nous nous engageons à vous proposer des produits de qualité.</p>
            <p className="rv d2">Nos 50 hectares de prairies offrent un cadre idyllique où nos vaches paissent en toute quiétude à la belle saison. Une partie de leur alimentation provient de nos propres cultures.</p>
            <div className="cultures rv d2">{['Blé', 'Colza', 'Maïs', 'Avoine', 'Betterave sucrière'].map((c) => <span key={c}>{c}</span>)}</div>
            <p className="rv d3">Au-delà de la vente, nous ouvrons nos portes à toutes les personnes désireuses de découvrir la vie à la ferme.</p>
          </div>
        </div>

        <div className="stats">
          <div className="stat rv"><b><span data-count="50">50</span></b><span>hectares de prairies</span></div>
          <div className="stat rv d1"><b><span data-count="80">80</span></b><span>bovins élevés sur l'exploitation</span></div>
          <div className="stat rv d2"><b>U<sup>+</sup></b><span>notation selon la grille Europa</span></div>
          <div className="stat rv d3"><b>A</b><span>classification de propreté</span></div>
        </div>
      </div>
    </section>
  )
}

export function Heritage() {
  return (
    <section className="heritage">
      <div className="wrap heritage-grid">
        <div className="sticky stack">
          <div className="eyebrow rv">Trois générations</div>
          <h2 className="rv d1">Une ferme qui se <em>transmet</em></h2>
          <p className="rv d2">De la production laitière à l'élevage de génisses Parthenaises, la ferme a évolué avec chaque génération, en gardant la même passion des animaux.</p>
        </div>
        <div>
          <div className="timeline" id="tl">
            <span className="prog" id="tlp" />
            <ol style={{ listStyle: 'none', padding: 0 }}>
              <li className="rv"><small>Les grands-parents</small><h3>La production laitière</h3><p>À l'origine, la ferme familiale était tournée vers le lait.</p></li>
              <li className="rv"><small>Le père</small><h3>Le passage à la viande</h3><p>En prenant la relève, il oriente l'exploitation vers l'élevage pour la viande.</p></li>
              <li className="rv"><small>Aujourd'hui · Marie-Sophie</small><h3>Les génisses Parthenaises</h3><p>Elle reprend la ferme et prend soin des veaux femelles dès leur plus jeune âge, jusqu'à l'âge adulte.</p></li>
            </ol>
          </div>
          <figure className="quote rv">
            <blockquote>« Être productrice me procure un sentiment de <em>liberté</em> que je n'ai pas trouvé dans mes expériences professionnelles précédentes. »</blockquote>
            <p style={{ color: 'rgba(255,255,255,.75)', marginTop: 20 }}>Je m'appelle Marie-Sophie et je suis éleveuse de vaches Parthenaises. Leurs robes sont d'un magnifique froment uni, leurs yeux semblent soulignés de noir comme s'ils étaient maquillés. Depuis mon enfance, ma passion pour les animaux ne cesse de grandir.</p>
            <figcaption className="who"><i /><div><b>Marie-Sophie</b><span>Éleveuse et gérante</span></div></figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

const EQUIPEMENTS = ['10 box spacieux', 'Hébergement box ou pré', "Carrière entretenue toute l'année", 'Sellerie bien équipée', 'Zone de douche', 'Fourrage de qualité', 'Surveillance sur place', 'Sentiers de balade']

export function Pension() {
  const { setObjet } = useSite()
  return (
    <section id="pension">
      <div className="wrap split">
        <div className="photo pension-media clip">
          <img className="par" data-speed="-.08" src={IMG + 'Modif%2030.4.24/Un-h%C3%A9bergement-de-qualit%C3%A9-pour-votre-cheval-%C3%A0-Aincourt-et-%C3%A0-Arthies-1.png'} alt="Les écuries de la ferme" loading="lazy" />
        </div>
        <div className="stack">
          <div className="eyebrow rv">Pension familiale de chevaux</div>
          <h2 className="rv d1">Les écuries de la <em>Croix Blanche</em></h2>
          <p className="lede rv d2">Chevaux, ânes et poneys sont accueillis en pension sécurisée, en box ou au pré selon les besoins de chaque animal. Loisirs, retraite ou convalescence : notre petite écurie offre un cadre où ils s'épanouissent.</p>
          <div className="price rv d2"><b>350 €</b><span>par mois</span></div>
          <p className="rv d3">Un bon rapport qualité-prix pour cavaliers amateurs ou professionnels, avec un accès privilégié à des sentiers de balade pittoresques.</p>
          <ul className="feat rv d3">{EQUIPEMENTS.map((e) => <li key={e}><Check />{e}</li>)}</ul>
          <div className="rv">
            <a className="btn dark" href="#commander" onClick={() => setObjet('La pension pour chevaux')}>Demander une place<Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

const FORTS = [
  ['i.', 'Produits de qualité', 'Bœuf Parthenais, agneau label rouge, porc fermier, veau de marque et œufs frais, élevés sur nos terres.', <path key="p" d="M15 3l3.6 7.4 8.1 1.2-5.9 5.7 1.4 8.1L15 21.6l-7.2 3.8 1.4-8.1-5.9-5.7 8.1-1.2z" />],
  ['ii.', 'Respect des animaux', 'Nos vaches paissent à la belle saison et sont nourries en partie avec nos propres cultures.', <path key="p" d="M15 26S4 19.5 4 12a6 6 0 0 1 11-3.4A6 6 0 0 1 26 12c0 7.5-11 14-11 14z" />],
  ['iii.', 'Transparence des prix', 'Tous nos tarifs au kilo sont affichés, morceau par morceau, sans surprise.', <path key="p" d="M21 8a9 9 0 1 0 0 14M5 13h12M5 17h12" />],
]

export function Engagements() {
  const row = (a) => [...a, ...a].map((v, i) => <span key={i}>{v}</span>)
  return (
    <section className="engage">
      <div className="wrap">
        <div className="stack">
          <div className="eyebrow rv">Nos engagements</div>
          <h2 className="rv d1">Les points forts <em>de la ferme</em></h2>
        </div>
        <div className="forts">
          {FORTS.map(([n, t, d, ic], i) => (
            <div key={n} className={'fort rv' + (i ? ' d' + i : '')}>
              <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{ic}</svg>
              <span className="n">{n}</span><h3>{t}</h3><p>{d}</p>
            </div>
          ))}
        </div>
        <div className="zone">
          <h3 className="rv">Optez pour nos viandes où que vous soyez près de Drocourt</h3>
          <div className="mq2"><div className="track">{row(VILLES.slice(0, 7))}</div></div>
          <div className="mq2 rev"><div className="track">{row(VILLES.slice(7))}</div></div>
        </div>
      </div>
    </section>
  )
}
