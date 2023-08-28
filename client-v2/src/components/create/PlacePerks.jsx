import '../../css/positions/place-perks.css'
import { perks as perksList } from '../../assets/perks'
import { useContext } from 'react';
import { PlaceContext } from '../../context/PlaceContext';

const PlacePerks = ({ setDisabled }) => {
  const { setPerks, perks } = useContext(PlaceContext)
    
  const basicPerks = perksList.filter((_, i) => i < 13)
  const standoutPerks = perksList.filter((_, i) => i > 12)
    
  const handleSelect = (selectedPerk) => {
    if (perks.includes(selectedPerk)) {
        const newPerks = perks.filter(perk => perk !== selectedPerk)
        setPerks(newPerks)
    } else {
        const newPerks = [...perks, selectedPerk]
        setPerks(newPerks)
    }
  }  

  // next button
  if (perks.length) {
    setDisabled(false)
  } else {
    setDisabled(true)
  }

  return (
      <main className="create__main place-perks">
        <h1 className="place-perks__title">Tell guests what your place has to offer</h1>
        <p className='place-perks__subtitle'>You can add more amenities after you publish your listing.</p>


        <ul className="place-perks__items">
            {basicPerks.map((perk, i) => (
                <li key={i} className={`place-perks__item ${perks.includes(perk.className) ? 'active' : ''}`}>
                    <button onClick={() => handleSelect(perk.className)}>
                        <div className='place-perks__icon'>
                            <i className={perk.className}></i>
                        </div>
                        <label>{perk.perkName}</label>
                    </button>
                </li>
            ))}
        </ul>


        <p className='place-perks__subtitle'>Do you have any standout amenities?</p>
        
        <ul className="place-perks__items">
            {standoutPerks.map((perk, i) => (
                <li key={i} className={`place-perks__item ${perks.includes(perk.className) ? 'active' : ''}`}>
                    <button onClick={() => handleSelect(perk.className)}>
                        <div className='place-perks__icon'>
                            <i className={perk.className}></i>
                        </div>
                        <label>{perk.perkName}</label>
                    </button>
                </li>
            ))}
        </ul>
        

    </main>
  )
}

export default PlacePerks





// import { Wifi, Tv, Clutery, WashingMachine, Car, 
//          Parking, AirConditioner, Desk, Lamp, 
//          Bbq, Swimming, Balcony, Bonfire, 
//          Gamepad, Gym, HotAirBalloon,
//          Flower, Fish, NoSmoking, Fishing, 
//          Golf, BeachBag, DirectorChair, FireFlame } from 'iconoir-react';