import '../css/create.css'
import logo from '../assets/logo/black-logo.png'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { PlaceContext } from '../context/PlaceContext'
import Overview from '../components/create/Overview'
import Step1 from '../components/create/Step1'
import FadeInOut from '../utils/FadeInOut'
import PlaceType from '../components/create/PlaceType'
import PlaceArea from '../components/create/PlaceArea'
import PlaceAddress from '../components/create/PlaceAddress'
import PlaceStats from '../components/create/PlaceStats'
import Step2 from '../components/create/Step2'
import PlacePerks from '../components/create/PlacePerks'
import PlacePhotos from '../components/create/PlacePhotos'
import PlaceTitle from '../components/create/PlaceTitle'
import PlaceDescription from '../components/create/PlaceDescription'
import PlaceHighlights from '../components/create/PlaceHighights'
import Step3 from '../components/create/Step3'
import PlaceGuestType from '../components/create/PlaceGuestType'
import PlacePrice from '../components/create/PlacePrice'
import PlaceDiscounts from '../components/create/PlaceDiscounts'
import LastStep from '../components/create/LastStep'
import Review from '../components/create/Review'
import Congratulations from '../components/create/Congratulations'
import axios from 'axios'

const Create = () => {
  const navigate = useNavigate()
  const positions = ['overview', 'step-1', 'place-type', 
                     'place-area', 'place-address', 'place-stats', 
                     'step-2', 'place-perks', 'place-photos',
                     'place-title', 'place-highlights', 'place-description', 
                     'step-3', 'place-guest-type', 'place-price', 
                     'place-discounts', 'last-step', 'place-review', 
                     'congragulations']
  const [position, setPosition] = useState(0)
  const [filled, setFilled] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const {type, area, address,
        stats, perks, photos,
        title, highlights, description,
        guestType, price, discounts,
        lastStep, resetState, setEdit, edit, place} = useContext(PlaceContext)

  const prevPostion = () => {
    setPosition(position - 1)
    if (position !== 1) setFilled(prev => prev - 6.25)
  }

  const nextPostion = () => {
    if (position < positions.length - 2) {
        setPosition(position + 1)
        if (position !== 0) setFilled(prev => prev + 6.25)
    } else if (edit) {
        update()
    } else {
        publish()
    }
  }

  useEffect(() => {
    if ([0, 1, 5, 6, 12, 15, 16, 17, 18].includes(position)) {
        setDisabled(false)
    } else {
        setDisabled(true)
    }
  }, [position])

  async function publish () {
    const placeData = {type, area, address,
        stats, perks, photos,
        title, highlights, description,
        guestType, price, discounts,
        lastStep}
    await axios.post('/places', placeData)
    setPosition(position + 1)
  }

  async function update () {
    const { _id } = place
    const placeData = {type, area, address,
        stats, perks, photos,
        title, highlights, description,
        guestType, price, discounts,
        lastStep, _id}
    await axios.put('/places', placeData)
    setPosition(position + 1)
  }
  

  if (position === 18) {
      
    if (edit) {
        return (
            navigate('/hosting/listings', { state: { edited: true } })
        )
    }
    
    // reset place state in context
    resetState()
    return (
        <Congratulations />
    )
  }

  
  return (
    <div className="create">
        <header className="become__header">
            <Link to='/' className="become__header-logo">
                <img src={logo} alt="" />
            </Link>

            <div className="become__header-btns">
                <button>Questions?</button>
                <button onClick={() => navigate('/become-a-host')}>Exit</button>
            </div>
        </header>

        
            
        {position === 0 && <FadeInOut show={true} duration={1000}><Overview /></FadeInOut>}
        {position === 1 && <FadeInOut show={true} duration={1000}><Step1 /></FadeInOut>}
        {position === 2 && <FadeInOut show={true} duration={1000}><PlaceType  setDisabled={setDisabled} /></FadeInOut>}
        {position === 3 && <FadeInOut show={true} duration={1000}><PlaceArea  setDisabled={setDisabled} /></FadeInOut>}
        {position === 4 && <FadeInOut show={true} duration={1000}><PlaceAddress  setDisabled={setDisabled} /></FadeInOut>}
        {position === 5 && <FadeInOut show={true} duration={1000}><PlaceStats  setDisabled={setDisabled} /></FadeInOut>}
        {position === 6 && <FadeInOut show={true} duration={1000}><Step2 /></FadeInOut>}
        {position === 7 && <FadeInOut show={true} duration={1000}><PlacePerks  setDisabled={setDisabled} /></FadeInOut>}
        {position === 8 && <FadeInOut show={true} duration={1000}><PlacePhotos setDisabled={setDisabled} /></FadeInOut>}
        {position === 9 && <FadeInOut show={true} duration={1000}><PlaceTitle setDisabled={setDisabled} /></FadeInOut>}
        {position === 10 && <FadeInOut show={true} duration={1000}><PlaceHighlights setDisabled={setDisabled} /></FadeInOut>}
        {position === 11 && <FadeInOut show={true} duration={1000}><PlaceDescription setDisabled={setDisabled} /></FadeInOut>}
        {position === 12 && <FadeInOut show={true} duration={1000}><Step3 /></FadeInOut>}
        {position === 13 && <FadeInOut show={true} duration={1000}><PlaceGuestType setDisabled={setDisabled} /></FadeInOut>}
        {position === 14 && <FadeInOut show={true} duration={1000}><PlacePrice setDisabled={setDisabled} /></FadeInOut>}
        {position === 15 && <FadeInOut show={true} duration={1000}><PlaceDiscounts setDisabled={setDisabled} /></FadeInOut>}
        {position === 16 && <FadeInOut show={true} duration={1000}><LastStep /></FadeInOut>}
        {position === 17 && <FadeInOut show={true} duration={1000}><Review /></FadeInOut>}
        {/* {position === 18 && <FadeInOut show={true} duration={1000}><Navigate to={'/'}</FadeInOut>} */}
        
        
        

        <footer className="create__footer">
            {/* <progress className='create__progress-bar' value={(position - 1) * 6.25} max="100"> 32% </progress> */}

            <div className="create__progress-bar">
                <div className="create__progress" style={{width: `${filled}%`}}></div>
            </div>

            <div className="create__footer-btns">
                {position === 0 ? <div></div> : <button className='create__back' onClick={prevPostion}>Back</button>}

                {position === 0 ? (
                    <button className='create__proceed' onClick={nextPostion}>Get started</button>
                ) : (
                    <button className='create__proceed create__next' disabled={disabled ? true : false } onClick={nextPostion}>
                        {position === 17 ? 'Finish' : 'Next'}
                    </button>
                )}
            </div>
        </footer>
    
    </div>
  )
}

export default Create