import axios from "axios"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      await axios.post('/login', {email, password})
      alert('Login successful')
    } catch (error) {
      alert('Login failed')
    }
  }
  return (
    <div>
      <h4>Login</h4>
      <form onSubmit={handleLoginSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={ev => setEmail(ev.target.value)} 
        /> 
        <br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={ev => setPassword(ev.target.value)} 
        /> <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login