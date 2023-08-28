import { useContext } from "react"
import { PlaceContext } from "../../context/PlaceContext"
import { perks as perksList } from '../../assets/perks'
import { UserContext } from "../../context/UserContext"

const ReviewModal = ({ setShowReviewModal }) => {
  const { photos, title, type, description, stats: {guests, bedrooms, beds, bathrooms}, perks, address: {city, state, country} } = useContext(PlaceContext)
  const {user: {fname, photo}} = useContext(UserContext)

  let perksCount = 0
  if (perks.length > 5) {
    perksCount = perks.length - 5
  }

  const newPerks = perksList.filter(p => perks.includes(p.className))

  return (
    <div className="review__modal">
      <div className="review__modal-content">
        <header className="review__modal-header">
          <button onClick={() => setShowReviewModal(false)}>
              <i className="ri-close-line"></i>
          </button>
          Full preview
        </header>

        <div className="review__modal-body">
          <img className="review__modal-img" src={`http://localhost:8000/uploads/${photos[0]}`} alt="" />
          
          <div className="review__modal-details">
            <h2>{title}</h2>

            <div className="review__modal-info">
              <div>
                <h3>{type[0].toUpperCase() + type.substring(1)} hosted by {fname}</h3>
                <ul>
                  <li>{guests} guests</li>
                  <li>{bedrooms} bedrooms</li>
                  <li>{beds} beds</li>
                  <li>{bathrooms} bathrooms</li>
                </ul>
              </div>

              <p className={`review__modal-user-img ${photo ? 'active' : ''}`}>
                {photo ? (
                    <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                ) : fname.charAt(0).toUpperCase()}
                {/* {fname.charAt(0).toUpperCase()} */}
              </p>
            </div>

            <p className="review__modal-description">{description}</p>

            <div className="review__modal-amenities">
              <h3>Amenities</h3>
              <ul>
                {newPerks.map(({className, perkName}, i) => {
                  if (i < 5) {
                    return <li key={className}>{perkName} <i className={className}></i></li>
                  }
                }
                )}
                {perksCount ? <li>+{perksCount} more</li> : ''}
              </ul>
            </div>

            <div className="review__modal-address">
              <h3>Location</h3>
              <p>{city}, {state}, {country}</p>
              <p>We’ll only share your address with guests who are booked as outlined in our <span>Privacy Policy</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal