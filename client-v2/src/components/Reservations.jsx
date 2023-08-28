import '../css/reservations.css'
import axios from "axios"
import { Link } from "react-router-dom"
import { differenceInCalendarDays, isPast, isFuture } from 'date-fns'
import { useEffect, useState } from "react"
import ReservedGuest from './ReservedGuest'

const Reservations = () => {
  const [reservations, setReservations] = useState([])  
  // all 4 reservations
  const [reservationsCounts, setReservationsCounts] = useState({
    checkingOut: 0,
    currentlyHosting: 0,
    arrivingSoon: 0,
    upcoming: 0,
  })
//   const [checkingOutReservations, setCheckingOutReservations] = useState([]) 
//   const [currentlyHostingReservations, setCurrentlyHostingReservations] = useState([]) 
//   const [arrivingSoonReservations, setArrivingSoonReservations] = useState([]) 
//   const [upcomingReservations, setUpcomingReservations] = useState([]) 
        
  const [reservationType, setReservationType] = useState('')
  const [selectedReservations, setSelectedReservations] = useState([])
  const [message, setMessage] = useState('')

  useState(() => {
    axios.get('/bookingsByHost').then(response => {
        setReservations(response.data)
    })
  }, [])

  useEffect(() => {
      currentlyHosting()
      arrivingSoon()
      upcoming()
      checkingOut()
    // handleButton('CHECKING_OUT')
  }, [reservations])
  
  const handleButton = (type) => {
    switch (type) {
        case 'CHECKING_OUT': {
            checkingOut()
            break
        }
        case 'CURRENTLY_HOSTING': {
            currentlyHosting()
            break
        }
        case 'ARRIVING_SOON': {
            arrivingSoon()
            break
        }
        case 'UPCOMING': {
            upcoming()
            break
        }
    }
  }  

  // 1
  const checkingOut = () => {
    const bookings = reservations.filter(reservation => {
        const difference = differenceInCalendarDays(new Date(reservation.checkOut), new Date())
        if (difference === 0 || difference === 1) {
            return reservation
        }
    })

    setReservationsCounts(prev => ({
        ...prev,
        checkingOut: bookings.length
    }))
    setReservationType('CHECKING_OUT')
    setSelectedReservations(bookings)
    setMessage('You don’t have any guests checking out today or tomorrow.')
  }

  // 2
  const currentlyHosting = () => {
    const bookings = reservations.filter(reservation => {
        const difference1 = differenceInCalendarDays(new Date(reservation.checkOut), new Date())
        const difference2 = differenceInCalendarDays(new Date(), new Date(reservation.checkIn))
        if (difference1 >= 0 && difference2 >= 0) {
            return reservation
        }
    })
    
    setReservationsCounts(prev => ({
        ...prev,
        currentlyHosting: bookings.length
    }))
    setReservationType('CURRENTLY_HOSTING')
    setSelectedReservations(bookings)
    setMessage('You don’t have any guests staying with you right now.')
  }

  // 3
  const arrivingSoon = () => {
    const bookings = reservations.filter(reservation => {
        const difference = differenceInCalendarDays(new Date(reservation.checkIn), new Date())
        if (difference === 0 || difference === 1) {
            return reservation
        }
    })

    setReservationsCounts(prev => ({
        ...prev,
        arrivingSoon: bookings.length
    }))
    setReservationType('ARRIVING_SOON')
    setSelectedReservations(bookings)
    setMessage('You don’t have any guests arriving today or tomorrow.')
  }

  // 4
  const upcoming = () => {
    const bookings = reservations.filter(reservation => {
        const difference = differenceInCalendarDays(new Date(reservation.checkIn), new Date())
        if (difference > 1) {
            return reservation
        }
    })
    
    setReservationsCounts(prev => ({
        ...prev,
        upcoming: bookings.length
    }))
    setReservationType('UPCOMING')
    setSelectedReservations(bookings)
    setMessage('You currently don’t have any upcoming guests.')
  }


  return (
    <section className="hostings__stats">
        <header className="hostings__stats-header">
            <h2>Your reservations</h2>

            <Link><u>All reservations ({reservations.length})</u></Link>
        </header>

        <ul className="hosting__stats-buttons">
            <li>
                <button onClick={() => handleButton('CHECKING_OUT')} className={`hosting__stats-button ${reservationType === 'CHECKING_OUT' ? 'active' : ''}`}>Checking out ({reservationsCounts.checkingOut})</button>
            </li>
            <li>
                <button onClick={() => handleButton('CURRENTLY_HOSTING')} className={`hosting__stats-button ${reservationType === 'CURRENTLY_HOSTING' ? 'active' : ''}`}>Currently hosting ({reservationsCounts.currentlyHosting})</button>
            </li>
            <li>
                <button onClick={() => handleButton('ARRIVING_SOON')} className={`hosting__stats-button ${reservationType === 'ARRIVING_SOON' ? 'active' : ''}`}>Arriving soon ({reservationsCounts.arrivingSoon})</button>
            </li>
            <li>
                <button onClick={() => handleButton('UPCOMING')} className={`hosting__stats-button ${reservationType === 'UPCOMING' ? 'active' : ''}`}>Upcoming ({reservationsCounts.upcoming})</button>
            </li>
        </ul>

        <ul className={`hosting__stats-list ${selectedReservations.length ? 'active' : ''}`}>
            
            {!selectedReservations.length ? (
                <div className="hosting__stats-message">
                    <i className="iconoir-clipboard-check"></i>
                    <p>{message}</p>
                </div>
                ) : (
                    <>
                        {selectedReservations.map(reservation => (
                            <ReservedGuest key={reservation._id} reservation={reservation} />
                        ))}
                    </>
                )
            
            }
        </ul>
    </section>
  )
}

export default Reservations