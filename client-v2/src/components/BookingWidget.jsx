import '../css/booking-widget.css'
import { useState } from "react"
import { differenceInCalendarDays, add } from 'date-fns'
import axios from 'axios'

const BookingWidget = ({ price, maxGuests, perks, userId, placeId, rating, ratingsCount }) => {
  const [checkIn, setCheckIn] = useState(new Date().toISOString().substr(0, 10))  
  const [checkOut, setCheckOut] = useState('')
  const [minDate, setMinDate] = useState(checkIn)
  const [showGuestsOptions, setShowGuestsOptions] = useState(false)
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  })
  const { adults, children, infants, pets } = guests
  const [disable, setDisable] = useState(false)
  const [disableReserveBtn, setDisableReserveBtn] = useState(false)


  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  const handleCheckin = (e) => {
    setCheckIn(e.target.value)
    const date = e.target.value.split('-')
    let min = add(new Date(+date[0], +date[1], +date[2]), { days: 1 })
    min = min.getFullYear() + `-${min.getMonth() < 10 ? '0' : ''}` + min.getMonth() + '-' + min.getDate()
    setMinDate(min);
  }


  const handleChange = (key, val) => {
    if (adults + children === maxGuests - 1) {
        setDisable(true)
    } else {
        setDisable(false)
    }

    switch (key) {
        case 'ADULTS': {
            setGuests(prev => ({
                ...prev,
                adults: prev.adults + val
            }))
            break
        }
        case 'CHILDREN': {
            setGuests(prev => ({
                ...prev,
                children: prev.children + val
            }))
            break
        }
        case 'INFANTS': {
            setGuests(prev => ({
                ...prev,
                infants: prev.infants + val
            }))
            break
        }
        case 'PETS': {
            setGuests(prev => ({
                ...prev,
                pets: prev.pets + val
            }))
            break
        }

        default: {
            setGuests(guests)
            break
        }
    }
  }

  const reserve = () => {
    setDisableReserveBtn(true)
    const bookingData = {
        user: userId,
        place: placeId,
        guests,
        bookedOn: new Date().toISOString(),
        checkIn,
        checkOut,
        price: +price,
        nights: numberOfNights,
        serviceFee: (+price * numberOfNights) * 2 / 100,
    }
    console.log(bookingData);
    axios.post('/book', bookingData).then(response => {
        if(response.data.url) {
            window.location.assign(response.data.url); // Forwarding user to Stripe
        }
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <div className="booking-widget">
        <header>
            <p>₹{price}<span>/night</span></p>

            {!!ratingsCount && (
                    <ul className='booking-widget__review'>
                        <li>
                            <i className="ri-star-s-fill"></i>
                            <span>{(rating + '').length > 3 ? rating.toFixed(2) : rating}</span>
                        </li>
                        <li>·</li>
                        <li><u>{`${ratingsCount > 1 ? ratingsCount + ' reviews' : ratingsCount + ' review'}`}</u></li>
                    </ul>
            )}
        </header>

        <div className="booking-widget__info">
            <div className="booking-widget__dates">
                <button className="booking-widget__checkin">
                    <label>CHECK-IN</label>
                    <input 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                        value={checkIn} 
                        onChange={handleCheckin} 
                    />
                </button>
                <button className="booking-widget__checkout">
                    <label>CHECK-OUT</label>
                    <input 
                        type="date" 
                        min={minDate}
                        value={checkOut} 
                        onChange={(e) => setCheckOut(e.target.value)} 
                    />
                </button>
            </div>
            
            <div className="booking-widget__guests-box">
                <button onClick={() => setShowGuestsOptions(prev => !prev)} className="booking-widget__guests">
                    <label>GUESTS</label>
                    <p>{
                        `
                            ${adults + children} ${adults + children === 1 ? 'guest' : 'guests'}${pets > 0 ? ', ' + pets : ''} ${pets === 1 ? 'pet' : ''}${pets > 1 ? 'pets' : ''}${infants > 0 ? ', ' + infants : ''} ${infants === 1 ? 'infant' : ''} ${infants > 1 ? 'infants' : ''}
                            
                        `
                       }
                    </p>
                    <i className={`${showGuestsOptions ? 'iconoir-nav-arrow-up' : 'iconoir-nav-arrow-down'}`}></i>
                </button>

                {/* drop down */}
                {showGuestsOptions && (
                    <ul className="booking-widget__guests-options">
                        <li>
                            <div>
                                <p>Adults</p>
                                <p>Age 13+</p>
                            </div>

                            <div>
                                <button disabled={adults === 1 && true} onClick={() => handleChange('ADULTS', -1)}>
                                    <i className="ri-subtract-line"></i>
                                </button>

                                <span>{adults}</span>

                                <button disabled={disable} onClick={() => handleChange('ADULTS', 1)}>
                                    <i className="ri-add-line"></i>
                                </button>
                            </div>
                        </li>
                        
                        <li>
                            <div>
                                <p>Children</p>
                                <p>Age 2-12</p>
                            </div>

                            <div>
                                <button disabled={children < 1 && true} onClick={() => handleChange('CHILDREN', -1)}>
                                    <i className="ri-subtract-line"></i>
                                </button>

                                <span>{children}</span>

                                <button disabled={disable} onClick={() => handleChange('CHILDREN', 1)}>
                                    <i className="ri-add-line"></i>
                                </button>
                            </div>
                        </li>
                        
                        <li>
                            <div>
                                <p>Infants</p>
                                <p>Under 2</p>
                            </div>

                            <div>
                                <button disabled={infants < 1 && true} onClick={() => handleChange('INFANTS', -1)}>
                                    <i className="ri-subtract-line"></i>
                                </button>

                                <span>{infants}</span>

                                <button disabled={infants === 5 && true} onClick={() => handleChange('INFANTS', 1)}>
                                    <i className="ri-add-line"></i>
                                </button>
                            </div>
                        </li>
                        
                        <li>
                            <div>
                                <p>Pets</p>
                            </div>

                            <div>
                                <button disabled={(pets < 1 || !perks.includes('iconoir-fish')) && true} onClick={() => handleChange('PETS', -1)}>
                                    <i className="ri-subtract-line"></i>
                                </button>

                                <span>{pets}</span>

                                <button disabled={(pets === 5 || !perks.includes('iconoir-fish')) && true} onClick={() => handleChange('PETS', 1)}>
                                    <i className="ri-add-line"></i>
                                </button>
                            </div>
                        </li>

                        <p>This place has a maximum of {maxGuests} guests, not including infants. {!perks.includes('iconoir-fish') && `Pets aren't allowed.`}</p>

                        <button onClick={() => setShowGuestsOptions(false)}><u>close</u></button>
                    </ul>
                )}
            </div>
        </div>

        <button onClick={reserve} disabled={numberOfNights < 1 || disableReserveBtn && true} className="booking-widget__reserve">Reserve</button>

        {/* You won't be charged yet */}

        {numberOfNights > 0  && (
            <div className="booking-widget__fees">
                    <div>
                        <p>₹{price} × {numberOfNights} {`${numberOfNights > 1 ? 'nights' : 'night'}`}</p>
                        <p>₹{+price * numberOfNights}</p>
                    </div>
                <div>
                    <p>Airbnb service fee</p>
                    <p>₹{(+price * numberOfNights) * 2 / 100}</p>
                </div>
                <div>
                    <p>Total before taxes</p>
                    <p>₹{+price * numberOfNights + ((+price * numberOfNights) * 2 / 100)}</p>
                </div>
            </div>
        )}

    </div>
  )
}

export default BookingWidget


// ${infants > 0 ? ', ' + infants : ''} ${infants === 1 ? 'infant' : ''} ${infants > 1 ? 'infants' : ''}