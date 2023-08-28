import '../css/trips.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FeedbackModal from '../components/FeedbackModal'
import Trip from '../components/Trip'

const Trips = () => {
  const [bookings, setBookings] = useState([])
//   const [trips, setTrips] = useState([])
  const [toggleFeedbackModal, setToggleFeedbackModal] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState({})
  
  useEffect(() => {
    getBookings()
  }, [toggleFeedbackModal])

  const getBookings = () => {
    axios.get(`/book`).then(response => {
        setBookings(response.data)
    }).catch(err => console.log(err))
  }
  
//   useEffect(() => {
    
    // if (bookings.length) {
    //     for (let booking of bookings) {
    //         foobar(booking)
            // axios.get(`/places/${booking.place}`).then(response => {
            //     const { title, stats, photos } = response.data

            //     setTrips(prev => [...prev, {
            //         ...booking,
            //         title,
            //         stats,
            //         photos,
            //     }])
            // }).catch(err => console.log(err))
        // }

 
//     }
//   }, [bookings])

//   const foobar = async (booking) => {
//     if (trips.length === bookings.length) return
//     try {
//         const doc = await axios.get(`/places/${booking.place}`)
//         const { title, stats, photos, address } = doc.data
//         setTrips(prev => [...prev, {
//             ...booking,
//             title,
//             stats,
//             photos,
//             address,
//         }])
//     } catch (error) {
//         console.log(error)
//     }
//   }

  const getDate = (a) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dt = new Date(a).getDate() + ' ' + months[new Date(a).getMonth()]
    return dt
  } 

  const handleFeedbackBtn = (trip) => {
    setSelectedTrip(trip)
    setToggleFeedbackModal(true)

    // get feedback
    // axios.get(`/book/${trip._id}`).then(response => {
    //     const data = response.data.feedback
    //     if (!data) {
    //         setExistingFeedback(data)
    //     }
    // }).catch(err => {
    //     console.log(err)
    // })
  }

  return (
    <div className='trips'>
        <header className="trips__header">
            <h1 className="trips__title">Trips</h1>
            <p className="trips__subtitle">List of trips you have booked so far. Select <i className="ri-edit-line"></i> to drop a feedback and rating for yout trip.</p>
            
            <ul>
                <li>
                    <i className="iconoir-key-alt"></i>
                    <span> - bedrooms</span>
                </li>
                <li>
                    <i className="iconoir-bed"></i>
                    <span> - beds</span>
                </li>
                <li>
                    <i className="iconoir-bathroom"></i>
                    <span> - bathrooms</span>
                </li>
            </ul>
        </header>
        
        <ul className="trips__items">
            <li className='trips__item trips__item-fields'>
                <label>Destination</label>
                <label>Price</label>
                <label className="trips__stats-label">
                    <i className="iconoir-key-alt"></i>
                    <i className="iconoir-bed"></i>
                    <i className="iconoir-bathroom"></i>
                </label>
                <label>Booked on</label>
                <label>Stay</label>
                <label>Feedback</label>
            </li>

            {!!bookings && bookings.map(booking => (
                <Trip
                    key={booking._id}
                    booking={booking}
                    getDate={getDate}
                    handleFeedbackBtn={handleFeedbackBtn}
                />
            ))}

            {/* <Trip 
                trips={trips}
                getDate={getDate}
                handleFeedbackBtn={handleFeedbackBtn}
                bookings={bookings}
            /> */}
        </ul>

        {toggleFeedbackModal && (
            <FeedbackModal 
                setToggleFeedbackModal={setToggleFeedbackModal}
                selectedTrip={selectedTrip}
                getBookings={getBookings}
            />
        )}
    </div>
  )
}

export default Trips