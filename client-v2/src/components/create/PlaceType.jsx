import '../../css/positions/place-type.css'
import { hostType } from '../../assets/hostType'
import { useContext, useState } from 'react'
import { PlaceContext } from '../../context/PlaceContext'

const PlaceType = ({ setDisabled }) => {
  const { setType, type } = useContext(PlaceContext)  

  if (type) {
    setDisabled(false)
  }

  return (
    <main className="create__main place-type">
        <h1 className="place-type__title">Which of these best describes your place?</h1>
    
        <ul className="place-type__items">
            {hostType.map((host, i) => (
                <li key={i} className={`place-type__item ${host.value === type && 'active'}`}>
                    <button onClick={() => setType(host.value)}>
                        <img src={host.imgSrc} alt="" />
                        <label>{host.label}</label>
                    </button>
                </li>
            ))}   
        </ul>
    </main>
  )
}

export default PlaceType