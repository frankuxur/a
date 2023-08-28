import '../css/listings.css'
import HostingHeader from "../components/HostingHeader"
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlaceContext } from '../context/PlaceContext'

const Listings = () => {
  const { user } = useContext(UserContext)
  const { photos, title, setToEdit, setEdit, edit, resetState } = useContext(PlaceContext)
  const [places, setPlaces] = useState([])
  const [showEditedModal, setShowEditedModal] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  
  useEffect(() => {
    if (user._id) {
        axios.get(`/host-places/${user._id}`).then(response => {
            setPlaces(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
  }, [])

  const handleEdit = (place) => {
    setToEdit(place)
    setEdit(true)
    navigate('/become-a-host')
  }

  useEffect(() => {
    if (location.state && location.state.edited && edit) {
        console.log('update successful modal');
        setShowEditedModal(true)
        console.log(photos, title);
    }
  }, [])

  const closeModal = () => {
    resetState()
    setShowEditedModal(false)
  }

  return (
    <>
        <HostingHeader />
        <div className="listings">
            <header className="listing__header">
                <h2 className="listing__count">{places?.length} listings</h2>

                <button onClick={() => navigate('/become-a-host')}><i className="ri-add-line"></i> Create listing</button>
            </header>

            <ul className="listings__items">
                <li className='listings__item listings__item-fields'>
                    <label>Listing</label>
                    <label>Price</label>
                    <label className="listings__stats-label">
                        <i className="iconoir-key-alt"></i>
                        <i className="iconoir-bed"></i>
                        <i className="iconoir-bathroom"></i>
                    </label>
                    <label>Location</label>
                    <label>Edit</label>
                </li>

                {!!places.length && places.map(place => (
                    <li key={place._id} className='listings__item'>
                        <div className="listings__destination">
                            <img className='listings__img' src={`http://localhost:8000/uploads/${place.photos[0]}`} alt="" />
                            <div className="listings__name">{place.title}</div>
                        </div>
                        <div className="listings__price">₹ {place.price}</div>
                        <ul className="listings__stats">
                            <li>{place.stats.bedrooms}</li>
                            <li>{place.stats.beds}</li>
                            <li>{place.stats.bathrooms}</li>
                        </ul>
                        <div>{`${place.address.state}, ${place.address.country}`}</div>
                        <button onClick={() => handleEdit(place)} className="listings__edit">
                            <i className="iconoir-settings"></i>
                        </button>
                    </li>
                ))}  
            </ul>
        </div>

        {showEditedModal && (
            <div className="place-edited">
                <div className="place-edited__content">
                    <main>
                        <img src={`http://localhost:8000/uploads/${photos[0]}`} alt="" />

                        <div>
                            <i className="iconoir-check-circle"></i>
                            Listing updated successfully
                        </div>
                    </main>
                    <footer>
                        <button onClick={closeModal}><u>Close</u></button>
                    </footer>
                </div>
            </div>
        )}
    </>
  )
}

export default Listings