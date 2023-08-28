import '../css/payment-successful.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { hostType } from '../assets/hostType'
import { perks as perksList } from '../assets/perks'

const PaymentSuccessful = () => {
  const { id } = useParams()
  const [booking, setBooking] = useState({})
  const [place, setPlace] = useState({})
  const naviagte = useNavigate()

  
  useEffect(() => {
    if (id) {
        axios.get(`/book/${id}`).then(response => {
            setBooking(response.data)
            // console.log(response.data)
        }).catch(err => console.log(err))
    } 
  }, [])

  useEffect(() => {
    if (booking._id) {
        axios.get(`/places/${booking.place}`).then(response => {
            setPlace(response.data)
            // console.log(response.data);
        }).catch(err => console.log(err))
    }
  }, [booking])

  const type = !!place && hostType.filter(ht => ht.value === place.type)
  const { stats, perks, photos } = !!place && place
  const { price, serviceFee, checkIn, checkOut, nights } = !!booking && booking

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const cIn = new Date(checkIn).getDate() + ' ' + months[new Date(checkIn).getMonth()]
  const cOut = new Date(checkOut).getDate() + ' ' + months[new Date(checkOut).getMonth()]
  
  return (
    <div className='success'>
        {/* booking summary */}
        <div className='success__left'>
            <h1 className="success__title">Booking summary</h1>
            <p>Thanks for choosing us <i className="iconoir-heart"></i></p>
        {/* // view bookings
        // cancel booking
        // home */}
        </div>
        
        {!!place.type && !!booking && (

            <div className="booking-summary">            
                <header className="booking-summary__header">
                    <div>
                        <h2>{type[0].label}</h2>

                        <ul>
                            <li>
                                <i className="iconoir-group"></i>
                                <span>Price for {stats.guests} guests</span>
                            </li>
                            <li>
                                <i className="iconoir-bed"></i>
                                <span>{stats.beds > 1 ? `${stats.beds} beds` : `${stats.beds} bed`} & {stats.bedrooms > 1 ? `${stats.bedrooms} bedrooms` : `${stats.bedrooms} bedroom`}</span>
                            </li>
                            <li>
                                <i className="iconoir-bathroom"></i>
                                <span>{stats.bathrooms > 1 ? `${stats.bathrooms} bathrooms` : `${stats.bathrooms} bathroom`}</span>
                            </li>
                        </ul>
                    </div>

                    <img className="booking-summary__image" src={`http://localhost:8000/uploads/${photos[0]}`} alt="" />
                </header>

                <ul className="booking-summary__amenities">
                    {[...Array(5)].map((_, i) => i < 4 && perksList.map(p => p.className === perks[i] && (
                        <li key={p.className}>
                            <i className={p.className}></i>
                            <span>{p.perkName}</span>
                        </li>
                    )))}
                </ul>

                <div className="booking-summary__details">
                    <p><i className="iconoir-check-circle"></i> Booked for {nights} {nights > 1 ? 'nights' : 'night'} ({cIn} - {cOut})</p>
                    <h2>INR {price * nights + serviceFee}</h2>
                    {/* free cancelation until Mar 28 */}
                </div>

                <button onClick={() => naviagte('/trips')} className='booking-summary__button'>View your bookings</button>
            </div>
        )}
    </div>

  )
}

export default PaymentSuccessful