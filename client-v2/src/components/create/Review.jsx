import '../../css/positions/review.css'
import { useContext, useState } from 'react'
import { PlaceContext } from '../../context/PlaceContext'
import ReviewModal from './ReviewModal'

const Review = () => {
  const { photos, title, price } = useContext(PlaceContext)
  const [showReviewModal, setShowReviewModal] = useState(false)

  return (
    <main className="create__main review">
      <h1 className="review__title">Review your listing</h1>
      <p className='review__subtitle'>Here's what we'll show to guests. Make sure everything looks good.</p>
    
      <div className="review__body">
        <button onClick={() => setShowReviewModal(true)} className="review__card">
            <div className="review__card-photo">
                <img src={`http://localhost:8000/uploads/${photos[0]}`} alt="" />
                <label>Show preview</label>
            </div>

            <div className="review__card-info">
                <div>
                    <p>{title}</p>
                    <p>₹{price} <span>night</span></p>
                </div>

                <p>New <i className="ri-star-fill"></i></p>
            </div>
        </button>

        <div className="review__next">
            <h2>What's next?</h2>

            <ul>
                <li>
                    <i className="iconoir-clipboard-check"></i>
                    <div>
                        <h3>Confirm a few details and publish</h3>
                        <p>We'll let you know if you need to verify your identity or
                        register with the local government.</p>
                    </div>
                </li>
                <li>
                    <i className="iconoir-calendar"></i>
                    <div>
                        <h3>Set up your calendar</h3>
                        <p>Choose which dates your listing is available. It will be
                        visible 24 hows after you publish.</p>
                    </div>
                </li>
                <li>
                    <i className="iconoir-edit-pencil"></i>
                    <div>
                        <h3>Adjust your settings</h3>
                        <p>Set house rules, select a cancellation policy, choose
                        how guests book and more.</p>
                    </div>
                </li>
            </ul>
        </div>
      </div>

      {showReviewModal && <ReviewModal setShowReviewModal={setShowReviewModal} />}  
      
    </main>
  )
}

export default Review