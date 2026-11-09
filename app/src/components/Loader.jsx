import { useEffect, useState } from 'react'
import { LOGO } from '../data'

// Écran de chargement avec le logo, puis lancement des animations d'entrée
export default function Loader() {
  const [prog, setProg] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const b = document.body
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const finish = () => {
      b.classList.remove('loading')
      if (!b.classList.contains('menu-open') && !b.classList.contains('sheet-open')) b.classList.remove('lock')
    }
    if (reduce) { finish(); b.classList.add('ready'); setGone(true); return }

    b.classList.add('loading', 'lock')
    const tick = setInterval(() => setProg((p) => Math.min(p + Math.random() * 22, 90)), 120)
    let started = false
    const go = () => {
      if (started) return
      started = true
      clearInterval(tick)
      setProg(100)
      setTimeout(() => {
        setDone(true)
        finish()
        setTimeout(() => b.classList.add('ready'), 250)
        setTimeout(() => setGone(true), 1500)
      }, 350)
    }
    if (document.readyState === 'complete') setTimeout(go, 600)
    else addEventListener('load', go)
    const max = setTimeout(go, matchMedia('(max-width:820px)').matches ? 1400 : 2400)
    return () => { clearInterval(tick); clearTimeout(max); removeEventListener('load', go) }
  }, [])

  if (gone) return null
  return (
    <div className={'loader' + (done ? ' done' : '')} aria-hidden="true">
      <div className="loader-in">
        <img src={LOGO} alt="" />
        <div className="bar"><i style={{ width: prog + '%' }} /></div>
        <small>Drocourt · Yvelines</small>
      </div>
    </div>
  )
}
