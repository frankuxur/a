import '../../css/positions/overview.css'
import bed from '../../assets/photos/bed.webp'
import stand from '../../assets/photos/stand.webp'
import door from '../../assets/photos/door.webp'

const Overview = () => {
  return (
    <main className="create__main overview">
        <h1 className="overview__title">It’s easy to get started on Airbnb</h1>
    
        <ul className="overview__items">
            <li className="overview__item">
                <p>1</p>

                <div>
                    <h2>Tell us about your place</h2>
                    <p>Share some basic info, such as where it is and how many guests can stay.</p>
                </div>

                <img src={bed} alt="" />
            </li>
            <li className="overview__item">
                <p>2</p>

                <div>
                    <h2>Make it stand out</h2>
                    <p>Add 5 or more photos plus a title and description – we’ll help you out.</p>
                </div>

                <img src={stand} alt="" />
            </li>
            <li className="overview__item">
                <p>3</p>

                <div>
                    <h2>Finish up and publish</h2>
                    <p>Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.</p>
                </div>

                <img src={door} alt="" />
            </li>
        </ul>
    </main>
  )
}

export default Overview