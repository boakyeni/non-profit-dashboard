import Image from 'next/image'
import Masthead from './components/Masthead'
import Charts from './components/Charts'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'



export default function Home() {
  return (
    <main >
      <TopBar />
      <Navbar />
      <Masthead />
      <div className='h-screen bg-black'>

      </div>
    </main>
  )
}
