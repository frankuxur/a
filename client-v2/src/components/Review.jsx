import axios from "axios"
import { useEffect, useState } from "react"

const Review = ({ review }) => {  
  const [userInfo, setUserInfo] = useState({})
  const { feedback: { comment, rating } } = review

  useEffect(() => {
    axios.get(`/users/${review.user}`).then(response => {
        setUserInfo(response.data)
    })
  }, [])  

  if (userInfo?.photo) {
        return (
            <div className="place__reviews-card">
                <header className="place__reviews-card-header">
                    <img src={`http://localhost:8000/uploads/${userInfo.photo}`} alt="" />

                    <div>
                        <p>{userInfo.fname} {userInfo.lname}</p>
                        {[...Array(5)].map((_, i) => {
                            if (i < rating) {
                                return <i className="ri-star-s-fill"></i>
                            } else {
                                return <i className="ri-star-s-line"></i>
                            }
                        })}
                    </div>
                </header>

                <p className="place__reviews-card-comment">
                    {comment}
                </p>
            </div>
    )
    }
}

export default Review