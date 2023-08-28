import '../css/account-settings.css'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'

const AccountSettings = () => {
  const { user: { fname, lname, email } } = useContext(UserContext)
  return (
    <div className="account-settings">
      <header className='account-settings__header'>
        <h1 className='account-settings__title'>Account</h1>
        <p className='account-settings__user-info'>{`${fname} ${lname}`}, <span>{email} ·</span> <Link to='/profile'><u>Go to profile</u></Link></p>
      </header>

      {/* user account setting options */}

      {/* deactivate account */}
    </div>
  )
}

export default AccountSettings