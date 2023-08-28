import '../../css/positions/place-description.css'
import { useContext } from 'react'
import { PlaceContext } from '../../context/PlaceContext'

const PlaceDescription = ({ setDisabled }) => {
  const { setDescription, description } = useContext(PlaceContext) 

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  // next button
  if (description && description.length < 499) {
    setDisabled(false)
  } else {
      setDisabled(true)
  }    

  return (
    <main className="create__main place-description">
        <h1 className="place-description__title">Create your description</h1>
        <p className='place-description__subtitle'>Share what makes your place special.</p>

        <textarea onChange={(e) => handleChange(e)} value={description} className="place-description__textarea"></textarea>
        <label className='place-description__textarea-label'>{description.length}/500</label>  

        {description.length > 499 && <p className='place-description__error'><i className="ri-error-warning-fill"></i> The maximum number of characters allowed is 500.</p>}
    </main>

  )
}

export default PlaceDescription