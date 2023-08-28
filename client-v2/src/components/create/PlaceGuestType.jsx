import '../../css/positions/place-guest-type.css'
import { useContext } from 'react'
import { PlaceContext } from '../../context/PlaceContext'

const PlaceGuestType = ({ setDisabled }) => {
  const { setGuestType, guestType } = useContext(PlaceContext)
  
  // next button
  if (guestType) {
    setDisabled(false)
  } else {
      setDisabled(true)
  }   

  return (
    <main className="create__main place-guest-type">
        <h1 className="place-guest-type__title">Choose who to welcome for your first reservation</h1>
        <p className='place-guest-type__subtitle'>After your first guest anyone can book your place. <span>Learn more</span></p>

        <div className="place-guest-type__types">
            <button onClick={() => setGuestType('regular')} className={`place-guest-type__type ${guestType === 'regular' ? 'active' : ''}`}>
                {guestType === 'regular' ? <i className="ri-radio-button-fill"></i> : <i className="iconoir-circle"></i>}
                
                <div>
                    <h2>An Airbnb guest</h2>
                    <p>Get reservations faster when you welcome anyone from the Airbnb community'.</p>
                </div>
            </button>
            
            <button onClick={() => setGuestType('experienced')} className={`place-guest-type__type ${guestType === 'experienced' ? 'active' : ''}`}>
                {guestType === 'experienced' ? <i className="ri-radio-button-fill"></i> : <i className="iconoir-circle"></i>}          

                <div>
                    <h2>An experienced</h2>
                    <p>For your first guest, welcome someone with a good track record on Airbnb who can
                    offer tips for how to be a great Host.</p>
                </div>
            </button>
        </div>
    </main>
  )
}

export default PlaceGuestType