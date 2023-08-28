import '../../css/positions/place-address.css'
import { useContext, useState } from 'react'
import { PlaceContext } from '../../context/PlaceContext'
import countries from '../../assets/countries.json'

const PlaceAddress = ({ setDisabled }) => {
   const { setAddress, address } = useContext(PlaceContext)
   const { country, house, area, street, landmark, city, pin, state } = address   
        
    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    };

   const countryList = countries.map(c => c.country)


    // next button
   for (let key in address) {
    if (address[key] === '') {
        setDisabled(true)
        break
    } else {
        setDisabled(false)
    }
   } 

  return (
    <main className="create__main place-address">
        <h1 className="place-address__title">Where's your place located?</h1>
        <p className='place-address__subtitle'>Your address is only shared with guests after they’ve made a reservation.</p>
    
        <section className="place-address__form">
            <div className="place-address__input-grp">
                <select name="country" value={country} onChange={(e) => handleChange(e)} className='place-address__input'>
                    <option defaultValue={''} hidden>Pick a country</option>
                    {countryList.map((country, i) => (
                        <option key={i} value={country}>{country}</option>
                        ))}    
                </select>               
                <label className="place-address__input-label">Country/Region</label>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            
            <div className="place-address__details">
                <div className="place-address__input-grp">
                    <input name='house' value={house} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">House, flat, bldg, etc.</label>
                </div>
                <div className="place-address__input-grp">
                    <input name='area' value={area} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">Area/village (if applicable)</label>
                </div>
                <div className="place-address__input-grp">
                    <input name='street' value={street} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">Street address</label>
                </div>
                <div className="place-address__input-grp">
                    <input name='landmark' value={landmark} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">Nearby landmark (if applicable)</label>
                </div>
                <div className="place-address__input-grp">
                    <input name='city' value={city} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">City / town</label>
                </div>
                <div className="place-address__input-grp">
                    <input name='pin' value={pin} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">PIN code</label>
                </div>
                <div className="place-address__input-grp">
                    <input name='state' value={state} onChange={(e) => handleChange(e)}  type="text" placeholder=' ' className="place-address__input" />
                    <label className="place-address__input-label">State / province</label>
                </div>
            </div>
        </section>
    </main>
  )
}

export default PlaceAddress