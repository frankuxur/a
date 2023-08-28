import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import logo from '../assets/logo/logo.png'
import axios from "axios"

const HostingHeader = () => {
  const [showNav, setShowNav] = useState(false) 
  const [showNotifs, setShowNotifs] = useState(false) 
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  
  
  const toggleNav = () => {
    setShowNotifs(false)
    setShowNav(!showNav)
  }
  
  const toggleNotifs = () => {
    setShowNav(false)
    setShowNotifs(!showNotifs)
  }

  const logout = async () => {
    await axios.post('/logout')
    setUser({})
    setShowNav(false)
    navigate('/')
  }

  return (
    <header className="hosting__header">
        <Link to='/hosting' className="hosting__header-logo">
            <img src={logo} alt="" />
        </Link>

        <ul className="hosting__options">
            <li>
                <Link to='/hosting/listings' >Listings</Link>
            </li>
            <li>
                <Link to='/become-a-host' >Create a new listing</Link>
            </li>
        </ul>

        <div>
            <div className="hosting__notifs">
                <button onClick={toggleNotifs} className='hosting__notifs-btn'>
                    <i className="iconoir-bell"></i>
                </button>

                {showNotifs && (
                    <div className='hosting__notifs-content'>
                        <h2>Notifications</h2>

                        <ul className="hosting__notifs-list">
                            <li className='hosting__notifs-list-item'></li>
                        </ul>
                    </div>
                )}
            </div>

            <nav className="hosting__nav">
                <button onClick={toggleNav} className="header__menu-btn">
                    <div className="nav__user-icon initial">
                        {user?.photo ? (
                            <img src={`http://localhost:8000/uploads/${user.photo}`} alt="" />
                        ) : user.fname && user.fname.charAt(0).toUpperCase()}
                    </div>
                </button>

                {showNav && (
                    <ul className="nav__items nav__user-items">
                        <div>
                            <li className="nav__item">
                                <Link to='/profile' onClick={() => setShowNav(false)}>Profile</Link>
                            </li>
                            <li className="nav__item">
                                <Link to='/account-settings'>Account</Link>
                            </li>
                        </div>
                        <div>
                            <li className="nav__item">
                                <Link to='/'>Switch to travelling</Link>
                            </li>
                            <li className="nav__item">
                                <button onClick={logout}>Log out</button>
                            </li>
                        </div>
                    </ul>
                )}
            </nav>
        </div>
    </header>
  )
}

export default HostingHeader