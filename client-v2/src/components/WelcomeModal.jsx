import '../css/welcome-modal.css'
import logo from '../assets/logo/logo.png'

const WelcomeModal = ({ handleWelcomeState }) => {
  return (
    <div className="welcome">
        <div className="welcome__content">
            <header className='welcome__header'>
                <button onClick={() => handleWelcomeState(false)}>
                    <i className="ri-close-line"></i>
                </button>
                Create your profile
            </header>

            <div className="welcome__body">
                <img src={logo} alt="" />
                <h2>Welcome to Airbnb</h2>
                <p>Discover places to stay and unique experiences around the
                world.</p>
                <button onClick={() => handleWelcomeState(false)}>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default WelcomeModal