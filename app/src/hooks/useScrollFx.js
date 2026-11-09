import { useEffect } from 'react'

const $$ = (s) => [...document.querySelectorAll(s)]
const SECTIONS = ['ferme', 'viandes', 'ventes', 'pension', 'commander']

// Effets liés au défilement : apparitions, en-tête, parallaxe, frise, compteurs, boutons magnétiques
export default function useScrollFx() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = matchMedia('(pointer:coarse)').matches
    const cleanups = []

    // Apparitions au défilement
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    $$('.rv,.clip').forEach((el) => io.observe(el))
    cleanups.push(() => io.disconnect())

    // Compteurs
    $$('[data-count]').forEach((el) => {
      const n = +el.dataset.count
      if (reduce) return
      el.textContent = '0'
      const o = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        o.disconnect()
        let t0
        const step = (t) => {
          t0 ??= t
          const p = Math.min(1, (t - t0) / 1800)
          el.textContent = Math.round(n * (1 - Math.pow(1 - p, 4)))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, { threshold: 0.6 })
      o.observe(el)
      cleanups.push(() => o.disconnect())
    })

    // Boucle de défilement
    const hd = document.getElementById('hd')
    const secs = SECTIONS.map((id) => document.getElementById(id))
    const links = $$('.nav a')
    const pars = $$('.par')
    const words = $$('#manifest .t')
    const man = document.getElementById('manifest')
    const tl = document.getElementById('tl')
    const tlp = document.getElementById('tlp')
    const tarifs = document.getElementById('tarifs')
    let lastY = 0, ticking = false

    const frame = () => {
      ticking = false
      const y = scrollY, vh = innerHeight
      const b = document.body
      hd.classList.toggle('solid', y > 60)
      hd.classList.toggle('hide', y > lastY && y > vh && !b.classList.contains('menu-open'))
      lastY = y
      document.documentElement.style.setProperty('--ht', hd.classList.contains('hide') ? '0px' : hd.offsetHeight + 'px')

      let cur = null
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * 0.4) cur = i })
      links.forEach((a, i) => a.classList.toggle('on', i === cur))
      const tr = tarifs ? tarifs.getBoundingClientRect().top : Infinity
      const act = cur === null ? 0 : cur === 1 ? 2 : cur === 2 ? (tr < vh * 0.45 ? 3 : 2) : cur === 4 ? 5 : -1
      $$('#callbar [data-s]').forEach((el) => el.classList.toggle('on', +el.dataset.s === act))

      if (reduce) return
      if (!touch) pars.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) return
        const c = r.top + r.height / 2 - vh / 2
        el.style.transform = `translate3d(0,${c * +el.dataset.speed}px,0) scale(1.12)`
      })
      if (man) {
        const mr = man.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh * 0.85 - mr.top) / (mr.height + vh * 0.35)))
        const n = Math.round(p * words.length)
        words.forEach((w, i) => w.classList.toggle('lit', i < n))
      }
      if (tl && tlp) {
        const r = tl.getBoundingClientRect()
        tlp.style.height = Math.min(r.height - 20, Math.max(0, vh * 0.6 - r.top)) + 'px'
        tl.querySelectorAll('li').forEach((li) => li.classList.toggle('in', li.getBoundingClientRect().top < vh * 0.6))
      }
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame) } }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', frame)
    frame()
    cleanups.push(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', frame) })

    // Boutons magnétiques (souris uniquement)
    if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
      const move = (e) => {
        const btn = e.target.closest('.btn')
        if (!btn) return
        const r = btn.getBoundingClientRect()
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`
      }
      const out = (e) => { const btn = e.target.closest('.btn'); if (btn && !btn.contains(e.relatedTarget)) btn.style.transform = '' }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseout', out)
      cleanups.push(() => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseout', out) })
    }

    return () => cleanups.forEach((f) => f())
  }, [])
}
