import { SiteProvider } from './store'
import useScrollFx from './hooks/useScrollFx'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import { Marquee, Ferme, Heritage, Pension, Engagements } from './components/Sections'
import Ventes, { Viandes } from './components/Ventes'
import Contact from './components/Contact'
import { AppBar, Footer, OrderSheet, Toast } from './components/Chrome'

function Page() {
  useScrollFx()
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Loader />
      <Header />
      <main id="accueil">
        <Hero />
        <Marquee />
        <Ferme />
        <Heritage />
        <Viandes />
        <Ventes />
        <Pension />
        <Engagements />
        <Contact />
      </main>
      <Footer />
      <AppBar />
      <Toast />
      <OrderSheet />
    </>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <Page />
    </SiteProvider>
  )
}
