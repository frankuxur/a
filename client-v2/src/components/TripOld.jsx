const TripOld = ({ trips, getDate, handleFeedbackBtn, bookings }) => {
    
  const unique = [...new Set(trips.map(item => item))]  
  console.log(unique)

  
//   if (checkIn && checkOut) {
//     const days = differenceInCalendarDays(new Date(checkIn), new Date())
//     console.log(days);
//   }

  return (
    <>
        {!!unique && unique.map((trip, i) => 
            (i < bookings.length && 
                <li key={trip._id} className='trips__item'>
                    <div className="trips__destination">
                        <img className='trips__img' src={`http://localhost:8000/uploads/${trip.photos[0]}`} alt="" />
                        <div className="trips__name">{trip.title}</div>
                    </div>
                    <div className="trips__price">₹ {trip.price + trip.serviceFee}</div>
                    <ul className="trips__stats">
                        <li>{trip.stats.bedrooms}</li>
                        <li>{trip.stats.beds}</li>
                        <li>{trip.stats.bathrooms}</li>
                    </ul>
                    <div className="trips__booked-on">{`${getDate(trip.bookedOn)} ${new Date(trip.bookedOn).getFullYear()}`}</div>
                    <div className="trips__stay">{`${getDate(trip.checkIn)} - ${getDate(trip.checkOut)} ${new Date(trip.checkOut).getFullYear()}`}</div>
                    <button onClick={() => handleFeedbackBtn(trip)} className="trips__feedback">
                        <i className="ri-edit-line"></i>
                    </button>
                </li>
            )
            
        )}
    </>
  )
}

export default TripOld