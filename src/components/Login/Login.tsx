import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../../query'
import { useForm } from '../../hooks/hooks'
import { Navigate } from 'react-router-dom'
import './Login.scss'
import logo from '../../assets/eee.png'

const Login: React.FC = (): any => {
  // Lazy query for login user method
  const [loginUser, { data, error }] = useLazyQuery(LOGIN_USER)

  // Use form state
  const { values, handleChange, handleSubmit } = useForm(
    (credentials) => loginUser({ variables: { data: credentials } }),
    {
      username: '',
      password: '',
    }
  )

  if (error) return console.log(error)

  if (data) {
    window.localStorage.setItem('token', data.loginUser)

    return <Navigate to="/dashboard" />
  }

  return (
    <div className="login_wrapper">
      <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit} className="login">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          value={values.username}
          onChange={handleChange}
          autoFocus
          required
          className="login_input"
        />
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="password"
          onChange={handleChange}
          value={values.password}
          className="login_input"
        />
        <button type="submit" className="login_submit">
          Login
        </button>
        <a href="#" className="login_submit">
          Sign Up
        </a>
        <a href="#" className="login_submit">
          Forgot Password?
        </a>
      </form>
    </div>
  )
}

export default Login
