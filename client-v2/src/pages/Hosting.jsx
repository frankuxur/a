import '../css/hosting.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import HostingHeader from '../components/HostingHeader'
import Footer from '../components/Footer'
import Reservations from '../components/Reservations'

const Hosting = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="hosting">
        <HostingHeader />

        <main className="hosting__main">
            <header>
                <h1>Welcome back, {user.fname}</h1>

                <Link to='/become-a-host'>Complete your listings</Link>
            </header>
        </main>

        <Reservations />
        
        <Footer page={'hosting'} />
    </div>
  )
}

export default Hosting