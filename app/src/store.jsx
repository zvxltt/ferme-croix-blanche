import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { TARIFS } from './data'

// Tous les morceaux, avec un identifiant stable "catégorie|index"
export const ITEMS = {}
Object.entries(TARIFS).forEach(([cat, rows]) =>
  rows.forEach(([label, prix], i) => {
    const surCommande = /sur commande/i.test(label)
    const clean = label.replace(/\s*\(sur commande\)/i, '')
    const k = clean.indexOf(' – ')
    ITEMS[`${cat}|${i}`] = {
      id: `${cat}|${i}`, cat, prix, surCommande,
      nom: k > -1 ? clean.slice(0, k) : clean,
      detail: k > -1 ? clean.slice(k + 3) : '',
    }
  })
)

const STORAGE = 'fcb-liste'
const Ctx = createContext(null)
export const useSite = () => useContext(Ctx)

function loadList() {
  try {
    const l = JSON.parse(localStorage.getItem(STORAGE) || '{}') || {}
    Object.keys(l).forEach((k) => { if (!ITEMS[k]) delete l[k] })
    return l
  } catch { return {} }
}

export function SiteProvider({ children }) {
  const [list, setList] = useState(loadList)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const [tarifCat, setTarifCat] = useState('Génisse Parthenaise')
  const [objet, setObjet] = useState('Une commande de viande')
  const [message, setMessage] = useState('')
  const [bump, setBump] = useState(0)
  const toastTimer = useRef()

  useEffect(() => { try { localStorage.setItem(STORAGE, JSON.stringify(list)) } catch {} }, [list])

  // Verrouille le défilement quand le menu ou la liste sont ouverts
  useEffect(() => {
    const b = document.body
    b.classList.toggle('menu-open', menuOpen)
    b.classList.toggle('sheet-open', sheetOpen)
    b.classList.toggle('lock', menuOpen || sheetOpen || b.classList.contains('loading'))
  }, [menuOpen, sheetOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setSheetOpen(false) } }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const toast = useCallback((node) => {
    setToastMsg(node)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(null), 1800)
  }, [])

  const add = useCallback((id, { notify = true } = {}) => {
    setList((l) => ({ ...l, [id]: (l[id] || 0) + 1 }))
    setBump((b) => b + 1)
    if (notify) {
      toast(<><b>{ITEMS[id].nom}</b> ajouté à votre liste</>)
      try { navigator.vibrate && navigator.vibrate(12) } catch {}
    }
  }, [toast])

  const remove = useCallback((id) => {
    setList((l) => {
      const n = { ...l }
      n[id] = (n[id] || 0) - 1
      if (n[id] <= 0) delete n[id]
      return n
    })
  }, [])

  const clear = useCallback(() => setList({}), [])
  const count = useMemo(() => Object.values(list).reduce((a, b) => a + b, 0), [list])

  const listText = useCallback(() =>
    Object.entries(list).map(([id, n]) => {
      const it = ITEMS[id]
      return `- ${n} × ${it.nom}${it.detail ? ` (${it.detail})` : ''} – ${it.cat}`
    }).join('\n'), [list])

  // Joint la liste au formulaire de contact
  const attachToForm = useCallback(() => {
    setSheetOpen(false)
    setObjet('Une commande de viande')
    const txt = 'Bonjour, je souhaite commander pour la prochaine vente :\n' + listText()
    setMessage((m) => (!m.trim() || m.startsWith('Bonjour, je souhaite commander') ? txt : m))
    setTimeout(() => {
      document.getElementById('commander')?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => document.getElementById('message')?.focus({ preventScroll: true }), 700)
    }, 50)
  }, [listText])

  const value = {
    list, add, remove, clear, count, listText, bump,
    sheetOpen, setSheetOpen, menuOpen, setMenuOpen,
    toastMsg, toast, tarifCat, setTarifCat,
    objet, setObjet, message, setMessage, attachToForm,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
