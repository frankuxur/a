import '../../css/positions/place-title.css'
import { useContext } from 'react'
import { PlaceContext } from '../../context/PlaceContext'
import { hostType } from '../../assets/hostType'

const PlaceTitle = ({ setDisabled }) => {
  const { setTitle, title, type } = useContext(PlaceContext) 

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const newType = hostType.filter(ht => ht.value === type)
  console.log(newType);

  // next button
  if (title && title.length < 33) {
    setDisabled(false)
  } else {
      setDisabled(true)
  }  

  return (
    <main className="create__main place-title">
        <h1 className="place-title__title">Now, let's give your {newType[0].label} a title</h1>
        <p className='place-title__subtitle'>Short titles work best. Have fun with it — you can always change it later.</p>       
    
        <textarea onChange={(e) => handleChange(e)} value={title} className='place-title__textarea'></textarea>
        <label className='place-title__textarea-label'>{title.length}/32</label>

        {title.length > 32 && <p className='place-title__error'><i className="ri-error-warning-fill"></i> The maximum number of characters allowed is 32.</p>}
    </main>
  )
}

export default PlaceTitle