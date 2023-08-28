import axios from "axios"
import { useEffect, useState } from "react"

const Trip = ({ booking, getDate, handleFeedbackBtn }) => {
  const [place, setPlace] = useState({})
  const [trip, setTrip] = useState({})  

  useEffect(() => {
    axios.get(`/places/${booking.place}`).then(response => {
        setPlace(response.data)
    }).catch(err => {
        console.log(err)
    })
  }, [])

  useEffect(() => {
    if (!!place && !!booking) {
        const { title, stats, photos, address } = place
        const doc = {
            ...booking,
            title, stats, photos, address
        }
        setTrip(doc)
    }
  }, [place])


  if (!!trip.photos && !!trip.stats) {
    
    return (
        <li className='trips__item'>
            <div className="trips__destination"> 
                <img className='trips__img' src={`http://localhost:8000/uploads/${trip.photos[0]}`} alt="" />
                <div className="trips__name">{trip.title}</div>
            </div>
            <div className="trips__price">₹ {trip.price * trip.nights + trip.serviceFee}</div>
            <ul className="trips__stats">
                <li>{trip.stats.bedrooms}</li>
                <li>{trip.stats.beds}</li>
                <li>{trip.stats.bathrooms}</li>
            </ul>
            <div className="trips__booked-on">{`${getDate(trip.bookedOn)} ${new Date(trip.bookedOn).getFullYear()}`}</div>
            <div className="trips__stay">{`${getDate(trip.checkIn)} - ${getDate(trip.checkOut)} ${new Date(trip.checkOut).getFullYear()}`}</div>
            <div>
              <button onClick={() => handleFeedbackBtn(trip)} className="trips__feedback">
                <i className="ri-edit-line"></i>
              </button>
            </div>
        </li>
    )
  }   
}

export default Trip