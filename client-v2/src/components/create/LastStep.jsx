import '../../css/positions/last-step.css'
import { PlaceContext } from '../../context/PlaceContext'
import { useContext, useState } from 'react'

const LastStep = () => {
  const { setLastStep, lastStep } = useContext(PlaceContext)
  const [showModal, setShowMoadl] = useState(false)

  const data = [
    {
       title: 'Security camera(s)',
       code: 'cameras'
    },
    {
       title: 'Weapons',
       code: 'weapons'
    },
    {
       title: 'dangerous animals',
       code: 'animals'
    },
  ]

  const handleChange = (code) => {
    console.log(code);
    if (lastStep.includes(code)) {
        setLastStep([...lastStep.filter(c => c !== code)])
    } else {
        setLastStep([...lastStep, code])
    }
  }
  

  return (
    <main className="create__main last-step">
      <h1 className="last-step__title">Just one last step!</h1>
      <p className='last-step__subtitle'>
        Does your place have any of these?
        <button onClick={() => setShowMoadl(true)} className='last-step__info'>
          <p>
            i
          </p>
        </button>
      </p>

      <ul className="last-step__items">
        {data.map(({title, code}) => (
          <li key={code} className='last-step__item'>
            <label htmlFor={code}>{title}</label>
            <input onChange={() => handleChange(code)} checked={lastStep.includes(code) ? true : false} className='last-step__checkbox' type="checkbox" id={code} />
          </li>
        ))}
      </ul>

      <div className="last-step__important">
        <h3>Important things to know</h3>
        <p>Be sure to comply with your <span>local laws</span> and review Airbnb's <span>nondiscrimination policy</span> and <span>guest and Host fees</span>.</p>
      </div>

      {showModal && (
          <div className="last-step__modal">
            <div className="last-step__modal-content">
              <button onClick={() => setShowMoadl(false)}>
                  <i className="ri-close-line"></i>
              </button>

              <div className="last-step__modal-body">
                <div>
                  <h4>Security camera(s)</h4>
                  <p>Hosts are required to disclose all security cameras and other recording devices in their listings. Intentionally concealed recording devices, or devices that observe the interior of bedrooms and bathrooms, are prohibited. <span>Learn more</span></p>
                </div>
                <div>
                  <h4>Weapons</h4>
                  <p>All weapons at a listing must be properly disclosed, stored and secured. <span>Learn more</span></p>
                </div>
                <div>
                  <h4>Dangerous animals</h4>
                  <p>Hosts should not keep a potentially dangerous animal (one that’s capable of causing serious harm to humans or other animals) in a listing without properly disclosing its presence and securing it in a safe and secure accommodation. <span>Learn more</span></p>
                </div>
              </div> 

              <footer className="last-step__modal-footer">
                <button onClick={() => setShowMoadl(false)}>Done</button>  
              </footer>         
            </div>
          </div>
      )}

    </main>
  )
}

export default LastStep