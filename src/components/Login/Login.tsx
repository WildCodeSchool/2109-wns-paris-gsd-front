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

  if (error) {
    console.log(error)
    return <div>ya une couille</div>
  }

  if (data) {
    window.localStorage.setItem('token', data.loginUser.token)

    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <div className="asterisk">
        <div className="asterisk_single">*</div>
        <div className="asterisk_single">*</div>
        <div className="asterisk_single">*</div>
      </div>
      <div className="login_wrapper">
        <div className="login_logo">
          <img src={logo} alt="logo" />
          </div>
        <form onSubmit={handleSubmit} className="login">
          {/* <div> */}
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
          {/* </div> */}
          <button type="submit" className="login_submit">
            Login
          </button>
          <div className="login_link">
            <a href="#" className="login_link_single" >
              Sign Up
            </a>
            <a href="#" className="login_link_single" >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
