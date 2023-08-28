import '../css/gallery.css'
import { useState } from 'react'
import FadeInOut from '../utils/FadeInOut'

const Gallery = ({ photos, setShowGallery }) => {
  const [index, setIndex] = useState(0)

  const handleButton = (change) => {
    if (change === 'prev') {
        setIndex(prev => prev - 1)
    }
    if (change === 'next') {
        setIndex(prev => prev + 1)
    }
  }

  return (
    <div className="gallery">
        {/* <div className="gallery__content"> */}
            <header className="gallery__header">
                <button className='gallery__close' onClick={() => setShowGallery(false)}>
                    <i className="iconoir-cancel"></i>
                    close
                </button>

                <div className="gallery__count">{`${index + 1} / ${photos.length}`}</div>
            </header>

            <main className="gallery__main">
                <button onClick={() => handleButton('prev')} className={`gallery__prev ${index === 0 ? 'hide' : ''}`}>
                    <i className="iconoir-nav-arrow-left"></i>
                </button>

                <div className="gallery__photos">
                    <img className={photos.includes(photos[index]) && 'active'} src={`http://localhost:8000/uploads/${photos[index]}`} alt="" />
                </div>

                <button onClick={() => handleButton('next')} className={`gallery__next ${index === photos.length - 1 ? 'hide' : ''}`}>
                    <i className="iconoir-nav-arrow-right"></i>
                </button>
            </main>
        {/* </div> */}
    </div>
  )
}

export default Gallery