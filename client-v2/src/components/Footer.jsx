import '../css/footer.css'

const Footer = ({ page }) => {
    
  return (
    <footer className={`footer ${page === 'hosting' ? 'hosting__footer' : ''}`}>
        <div className="footer__links">
            <ul className="footer__list">
                <li>Support</li>
                <li>Help Centre</li>
                <li>Get help with a safety issue</li>
                <li>AirCover</li>
                <li>Supporting people with disabilities</li>
                <li>Cancellation options</li>
                <li>Our COVID-19 Response</li>
                <li>Report a neighbourhood concern</li>
            </ul>

            <ul className="footer__list">
                <li>Community</li>
                <li>Airbnb.org: disaster relief housing</li>
                <li>Combating discrimination</li>
            </ul>

            <ul className="footer__list">
                <li>Hosting</li>
                <li>Airbnb your home</li>
                <li>AirCover for Hosts</li>
                <li>Explore hosting resources</li>
                <li>Visit our community forum</li>
                <li>How to host responsibly</li>
            </ul>

            <ul className="footer__list">
                <li>Airbnb</li>
                <li>Newsroom</li>
                <li>Learn about new features</li>
                <li>Letter from our founders</li>
                <li>Careers</li>
                <li>Investors</li>
            </ul>
        </div>

        <div className="footer__bottom">
            <ul className='footer__bottom-left'>
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

            <ul className='footer__bottom-right'>
                <li>
                    <button><i className="ri-global-line"></i> <span>English (IN)</span></button>
                </li>
                <li>
                    <button>₹ <span>INR</span></button>
                </li>
                <li>
                    <div className="footer__socials">
                        <i className="iconoir-facebook-tag"></i>
                        <i className="iconoir-twitter"></i>
                        <i className="iconoir-instagram"></i>
                    </div>
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer