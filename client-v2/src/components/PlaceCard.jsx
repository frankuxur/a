import { Link } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlaceCard = ({place}) => {
  const { _id, photos, address: { state, country }, price, stats: { bathrooms, beds } } = place
  const [bookings, setBookings] = useState([])
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (_id) {
        axios.get(`/book/place/${_id}`).then(response => {
            setBookings(response.data)
            const fb = response.data.filter(item => 'feedback' in item).map(item => item.feedback)
            const r = fb.reduce((sum, item) => sum + item.rating, 0)
            setRating(r/fb.length)
        }).then(err => {
            // console.log(err)
        })
    }
  }, [])
  
//   if (bookings.length) {
//     const sum = bookings.reduce((t, b) => {
//         if ('feedback' in b) {
//             return t + b.feedback.rating
//         }
//     }, 0)

//     const count = bookings.reduce((t, b) => {
//         if ('feedback' in b) {
//             return t + 1
//         }
//     }, 0)

//     setRating(sum/count)
// }

  return (
    <div className="home__place-card">
        <div className="home__place-photos-box">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="home__place-photos"
            >
                {photos.length > 0 && photos.map((photo, i) => (
                    <SwiperSlide key={i}>
                        <Link target='_blank' to={`/place/${_id}`}>
                            <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                        </Link>
                    </SwiperSlide>    
                ))}    
            </Swiper>

            <i className="ri-heart-line home__fav"></i>
        </div>

        <Link target='_blank' to={`/place/${_id}`}>
            <div className="home__place-info">
                <div>
                    <p>{state}, {country}</p>
                    {!!rating && (
                        <p>
                            <i className="ri-star-s-fill"></i>
                            <span>{(rating + '').length > 3 ? rating.toFixed(2) : rating}</span>
                        </p>
                    )}
                </div>

                <p className="home__place-price">₹{price} <span>night</span></p>
            
                <div className='home__place-stats'>
                    <p><i className="iconoir-bed"></i> {beds} {beds === 1 ? 'bed' : 'beds'}</p>    
                    <p><i className="iconoir-bathroom"></i> {bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</p>    
                </div>   
            </div>
        </Link>
    </div>
  )
}

export default PlaceCard