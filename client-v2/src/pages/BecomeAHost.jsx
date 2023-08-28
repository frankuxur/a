import '../css/become-a-host.css'
import logo from '../assets/logo/black-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { PlaceContext } from '../context/PlaceContext'

const BecomeAHost = () => {
  const { type, resetState, setEdit, edit, photos } = useContext(PlaceContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  console.log(edit)

  return (
    <div className="become">
        <header className="become__header">
            <Link to='/' className="become__header-logo">
                <img src={logo} alt="" />
            </Link>

            <div className="become__header-btns">
                <button>Questions?</button>
                <button onClick={() => navigate('/hosting')}>Exit</button>
            </div>
        </header>

        <main className="become__main">
            <h1>Welcome back, {user.fname}</h1>

            {edit && (
                <div className='become__edit-your-listing'>
                    <img src={`http://localhost:8000/uploads/${photos[0]}`} alt="" />
                    <button onClick={() => navigate('/become-a-host/create')} >
                        Edit this listing
                        <i className="ri-edit-line"></i>
                    </button>
                </div>
            )}
            

            {type && !edit && (
                <button onClick={() => navigate('/become-a-host/create')} className='become__finish-your-listing'>
                    Finish your listing
                    <i className="iconoir-arrow-tr"></i>
                </button>
            )}

            <section className="become__create">
                <h2>Start a new listing</h2>

                <ul className="become__create-items">
                    <li className="become__create-list-item">
                        <button onClick={() => {
                                resetState()
                                setEdit(false)
                                navigate('/become-a-host/create')
                            }}>
                            <div>
                                <div>
                                    <i className="ri-home-2-line"></i>
                                    <i className="ri-add-line"></i>
                                </div>
                                <p>Create a new listing</p>
                            </div>

                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </li>

                    <li className="become__create-list-item">
                        <button disabled={true}>
                            <div>
                                <i className="ri-file-copy-line"></i>
                                <p>Duplicate an existing listing</p>
                            </div>

                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </li>
                </ul>
            </section>
        </main>
    </div>
  )
}

export default BecomeAHost