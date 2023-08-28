import axios from "axios"
import { useEffect, useState } from "react"

const ReservedGuest = ({ reservation }) => {
  const [place, setPlace] = useState({})
  const [user, setUser] = useState({})
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (reservation._id) {
        axios.get(`/places/${reservation.place}`).then(response => {
            setPlace(response.data)
            // console.log(response.data);
        }).catch(err => console.log(err))

        axios.get(`/users/${reservation.user}`).then(response => {
          setUser(response.data)
          // console.log(response.data);
      }).catch(err => console.log(err))
    }
  }, [])

  const { guests: { adults, children, infants, pets }, checkIn, checkOut, nights } = reservation

  if (!!place.photos && !!user && !!user.fname) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const cIn = new Date(checkIn).getDate() + ' ' + months[new Date(checkIn).getMonth()]
    const cOut = new Date(checkOut).getDate() + ' ' + months[new Date(checkOut).getMonth()]
    
    return (
      <li className='hosting__stats-card'>
            <div className='hosting__stats-card-place'>
              <img className="hosting__stats-card-place-img" src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="" />
              <p className="hosting__stats-card-place-name"><i className="ri-map-pin-line"></i> {place?.address.state}, {place?.address.country}</p>
            </div>

            <div className='hosting__stats-card-info'>
              <div className="hosting__stats-card-user">
                {user.photo ? (
                    <img className="hosting__stats-card-user-img"  src={`http://localhost:8000/uploads/${user.photo}`} alt="" />
                ) : <p className="hosting__stats-card-user-initial">{user?.fname.charAt(0).toUpperCase()}</p>}
                <p className="hosting__stats-card-user-name">{user?.fname} {user?.lname}</p>
                <button className="hosting__stats-card-btn" onClick={() => setShowInfo(prev => !prev)}>
                  <i className={`iconoir-${showInfo ? 'cancel' : 'nav-arrow-up'}`}></i>
                </button>
              </div>

              <div className={`hosting__stats-card-place-info ${showInfo ? 'active' : ''}`}>
                <ul className="hosting__stats-card-guests">
                  {!!adults && (
                    <li>{`${adults > 1 ? adults + ' adults' : adults + ' adult'}`}</li>
                  )}
                  {!!children && (
                    <>
                      <li>·</li>
                      <li>{`${children > 1 ? children + ' children' : children + ' child'}`}</li>
                    </>
                  )}
                  {!!infants && (
                    <>
                      <li>·</li>
                      <li>{`${infants > 1 ? infants + ' infants' : infants + ' infant'}`}</li>
                    </>
                  )}
                  {!!pets && (
                    <>
                      <li>·</li>
                      <li>{`${pets > 1 ? pets + ' pets' : pets + ' pet'}`}</li>
                    </>
                  )}
                </ul>
                <div className="hosting__stats-card-nights">
                  <i className="ri-moon-line"></i>
                  <span>{nights} nights</span>
                </div>

                <div className="hosting__stats-card-dates">
                  {cIn}
                  <i className="ri-arrow-right-line"></i>   
                  {cOut}     
                </div>
              </div>
            </div>
      </li>
    )
  }
}

export default ReservedGuest