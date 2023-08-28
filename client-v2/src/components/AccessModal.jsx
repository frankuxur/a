import { useState } from 'react'
import '../css/access-modal.css'

const AccessModal = ({ toggleShowAccessModal, handleSubmit }) => {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')  

  return (
    <div className="access">
        <div className="access__content">
            <header className='access__header'>
                <button onClick={toggleShowAccessModal}>
                    <i className="ri-close-line"></i>
                </button>
                Log in or sign up
            </header>

            <form className="access__form" onSubmit={(e) => handleSubmit(e, {email, password})}>
                <h2 className='access__title'>Welcome to Airbnb</h2>

                <div className='access__inputs'>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className='access__button'>Continue</button>
            </form>
        </div>
    </div>
  )
}

export default AccessModal