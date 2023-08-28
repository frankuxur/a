import '../../css/positions/place-photos.css'
import media from '../../assets/photos/media.png'
import { useContext } from 'react'
import { PlaceContext } from '../../context/PlaceContext'
import axios from 'axios'

const PlacePhotos = ({ setDisabled }) => {
  const { type, setPhotos, photos } = useContext(PlaceContext)
  
  // toggle action btn   
  const handleAction = (e) => {
    if (e.target.classList[0] === 'place-photos__action-btn') {
        const style = e.target.nextElementSibling.style
        if (style.display === 'none') {
            style.display = 'flex'
        } else {
            style.display = 'none'
        }
    } else {
        const style = e.target.parentElement.nextElementSibling.style
        if (style.display === 'none') {
            style.display = 'flex'
        } else {
            style.display = 'none'
        }
    }
  }

  
  const uploadPhotos = (e) => {
      const files = e.target.files
      const data = new FormData()
      for (let i = 0; i < files.length; i++ ) {
          data.append('photos', files[i])
        }
        
        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            const {data: filenames} = response
            setPhotos([...photos, ...filenames])
        })    
        
    }


  const makeCover = (link, e) => {
    setPhotos([link, ...photos.filter(photo => photo !== link)])
    e.target.parentElement.style.display = 'none'
    
  }

  const remove = (link, e) => {
    setPhotos([...photos.filter(photo => photo !== link)])
    e.target.parentElement.style.display = 'none'
  }    
    
  // next button
  if (photos.length > 4) {
      setDisabled(false)
  } else {
      setDisabled(true)
  }

  return (
    <main className="create__main place-photos">
        <h1 className="place-photos__title">Add some photos of your {type}</h1>
        <p className='place-photos__subtitle'>You'll need 5 photos to get started. You can add more or make changes later.</p>
    
        <div className="place-photos__grid">

            {photos !== [] && photos.length > 0 && photos.map((link, i) => (
                <div key={i} className="place-photos__photo">
                    <img className='place-photos__img' src={`http://localhost:8000/uploads/${link}`} alt="" />
    
                    <button onClick={(e) => handleAction(e)} className="place-photos__action-btn">
                        <i className="ri-more-fill"></i>
                    </button>
                    <div className="place-photos__actions">
                        <button onClick={(e) => makeCover(link, e)}>Make cover photo</button>
                        <button onClick={(e) => remove(link, e)}>Delete</button>
                    </div>

                    <label className="place-photos__photo-label">Cover Photo</label>
                </div>
            ))}

            {photos.length !== 0 && photos.length < 5 && [...Array(4 - photos.length)].map((_, i) => (
                <label key={i} className='place-photos__upload more'>
                    <input type="file" multiple onChange={uploadPhotos} />

                    <i className="iconoir-media-image place-photos__media-icon"></i>
                </label>
            ))}

            {photos.length === 0 ? (
                <label className='place-photos__upload'>
                    <input type="file" multiple onChange={uploadPhotos} />

                    <img src={media} alt="" className="place-photos__media-icon" />

                    
                    <div>
                        <h2>Drag your photos here</h2>
                        <p>Choose at least 5 photos</p>
                        <p>Upload from your device</p>
                    </div>
                </label>
            ) : (
                <label className='place-photos__upload add-more'>
                    <input type="file" multiple onChange={uploadPhotos} />

                    <i className="iconoir-plus place-photos__media-icon"></i>

                    <p>Add more</p>
                </label>
            )}
        
        </div>
    </main>

  )
}

export default PlacePhotos