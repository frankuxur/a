import { useContext, useState } from 'react'
import logo from '../assets/logo/long-logo.png'
import '../css/navbar.css'
import AccessModal from './AccessModal'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const [showNav, setShowNav] = useState(false)  
  const [showAccessModal, setShowAccessModal] = useState(false)  
  const { registerUser, user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

//   console.log(user);
  const toggleShowAccessModal = () => {
    setShowAccessModal(!showAccessModal)
    if (showNav) {
        setShowNav(false)
    }
  }

  const handleSubmit = async (e, userInfo) => {
    e.preventDefault()
    // console.log(userInfo);
    registerUser(userInfo)
    try {
        // if user already exists, then log in
        const { data } = await axios.post('/login', userInfo)
        setShowAccessModal(false)
        if (!data) {
            navigate('/register', { state: userInfo })
        } else {
            setUser(data)
            navigate('/')
        }
    } catch (error) {
        console.log(error);
        alert('Registration failed. Please try again later')
    }
  }  

  const logout = async () => {
    await axios.post('/logout')
    setUser({})
    setShowNav(false)
    navigate('/')
  }

  return (
    <header className="header">
        <a href='/' className="header__logo">
            <img src={logo} alt="" />
        </a>

        <nav className="nav">
            {!!user && user.accountType && user.accountType.length === 2 ? (
                <Link to='/hosting'>Switch to hosting</Link>
            ) : user.fname ? (
                <Link to='/host'>Airbnb your home</Link>
            ) : (
                <Link to='/' onClick={toggleShowAccessModal}>Airbnb your home</Link>
            )
        
            }

            <button className='nav__language'>
                <i className="ri-global-line"></i>
            </button>

            <button onClick={() => setShowNav(!showNav)} className="header__menu-btn">
                <i className="ri-menu-line"></i>
                
                {user.fname ? (
                    <div className="nav__user-icon initial">
                        {user.photo ? (
                            <img src={`http://localhost:8000/uploads/${user.photo}`} alt="" />
                        ) : user.fname.charAt(0).toUpperCase() || 'X'}
                        {/* {user.fname.charAt(0).toUpperCase()} */}
                    </div>
                ) : (
                    <div className="nav__user-icon">
                        <i className="ri-user-fill"></i>
                    </div>
                )}
            </button>

            

            {showNav && 
                (!!user && user.fname ? (
                    <ul className="nav__items nav__user-items">
                        <div>
                            <li className="nav__item">
                                <Link to='' style={{pointerEvents: 'none'}}>Messages</Link>
                            </li>
                            <li className="nav__item">
                                <Link to='' style={{pointerEvents: 'none'}}>Notifications</Link>
                            </li>
                            <li className="nav__item">
                                <Link to='/trips' onClick={() => setShowNav(false)}>Trips</Link>
                            </li>
                            <li className="nav__item">
                                <Link to='' style={{pointerEvents: 'none'}}>Wishlists</Link>
                            </li>
                        </div>
                        <div>
                            <li className="nav__item">
                                {!!user && user.accountType && user.accountType.length === 2 ? (
                                    <Link to='/hosting'>Manage listings</Link> 
                                ) : (
                                    <Link to='/host'>Airbnb your home</Link>
                                )}
                            </li>
                            <li className="nav__item">
                                <Link to='/account-settings' onClick={() => setShowNav(false)}>Account</Link>
                            </li>
                        </div>
                        <div>
                            <li className="nav__item">
                                <Link to='' style={{pointerEvents: 'none'}}>Help Centre</Link>
                            </li>
                            <li className="nav__item">
                                <button onClick={logout}>Log out</button>
                            </li>
                        </div>
                    </ul>
                ) : (
                    <ul className="nav__items">
                        <div>
                            <li className="nav__item">
                                <button onClick={toggleShowAccessModal}>Log in</button>
                            </li>
                            <li className="nav__item">
                                <button onClick={toggleShowAccessModal}>Sign up</button>
                            </li>
                        </div>
                        <div>
                            <li className="nav__item">
                                <Link onClick={toggleShowAccessModal}>Airbnb your home</Link>
                            </li>
                            <li className="nav__item">
                                <Link style={{pointerEvents: 'none'}}>help</Link>
                            </li>
                        </div>
                    </ul>
                ))}               
            
        </nav>

        {showAccessModal && (
            <AccessModal 
                toggleShowAccessModal={toggleShowAccessModal} 
                handleSubmit={handleSubmit}    
            />
        )}
    </header>
  )
}

export default Navbar