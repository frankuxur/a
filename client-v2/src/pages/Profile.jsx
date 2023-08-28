import '../css/profile.css'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import EditProfile from '../components/EditProfile'

const Profile = () => {
  const { user: { fname, about, photo } } = useContext(UserContext) 
  const [edit, setEdit] = useState(false)

  if (edit) {
    return <EditProfile fname={fname} setEdit={setEdit} />
  }

  return (
    <div className="profile">
        <div className="profile__user-card">
            <div className={`profile__user-icon ${photo && 'active'}`}>
                {photo ? (
                    <img src={`http://localhost:8000/uploads/${photo}`} alt="" />
                ) : fname && fname.charAt(0).toUpperCase()}
                {/* {fname && fname.charAt(0)} */}
            </div>
            <p className='profile__user-fname'>{fname}</p>
            <p>Guest</p>
        </div>

        {about ? (
            <div className="profile__create-profile active">
                <h2>About {fname}</h2>
                <button onClick={() => setEdit(true)}>Edit profile</button>
                <p>{about}</p>
            </div>
        ) : (
            <div className="profile__create-profile">
                <h2>It's time to create your profile</h2>
                <p>Your Airbnb profile is an important part of every reservation. Create yours to help other Hosts and guests get to know you.</p>
                <button onClick={() => setEdit(true)}>Create profile</button>
            </div>
        )}
    </div>
  )

}

export default Profile