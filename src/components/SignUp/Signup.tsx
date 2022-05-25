import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
// import useAuth from '../../hooks/useAuth';
import ISignUpInput from '../../interfaces/SignupInput';
import { ADD_USER } from '../../query';
import EyeCloseIcon from '../SVG/EyeCloseIcon';
import EyeOpenIcon from '../SVG/EyeOpenIcon';
import logo from '../../assets/img/logo.png';



const Signup: React.FC = () => {

    // const {login, user, loggedIn} = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    // const [confirmPassword, setConfirmPassword] = useState("");
    // Lazy query for login user method
    const [addUser, { loading, data: signUpData, error }] = useMutation(ADD_USER)
  
    const {
      register,
      handleSubmit,
    } = useForm<ISignUpInput>()
  
  
    const onSubmit = handleSubmit(async (signUpDatas) => {
        console.log(signUpDatas);
           addUser({variables: { data: signUpDatas }}).then((res) => {
    //     //  login(res.data.loginUser.token);
         console.log(res);
      });
    });
  
    if (loading) return <h2>it is loading my dudes!!!...</h2>;
    if (error) return <h2>{`Error: ${error}`}</h2>;
    // if (loginData) {
      // localStorage.setItem("token", loginData.loginUser.token);
      // console.log(loginData)
    // };
  
    const togglePassword = () => {
      setPasswordShown(!passwordShown);
    };
  
  
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
            <input
              id="username"
              placeholder="username"
              className="login_input"
              required
              {...register("username")}
            />
             <input
              id="firstName"
              placeholder="firstName"
              className="login_input"
              required
              {...register("firstName")}
            />
             <input
              id="lastName"
              placeholder="lastName"
              className="login_input"
              required
              {...register("lastName")}
            />
             <input
              id="email"
              placeholder="email"
              type="email"
              className="login_input"
              required
              {...register("email")}
            />
            <div className="login_password">
              <input
                id="password"
                type={passwordShown ? "text" : "password"}
                required
                placeholder="password"
                className="login_input"
                {...register("password")}
              />
              <div className={!passwordShown ? "login_password_toggle_button--hidden" : 'login_password_toggle_button'} onClick={togglePassword}><EyeOpenIcon /></div>
              <div className={passwordShown ? "login_password_toggle_button--hidden" : 'login_password_toggle_button'} onClick={togglePassword}><EyeCloseIcon /></div>
            </div>
            {/* <div className="login_password">
              <input
                id="confirmPassword"
                type={passwordShown ? "text" : "password"}
                required
                placeholder="confirm password"
                className="login_input"
                onChange={(e) => setConfirmPassword(e.target.value)}
                // {...register("password")}
              />
              <div className={!passwordShown ? "login_password_toggle_button--hidden" : 'login_password_toggle_button'} onClick={togglePassword}><EyeOpenIcon /></div>
              <div className={passwordShown ? "login_password_toggle_button--hidden" : 'login_password_toggle_button'} onClick={togglePassword}><EyeCloseIcon /></div>
            </div> */}
            <button type="submit" className="login_submit">
              Login
            </button>
            <div className="login_link">
              <a href="#" className="login_link_single">
                Sign Up
              </a>
              {/* <a href="#" className="login_link_single">
                Forgot Password?
              </a> */}
            </div>
          </form>
        </div>
      </>
    )
}
export default Signup;