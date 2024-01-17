import Masthead from './components/Masthead'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import ContactFooter from './components/ContactFooter'



export default function Home() {
  return (
    <main >
      <TopBar />
      <Navbar />
      <Masthead />
      <div className='h-screen bg-black'>

      </div>
      <ContactFooter />
      <Footer />
    </main>
  )
}
