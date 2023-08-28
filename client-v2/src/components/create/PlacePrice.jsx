import '../../css/positions/place-price.css'
import { PlaceContext } from '../../context/PlaceContext'
import { useContext, useState } from 'react'

const PlacePrice = ({ setDisabled }) => {
  const [edit, setEdit] = useState(false)
  const [width, setWidth] = useState(0.1)
  const { setPrice, price } = useContext(PlaceContext)

  const handleChange = (e) => {
    setPrice(e.target.value)
    const len = e.target.value.length
    setWidth(len + 0.1)
  }

  // next button
  if (price) {
    setDisabled(false)
  } else {
      setDisabled(true)
  }   

  return (    
    <main className="create__main place-price">
      <h1 className="place-price__title">Now, set your price</h1>
      <p className='place-price__subtitle'>You can change it anytime.</p>

      <div className="place-price__set-price">
          {edit ? (
              <div className="place-price__editor">
                  <span>₹</span>
                  <input style={{width: `${width}ch`}} autoFocus onChange={(e) => handleChange(e)} value={price} type="text" className='place-price__input' />
                  <i onClick={() => setEdit(false)} className="ri-check-line"></i>
              </div>
          ) : (
              <div className="place-price__editor">
                  <span className='place-price__price'>₹{price}</span>
                  <i onClick={() => setEdit(true)} className="ri-pencil-fill"></i>
              </div>
          )}
      </div>

      <p className="place-price__learn-more">Learn more about pricing</p>
    </main>

  )
}

export default PlacePrice