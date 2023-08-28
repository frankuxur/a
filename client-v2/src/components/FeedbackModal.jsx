import '../css/feedback-modal.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { differenceInCalendarDays } from 'date-fns'

const FeedbackModal = ({ setToggleFeedbackModal, selectedTrip, getBookings }) => {
  const [active, setActive] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [err, setErr] = useState('')
  const [change, setChange] = useState(false)

  useEffect(() => {
    if ('feedback' in selectedTrip) {
        axios.get(`/book/${selectedTrip._id}`).then(response => {
            const { feedback } = response.data
            setComment(feedback.comment)
            setRating(feedback.rating)
        }).catch(err => {
            console.log(err)
        })
    }

  }, [])

  const hovered = (i) => {
    setActive(i + 1)
  }

  const handleRating = (i) => {
    setRating(i + 1)
    setActive(i + 1)
  }

  const handleChange = (e) => {
      if (comment.length > 300) {
        setErr('The maximum number of characters allowed is 32.') 
      } else {
        setErr('')
      }
      setComment(e.target.value)
  }

  const getDate = (a) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dt = new Date(a).getDate() + ' ' + months[new Date(a).getMonth()]
    return dt
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
        bookingId: selectedTrip._id,
        feedback: {
            comment,
            rating,
        },
    }
    await axios.put('/book', data)
    getBookings()

    setChange(true)
    setTimeout(() => {
        setToggleFeedbackModal(false)
        setChange(false)
    }, 3000);
  }

  const daysPassed = differenceInCalendarDays(new Date(), new Date(selectedTrip.checkOut))

  return (
    <div className="feedback">
        <div className="feedback__content">
            <header className='feedback__header'>
                <button onClick={() => setToggleFeedbackModal(false)}>
                    <i className="ri-close-line"></i>
                </button>
                Feedback
            </header>
            
            <div className="feedback__place">
                <img className='feedback__image' src={`http://localhost:8000/uploads/${selectedTrip.photos[0]}`} alt="" />
                <div>
                    <p>{selectedTrip.title}</p>
                    <p>{`${selectedTrip.address.city}, ${selectedTrip.address.state}, ${selectedTrip.address.country}`}</p>
                    <p>{`${getDate(selectedTrip.checkIn)} - ${getDate(selectedTrip.checkOut)} ${new Date(selectedTrip.checkOut).getFullYear()}`}</p>
                </div>
            </div>

            <div className="feedback__right">

                {daysPassed > 0 ? (
                    <form className="feedback__form" onSubmit={handleSubmit}>
                        <div>
                            <h2>Write a review</h2>
                            <textarea value={comment} onChange={handleChange}></textarea>
                            <span>{comment.length}/300</span>
                            {err && (
                                <p><i className="ri-error-warning-fill"></i> {err}</p>
                            )}
                        </div>

                        <div>
                            <h2>Rate your experience</h2>
                            <div className="feedback__rating">
                                {[...Array(5)].map((_, i) => (
                                    <i 
                                        key={i} 
                                        className={`${i+1 <= active || i+1 <= rating ? 'ri-star-fill' : 'ri-star-line'}`}
                                        onMouseOver={() => hovered(i)}
                                        onMouseLeave={() => setActive(0)}
                                        onClick={() => handleRating(i)}
                                    ></i>
                                ))}
                            </div>
                        </div>
                        
                        <div className="feedback__save-btn">
                            <button disabled={comment && rating && !err ? false : true} className={change ? 'active' : ''}><u>{!change ? 'Save' : (<span><i className="iconoir-check-circle"></i> Saved</span>)}</u></button>
                        </div>
                    </form>
                ) : (
                    <p className='feedback__warning'> <span><i className="iconoir-lock"></i></span> You can only leave a feedback after checking out</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default FeedbackModal