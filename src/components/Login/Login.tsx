import { useLazyQuery, useQuery } from '@apollo/client'
import { LOGIN_USER } from '../../query'
import { useEffect } from 'react'
import { useForm } from '../../hooks/hooks'
import { Navigate } from 'react-router-dom'

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
  // Wait for lazy query
  // if (called && loading) return <Loading />

  // Show error message if lazy query fails
  if (error) return console.log(error)

  // Store token if login is successful
  if (data) {
    window.localStorage.setItem('token', data.loginUser)

    // // Redirect to home page
    return <Navigate to="/dashboard" />
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          value={values.username}
          onChange={handleChange}
          autoFocus
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="password"
          onChange={handleChange}
          value={values.password}
        />
        <button type="submit">Login</button>
        <a href="">Sign Up</a>
        <a href="">Forgot Password?</a>
      </form>
    </div>
  )
}

export default Login
