import '../../css/positions/congratulations.css'
import ceoSignature from '../../assets/photos/ceo-signature.jpg'
import ceo from '../../assets/photos/ceo.png'
import logo from '../../assets/logo/black-logo.png'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Congratulations = () => {
  const navigate = useNavigate()
  const { user: { fname } } = useContext(UserContext)

  return (
    <main className="congratulations">
      <img src={ceo} alt="" className="congratulations__img" />

      <div className="congratulations__body">
        <h1>Congratulations, {fname}!</h1>
        <p>From one Host to another – welcome aboard. Thank you for sharing your home and helping to create incredible experiences for our guests.</p>
        <div className="congratulations__signature">
          <img src={ceoSignature} alt="" />
          <p>Brian Chesky, CEO</p>
        </div>

        <footer className="congratulations__footer">
          <button onClick={() => navigate('/hosting')} className="congratulations__btn">Let's get started</button>
        </footer>
      </div>

      <img src={logo} alt="" className="congratulations__logo" />
    </main>
  )
}

export default Congratulations