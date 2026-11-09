import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CARROUSEL, IMG } from '../data'
import { CAROUSEL_ICONS } from '../icons'
import { useSite } from '../store'

// Carrousel des produits, adapté du composant FeatureCarousel
const AUTO_PLAY_INTERVAL = 3000
const ITEM_HEIGHT = 65
const N = CARROUSEL.length

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export default function FeatureCarousel() {
  const { setTarifCat } = useSite()
  const [step, setStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const root = useRef(null)
  const touchX = useRef(null)
  const reduce = useRef(typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)

  const currentIndex = ((step % N) + N) % N
  const nextStep = useCallback(() => setStep((s) => s + 1), [])

  const goTo = (index) => {
    const diff = (index - currentIndex + N) % N
    if (diff > 0) setStep((s) => s + diff)
  }

  // Défilement automatique, seulement quand le carrousel est à l'écran
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    io.observe(root.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (isPaused || !visible || reduce.current) return
    const id = setInterval(() => { if (!document.hidden) nextStep() }, AUTO_PLAY_INTERVAL)
    return () => clearInterval(id)
  }, [nextStep, isPaused, visible])

  const status = (index) => {
    let d = index - currentIndex
    if (d > N / 2) d -= N
    if (d < -N / 2) d += N
    return d === 0 ? 'active' : d === -1 ? 'prev' : d === 1 ? 'next' : 'hidden'
  }

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setIsPaused(true) }
  const onTouchEnd = (e) => {
    if (touchX.current != null) {
      const dx = e.changedTouches[0].clientX - touchX.current
      if (Math.abs(dx) > 40) setStep((s) => s + (dx < 0 ? 1 : -1))
    }
    touchX.current = null
    setTimeout(() => setIsPaused(false), 4000)
  }

  return (
    <div
      ref={root} className="fc" aria-roledescription="carrousel" aria-label="Nos produits"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)}
    >
      <div className="fc-left">
        <div className="fc-chips">
          {CARROUSEL.map((f, index) => {
            const d = wrap(-(N / 2), N / 2, index - currentIndex)
            const Icon = CAROUSEL_ICONS[f.icon]
            const isActive = index === currentIndex
            return (
              <motion.div
                key={f.label}
                className={'fc-chip' + (isActive ? ' on' : '')}
                initial={false}
                animate={{ y: d * ITEM_HEIGHT, opacity: Math.max(0, 1 - Math.abs(d) * 0.25) }}
                transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 1 }}
              >
                <button type="button" onClick={() => goTo(index)} tabIndex={Math.abs(d) <= 2 ? 0 : -1}>
                  <Icon size={18} />
                  <span>{f.label}</span>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="fc-right">
        <div className="fc-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {CARROUSEL.map((f, index) => {
            const st = status(index)
            const isActive = st === 'active', isPrev = st === 'prev', isNext = st === 'next'
            return (
              <motion.div
                key={f.label}
                className={'fc-card' + (isActive ? ' active' : '')}
                aria-hidden={!isActive}
                initial={false}
                animate={{
                  x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                  scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                  opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                  rotate: isPrev ? -3 : isNext ? 3 : 0,
                  zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
              >
                <img src={IMG + f.img} alt={f.label} loading="lazy" />
                                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="fc-cap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <span className="fc-tag">{index + 1} • {f.label}</span>
                      <p>{f.desc}</p>
                      {f.tab && <a href="#tarifs" onClick={() => setTarifCat(f.tab)}>Voir les tarifs <Arrow /></a>}
                      {f.href && <a href={f.href}>En savoir plus <Arrow /></a>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
        <div className="fc-dots">
          {CARROUSEL.map((f, i) => (
            <button key={f.label} type="button" aria-label={f.label} className={i === currentIndex ? 'on' : ''} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" /></svg>
)
