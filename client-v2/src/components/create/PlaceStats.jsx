import '../../css/positions/place-stats.css'
import { useContext, useState } from 'react'
import { PlaceContext } from '../../context/PlaceContext'

const PlaceStats = () => {
  const { setStats, stats } = useContext(PlaceContext)
  const { guests, bedrooms, beds, bathrooms } = stats

  const handleChange = (key, val) => {
    switch (key) {
        case 'GUESTS': {
            setStats({
                ...stats,
                guests: stats.guests + val
            })
            break
        }
        case 'BEDROOMS': {
            setStats({
                ...stats,
                bedrooms: stats.bedrooms + val
            })
            break
        }
        case 'BEDS': {
            setStats({
                ...stats,
                beds: stats.beds + val
            })
            break
        }
        case 'BATHROOMS': {
            setStats({
                ...stats,
                bathrooms: stats.bathrooms + val
            })
            break
        }

        default: {
            setStats(stats)
            break
        }
    }
  }

  return (
    <main className="create__main place-stats">
        <h1 className="place-stats__title">Share some basics about your place</h1>
        <p className='place-stats__subtitle'>You'll add more details later, such as bed types.</p>

        <ul className="place-stats__items">
            <li className="place-stats__item">
                <label>Guests</label>

                <div className="place-stats__figure">
                    <button disabled={guests === 1 && true} onClick={() => handleChange('GUESTS', -1)}>
                        <i className="ri-subtract-line"></i>
                    </button>
                    <span>{guests}</span>
                    <button onClick={() => handleChange('GUESTS', 1)}>
                        <i className="ri-add-line"></i>
                    </button>
                </div>
            </li>
            
            <li className="place-stats__item">
                <label>Bedrooms</label>

                <div className="place-stats__figure">
                    <button disabled={bedrooms === 1 && true} onClick={() => handleChange('BEDROOMS', -1)}>
                        <i className="ri-subtract-line"></i>
                    </button>
                    <span>{bedrooms}</span>
                    <button onClick={() => handleChange('BEDROOMS', 1)}>
                        <i className="ri-add-line"></i>
                    </button>
                </div>
            </li>

            <li className="place-stats__item">
                <label>Beds</label>

                <div className="place-stats__figure">
                    <button disabled={beds === 1 && true} onClick={() => handleChange('BEDS', -1)}>
                        <i className="ri-subtract-line"></i>
                    </button>
                    <span>{beds}</span>
                    <button onClick={() => handleChange('BEDS', 1)}>
                        <i className="ri-add-line"></i>
                    </button>
                </div>
            </li>

            <li className="place-stats__item">
                <label>Bathrooms</label>

                <div className="place-stats__figure">
                    <button disabled={bathrooms === 1 && true} onClick={() => handleChange('BATHROOMS', -1)}>
                        <i className="ri-subtract-line"></i>
                    </button>
                    <span>{bathrooms}</span>
                    <button onClick={() => handleChange('BATHROOMS', 1)}>
                        <i className="ri-add-line"></i>
                    </button>
                </div>
            </li>
        </ul>
    </main>
  )
}

export default PlaceStats