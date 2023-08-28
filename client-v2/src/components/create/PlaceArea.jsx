import '../../css/positions/place-area.css'
import { useContext } from 'react'
import { PlaceContext } from '../../context/PlaceContext'

const PlaceArea = ({ setDisabled }) => {
  const { setArea, area } = useContext(PlaceContext)  

  if (area) {
    setDisabled(false)
  }

  return (
    <main className="create__main place-area">
        <h1 className="place-area__title">What type of place will guests have?</h1>

        <ul className="place-area__items">
            <li className={`place-area__item ${area === 'house' && 'active'}`}>
                <button onClick={() => setArea('house')}>
                    <div>
                        <h3>An entire place</h3>
                        <p>Guests have the whole place to themselves.</p>
                    </div>

                    <i className="ri-home-2-line"></i>
                </button>
            </li>

            <li className={`place-area__item ${area === 'room' && 'active'}`}>
                <button onClick={() => setArea('room')}>
                    <div>
                        <h3>A room</h3>
                        <p>Guests have their own room in a home, plus access to shared
                        spaces.</p>
                    </div>

                    <i className="ri-door-open-line"></i>
                </button>
            </li>

            <li className={`place-area__item ${area === 'shared' && 'active'}`}>
                <button onClick={() => setArea('shared')}>
                    <div>
                        <h3>A shared room</h3>
                        <p>Guests sleep in a room or common area that may be shared
                        with you or others.</p>
                    </div>

                    <i className="ri-group-line"></i>
                </button>
            </li>
        </ul>
        
    </main>
  )
}

export default PlaceArea