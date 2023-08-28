import '../css/place.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { perks as perksList } from '../assets/perks'
import BookingWidget from '../components/BookingWidget'
import logo from '../assets/logo/black-logo.png'
import { UserContext } from '../context/UserContext'
import Gallery from '../components/Gallery'
import Review from '../components/Review'
import Footer from '../components/Footer'

const PlacePage = () => {
  const { id } = useParams()
  const [place, setPlace] = useState('loading')
  const [host, setHost] = useState({})
  const [showGallery, setShowGallery] = useState(false)
  const { user: { _id: userId } } = useContext(UserContext)
  const [rating, setRating] = useState(0)
  const [ratingsCount, setRatingsCount] = useState(0)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!id) {
        return
    } 
    axios.get(`/places/${id}`).then(response => {
        setPlace(response.data)
        axios.get(`/host/${response.data.owner}`).then(response => {
            setHost(response.data)
        })
    }).catch(e => setPlace('error'))

    axios.get(`/book/place/${id}`).then(response => {
        const feedback = response.data.filter(item => 'feedback' in item).map(item => item.feedback)
        const total = feedback.reduce((sum, item) => sum + item.rating, 0)
        setRating(total/feedback.length)
        setRatingsCount(feedback.length)

        // all reviews
        const allReviews = response.data.filter(item => 'feedback' in item)
        setReviews(allReviews)
    }).then(err => {
        // console.log(err)
    })

  }, [id])

  if (place === 'loading') return <h1>loading place...</h1>
  if (place === 'error') return <h1>404 | ERROR</h1>

  const { title, address: { city, state, country }, photos, 
          stats: { guests, bedrooms, beds, bathrooms }, type,
          description, perks, price, _id: placeId } = place

  const { fname, photo, about } = host

  if (showGallery) {
    return (
        <Gallery 
            photos={photos}
            setShowGallery={setShowGallery}
        />
    )
  }


  return (
    <>
        
        <div className="place">
            <header className="place__header">
            <h1 className='place__header-title'>{title}</h1>

            <div className="place__header-info">
                    <div>
                        {!!ratingsCount && (
                            <ul className='place__header-review'>
                                <li>
                                    <i className="ri-star-fill"></i>
                                    <span>{(rating + '').length > 3 ? rating.toFixed(2) : rating}</span>
                                </li>
                                <li>·</li>
                                <li><u>{`${ratingsCount > 1 ? ratingsCount + ' reviews' : ratingsCount + ' review'}`}</u></li>
                            </ul>
                        )}
                        
                        <u>{`${city}, ${state}, ${country}`}</u>
                    </div>

                    <div>
                        {/* share */}
                        <button><i className="ri-heart-3-line"></i> <u>Save</u></button>
                    </div>
            </div>
            </header>

            <section className="place__photos">
                {photos.map((photo, i) => {
                    if (i < 5) return <img key={i} className='place__photo' src={`http://localhost:8000/uploads/${photo}`} alt="" />
                })}

                <button onClick={() => setShowGallery(true)}><i className="ri-grid-fill"></i> <span>Show all photos</span></button>
            </section>

            <section className="place__details">
                <div className="place__about">
                    <header>
                        <div>
                            <h2 className='place__about-title'>Entire {type} hosted by {fname}</h2>
                            <ul>
                                <li>{guests} {guests === 1 ? 'guest' : 'guests'}</li>
                                <li>{bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}</li>
                                <li>{beds} {beds === 1 ? 'bed' : 'beds'}</li>
                                <li>{bathrooms} {bathrooms === 1 ? 'bathroom' : 'bathrooms'}</li>
                            </ul>
                        </div>

                        <div className={`place__host-icon ${photo && 'active'}`}>
                            {photo ? (
                                    <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                            ) : fname && fname.charAt(0).toUpperCase()}
                        </div>
                    </header>

                    <section className="place__description">
                        <p>{description}</p>
                    </section>

                    {/* beds distribution among bedrooms */}

                    <section className="place__amenities">
                        <h2>What this place offers</h2>
                        
                        <ul>
                            {perksList.map(({className, perkName}, i) => {
                                if (perks.includes(className)) {
                                    return <li key={i}><i className={className}></i> {perkName}</li>
                                }
                            })}
                        </ul>
                    </section>
                </div>

                <BookingWidget 
                    price={price} 
                    maxGuests={guests} 
                    perks={perks} 
                    userId={userId}
                    placeId={placeId}
                    rating={rating}
                    ratingsCount={ratingsCount}
                />
            </section>

            <section className="place__host">
                <header>
                    {photo ? (
                        <div className={`place__host-icon ${photo && 'active'}`}>
                            <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                        </div>
                    ) : fname && fname.charAt(0).toUpperCase()}

                    <div>
                        <h2>Hosted by {fname}</h2>
                        <p>Joined in November 2013</p>
                    </div>
                </header>

                {/* reviews */}

                <section className="place__host-details">
                    {about && (
                        <div className="place__host-about">
                            <p>{about}</p>
                        </div>
                    )}

                    <div className="place__host-contact">
                        <p>Response rate: 97%</p>
                        <p>Response time: within an hour</p>

                        <Link className='place__host-contact-button'>Contact host</Link>

                        <div>
                            <div>
                                <i className="iconoir-historic-shield"></i>
                                <img src={logo} alt="" />
                            </div>

                            <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
                        </div>
                    </div>
                </section>
            </section>

            {!!ratingsCount && (
                <section className="place__reviews">
                    <header className="place__reviews-header">
                        <ul className='place__header-review'>
                            <li>
                                <i className="ri-star-fill"></i>
                                <span>{(rating + '').length > 3 ? rating.toFixed(2) : rating}</span>
                            </li>
                            <li>·</li>
                            <li><u>{`${ratingsCount > 1 ? ratingsCount + ' reviews' : ratingsCount + ' review'}`}</u></li>
                        </ul>
                    </header>
                
                    <div className="place__reviews-cards">
                        {!!reviews.length && reviews.map(review => (
                            <Review 
                            key={review._id}
                            rating={rating}
                            ratingsCount={ratingsCount}
                            review={review}
                            />
                        ))}
                    </div>

                </section>
            )}
        </div>

        <Footer />
    </>
  )
}

export default PlacePage