import '../css/register.css'
import { useContext, useState } from 'react';
import { useLocation, Navigate, useNavigate } from "react-router-dom"
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import ConfirmModal from '../components/ConfirmModal';

const Register = () => {
  const { clearUserState, setUser, user, handleWelcomeState } = useContext(UserContext)
  let { state: userInfo } = useLocation()
  const navigate = useNavigate()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [userData, setUserData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const phoneNum = +phone
    setUserData({
      ...userInfo,
      fname,
      lname,
      dob,
      phone: phoneNum,
      accountType: ['traveller'],
    })
    setShowConfirmModal(true)
  }

  const confirmSubmit = async () => {
    const userDoc = await axios.post('/register', userData)
    console.log(userDoc);
    setUser(userDoc.data)
    console.log(user);
    handleWelcomeState(true)
    navigate('/', { state: { welcome: true }})
  }

  if (!userInfo) {
    return <Navigate to='/' />
  }

  return (
    <div className="register">
      <header className='register__header'>
        <button onClick={() => {
            clearUserState()
            navigate('/')}
        }>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        Finish signing up
      </header>

      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__name">
          <input type="text" placeholder="First name" value={fname} onChange={(e) => setFname(e.target.value)} />
          <input type="text" placeholder="Last name" value={lname} onChange={(e) => setLname(e.target.value)} />
          <label>Make sure it matches the name on your government IO.</label>
        </div>  

        <div className="register__dob">
          <input type="date" placeholder='Date of birth' value={dob} onChange={(e) => setDob(e.target.value)} />
          <label>To sign up, you need to be at least 18. Your birthday won't be shared with other people who
          use Airbnb.</label>
        </div>

        <div className="register__phone">
          <input type="text" placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label>We'll email & sms you trip confirmations and receipts.</label>
        </div>

        <p className='register__policy'>
          By selecting <b>Agree and continue</b>, I agree to Airbnb's <span>Terms Of Service EAY-m.É.n.ti-IÉL.m.i-.Q.f
          Service</span> and <span>Nondiscrimination Policy</span> and acknowledge the <span>Privacy Policy.</span>
        </p>

        <button className='register__button'>Agree and continue</button>
      </form>

      <footer className="register__footer">
        <p>Airbnb will send you members-ony deals, inspiration, marketing emails, and push
        notifications. You can opt out of receiving these at any time in your account settings or
        directly from the marketing notification.</p>

        <p>
          <input type="checkbox" />
          I don't want to receive marketing messages from Airbnb
        </p>
      </footer>

      {showConfirmModal && (
        <ConfirmModal 
          setShowConfirmModal={setShowConfirmModal} 
          confirmSubmit={confirmSubmit}
        />
      )}
    </div>
  )
}

export default Register