import '../../css/positions/place-highlights.css'
import { useContext } from 'react'
import { PlaceContext } from '../../context/PlaceContext'
import rare from '../../assets/photos/highlights/rare.png'
import rustic from '../../assets/photos/highlights/rustic.png'
import inNature from '../../assets/photos/highlights/in-nature.png'
import memorable from '../../assets/photos/highlights/memorable.png'
import romantic from '../../assets/photos/highlights/romantic.png'
import historic from '../../assets/photos/highlights/historic.png'

const PlaceHighlights = ({ setDisabled }) => {
  const { setHighlights, highlights, type } = useContext(PlaceContext)

  const handleClick = (highlight) => {
    if (highlights.includes(highlight)) {
        const newArr = highlights.filter(h => h !== highlight)
        setHighlights(newArr);
        return
    }
    if (highlights.length === 2) {
        highlights.shift()
    }
    setHighlights([...highlights, highlight])
  }

  // next button
  if (highlights.length) {
    setDisabled(false)
  } else {
      setDisabled(true)
  }    

  return (
    <main className="create__main place-highlights">
        <h1 className="place-highlights__title">Next, let's describe your {type}</h1>
        <p className='place-highlights__subtitle'>Choose up to 2 highlights. We'll use these to get your description started.</p>       
   
        <ul className="place-highlights__items">
            <li className={`place-highlights__item ${highlights.includes('rare') && 'active'}`}>
                <button onClick={() => handleClick('rare')}>
                    <img src={rare} alt="" />
                    <label className="place-highlights__label">Rare</label>
                </button>
            </li>
            <li className={`place-highlights__item ${highlights.includes('rustic') && 'active'}`}>
                <button onClick={() => handleClick('rustic')}>
                    <img src={rustic} alt="" />
                    <label className="place-highlights__label">Rustic</label>                    
                </button>
            </li>
            <li className={`place-highlights__item ${highlights.includes('in-nature') && 'active'}`}>
                <button onClick={() => handleClick('in-nature')}>
                    <img src={inNature} alt="" />
                    <label className="place-highlights__label">In nature</label>  
                </button>
            </li>
            <li className={`place-highlights__item ${highlights.includes('memorable') && 'active'}`}>
                <button onClick={() => handleClick('memorable')}>
                    <img src={memorable} alt="" />
                    <label className="place-highlights__label">Memorable</label>                    
                </button>
            </li>
            <li className={`place-highlights__item ${highlights.includes('romantic') && 'active'}`}>
                <button onClick={() => handleClick('romantic')}>
                    <img src={romantic} alt="" />
                    <label className="place-highlights__label">Romantic</label>                    
                </button>
            </li>
            <li className={`place-highlights__item ${highlights.includes('historic') && 'active'}`}>
                <button onClick={() => handleClick('historic')}>
                    <img src={historic} alt="" />
                    <label className="place-highlights__label">Historic</label>                       
                </button>
            </li>
        </ul>
    </main>

  )
}

export default PlaceHighlights