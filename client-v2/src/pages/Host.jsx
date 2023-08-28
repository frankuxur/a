import '../css/new-host.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo/logo.png'
// import people1 from '../assets/photos/people-1.webp'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Host = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
    
  const handleClick = async () => {
    const { data } = await axios.put('user-account-type', { accountType: ['traveller', 'host'] })
    setUser(data)
    navigate('/become-a-host')
  }

  return (
    <div className="new-host">
        <header className="new-host__header">
            <Link to='/' className="new-host__header-logo">
                <img src={logo} alt="" />
            </Link>

            <div>
                <p>Ready to Airbnb it?</p>

                <button onClick={handleClick}>
                    <div className="new-host__header-icon">
                        <i className="ri-home-2-line"></i>
                        <i className="ri-add-line"></i>
                    </div>
                    Airbnb Setup
                </button>
            </div>
        </header>

        <section className="new-host__section-1">
            <h2>Airbnb it easily with Airbnb Setup</h2>
            <img src={people1} alt="" />

            <div className='new-host__support'>
                <article>
                    <h3>One-to-one guidance from a Superhost</h3>
                    <p>We'll match YOU with a Superhost in your area,
                    who'll guide YOU from your first question to your
                    first guest — by phone, video call or chat.</p>
                </article>
                <article>
                    <h3>An experienced guest for your first booking</h3>
                    <p>For your first booking, you can choose to welcome
                    an experienced guest who has at least three stays
                    and a good track record on Airbnb.</p>
                </article>
                <article>
                    <h3>Specialised support from Airbnb</h3>
                    <p>New Hosts get one-tap access to specially trained
                    Community Support agents who can help with
                    everything from account issues to billing support.</p>
                </article>
            </div>
        </section>
    </div>
  )
}

export default Host