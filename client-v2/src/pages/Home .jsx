import '../css/home.css'
import { Link, useLocation } from "react-router-dom"
import WelcomeModal from "../components/WelcomeModal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";

const Home = () => {
  const location = useLocation()
  // console.log(location.state);
  const { welcomeState, handleWelcomeState } = useContext(UserContext)
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('places').then(response => {
      setPlaces(response.data)
    })
  }, [])

  // console.log(places);
  
  return (
    <>
      <main className="home">

          <section className="home__places">
            {places.length > 1 && places.map(place => <PlaceCard key={place._id} place={place} />)}
          </section>

          {welcomeState && <WelcomeModal handleWelcomeState={handleWelcomeState} />}
      </main>

      <footer className="home__footer">
        <ul className='home__footer-left'>
          <li>
            <button>© 2023 Airbnb, Inc.</button>
          </li>
          <li>·</li>
          <li>
            <button>Privacy</button>
          </li>
          <li>·</li>
          <li>
            <button>Terms</button>
          </li>
          <li>·</li>
          <li>
            <button>Sitemap</button>
          </li>
          <li>·</li>
          <li>
            <button>Company details</button>
          </li>
        </ul>

        <ul className='home__footer-right'>
          <li>
            <button><i className="ri-global-line"></i> <span>English (IN)</span></button>
          </li>
          <li>
            <button>₹ <span>INR</span></button>
          </li>
          <li>
            <button><span>Support & resources</span> <i className="iconoir-nav-arrow-up"></i></button>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default Home




