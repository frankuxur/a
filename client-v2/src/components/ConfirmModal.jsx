import '../css/confirm-modal.css'
import logo from '../assets/logo/logo.png'

const ConfirmModal = ({ setShowConfirmModal,  confirmSubmit }) => {
  return (
    <div className="confirm">
        <div className="confirm__content">
            <img src={logo} alt="" />
            
            <p>Our community commitment</p>

            <h2 className='confirm__title'>Airbnb is a community where anyone can
            belong</h2>

            <p>To ensure this, we're asking you to commit to the following:</p>

            <p>I agree to treat everyone in the Airbnb community — regardless of their
            religion, national origin, ethnicity, skin colour, disability, sex,
            gender identity, sexual orientation or age - with respect, and without
            judgement or bias.</p>

            <a href=""><span>Learn more</span> <i className="ri-arrow-right-s-line"></i></a>
        
            <div className="confirm__buttons">
                <button onClick={confirmSubmit}>Agree and continue</button>
                <button onClick={() => setShowConfirmModal(false)}>Decline</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal