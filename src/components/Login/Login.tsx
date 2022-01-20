import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../../query'
import { useForm } from 'react-hook-form'
import IFormInput from '../../interfaces/FormInput'
import './Login.scss'
import logo from '../../assets/eee.png'

const Login: React.FC = (): any => {
  // Lazy query for login user method
  const [loginUser, { loading, data: loginData, error }] = useLazyQuery(LOGIN_USER)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit = handleSubmit(async (credentials) => {
    loginUser({variables: { data: credentials }});
  });

  if (loading) return <h2>it is loading my dudes!!!...</h2>;
  if (error) return <h2>{`Error: ${error}`}</h2>;
  if (loginData) console.log(loginData);


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
        <form onSubmit={onSubmit} className="login">
          {/* <div> */}
          <input
            id="username"
            placeholder="username"
            className="login_input"
            required
            {...register("username")}
          />
          <input
            id="password"
            type="password"
            required
            placeholder="password"
            className="login_input"
            {...register("password")}
          />
          {/* </div> */}
          <button type="submit" className="login_submit">
            Login
          </button>
          <div className="login_link">
            <a href="#" className="login_link_single">
              Sign Up
            </a>
            <a href="#" className="login_link_single">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
