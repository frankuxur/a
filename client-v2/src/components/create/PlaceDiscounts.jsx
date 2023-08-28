import '../../css/positions/place-discounts.css'
import { PlaceContext } from '../../context/PlaceContext'
import { useContext } from 'react'

const PlaceDiscounts = () => {
  const { setDiscounts, discounts } = useContext(PlaceContext)
    
  const offers = [
    {
       discount: '20%',
       title: 'New listing promotion',
       subtitle: 'Offer 20% off your first 3 bookings',
       code: 'promo'
    },
    {
       discount: '10%',
       title: 'Weekly discount',
       subtitle: 'For stays of 7 nights or more',
       code: 'weekly'
    },
    {
       discount: '20%',
       title: 'Monthly discount',
       subtitle: 'For stays of 28 nights or more',
       code: 'monthly'
    },
  ]

  const handleChange = (code) => {
    if (discounts.includes(code)) {
        setDiscounts([...discounts.filter(c => c !== code)])
    } else {
        setDiscounts([...discounts, code])
    }
  }
     

  return (
    <main className="create__main place-discounts">
      <h1 className="place-discounts__title">Add discounts</h1>
      <p className='place-discounts__subtitle'>Help your place stand out to get booked faster and earn your first reviews.</p>

        <ul className="place-discounts__items">
            {offers.map(({discount, title, subtitle, code}) => (
                <li key={code} className="place-discounts__item">

                    <div className="place-discounts__info">
                        <label className={`place-discounts__percent ${discounts.includes(code) ? 'active' : ''}`}>{discount}</label>
                        <div>
                            <p>{title}</p>
                            <p>{subtitle}</p>
                        </div>
                    </div>

                    <input onChange={() => handleChange(code)} checked={discounts.includes(code) ? true : false} className='place-discounts__checkbox' type="checkbox" />
                </li>
            ))}
        </ul>
        
      <p className="place-discounts__learn-more">Only one discount will be applied per stay. <span>Learn more</span></p>
    </main>
  )
}

export default PlaceDiscounts