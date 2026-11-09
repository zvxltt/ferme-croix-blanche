// Recopie la version compilée (dist/) à la racine du dépôt,
// pour que GitHub Pages (ou n'importe quel hébergeur) serve directement le site.
import { cpSync, existsSync, rmSync, readdirSync, writeFileSync } from 'node:fs'

if (!existsSync('dist/index.html')) {
  console.error('dist/ est vide : lancez d\'abord "npm run build".')
  process.exit(1)
}
rmSync('assets', { recursive: true, force: true })
for (const f of readdirSync('dist')) cpSync(`dist/${f}`, f, { recursive: true })
writeFileSync('.nojekyll', '')
console.log('Site compilé recopié à la racine.')
