import { SiteProvider } from './store'
import { Header, Hero, Visit, Viandes, Tarifs, Manifeste, Ferme, Pension, Commande, Close, FooterVisit, usePlaceFx } from './components/Place'
import { AppBar, OrderSheet, Toast } from './components/Chrome'

function Page() {
  usePlaceFx()
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <Visit />
        <Viandes />
        <Tarifs />
        <Manifeste />
        <Ferme />
        <Pension />
        <Commande />
        <Close />
      </main>
      <FooterVisit />
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
