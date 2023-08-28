import '../css/edit-profile.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const EditProfile = ({ fname, setEdit }) => {
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [text, setText] = useState('')
  const [about, setAbout] = useState('')
  const { setAboutUser, setUserPhoto, user: { about: abt, photo } } = useContext(UserContext)
  console.log(abt, photo);

  const handleClick = async () => {
    const { data } = await axios.put('/about-user', { about })
    console.log(data);
    setAboutUser(data)
    setEdit(false)
  }

  useEffect(() => {
    console.log(abt, photo);
    if (abt) {
        setText(abt)
        setAbout(abt)
    }
  }, [])

  const uploadPhotos = (e) => {
    const files = e.target.files
    const data = new FormData()
    for (let i = 0; i < files.length; i++ ) {
        data.append('photos', files[i])
      }
      
      axios.post('/user-photo', data, {
          headers: {'Content-Type': 'multipart/form-data'}
      }).then(response => {
        console.log(response);
          const {data: filename} = response
          setUserPhoto(filename)
      })  
  }

  return (
    <div className="edit-profile">
        <div className="edit-profile__upload-icon">

            <div className={`edit-profile__icon ${photo && 'active'}`}>
                {photo ? (
                    <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                ) : fname.charAt(0) || 'X'}
            </div>
            <label>
                <i className="ri-camera-fill"></i>
                <span>{photo ? 'Edit' : 'Add'}</span>
                <input type="file" onChange={uploadPhotos} />
            </label>
        </div>

        <div className="edit-profile__edit-user-info">
            <header>
                <h1>Your profile</h1>
                <p>The information you share will be used across Airbnb to help other guests and Hosts get to know you. <u>Learn more</u></p>
            </header>

            <div className="edit-profile__about">
                <h2>About you</h2>

                {!!about ? (
                    <div className='edit-profile__about-text'>
                        <p>{about}</p>
                        <button onClick={() => setShowAboutModal(true)}><u>Edit intro</u></button>
                    </div>
                ) : (
                    <div className='edit-profile__about-box'>
                        <label>Write something fun and punchy.</label>
                        <button onClick={() => setShowAboutModal(true)}><u>Add intro</u></button>
                    </div>
                )}
            </div>

            <div className="edit-profile__button">
                <button onClick={handleClick}>Done</button>
            </div>
        </div>

        {/* modal 👇 */}
        {showAboutModal && (
            <div className="edit-profile__about-modal">
                <div className="edit-profile__about-modal-content">
                    <i onClick={() => setShowAboutModal(false)} className="ri-close-line"></i>

                    <header>
                        <h3>About you</h3>
                        <p>Tell us a little bit about yourself so your future Hosts or guests can get to know you.</p>
                    </header>

                    <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <span>{text.length}/750 characters</span>

                    <footer>
                        <button onClick={() => {
                            setAbout(text)
                            setShowAboutModal(false)
                        }}>Save</button>
                    </footer>
                </div>
            </div>
        )}
    </div>
  )
}

export default EditProfile