import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
// import useAuth from '../../hooks/useAuth';
import ISignUpInput from '../../interfaces/SignupInput';
import { ADD_USER } from '../../query';
import EyeCloseIcon from '../SVG/EyeCloseIcon';
import EyeOpenIcon from '../SVG/EyeOpenIcon';
import logo from '../../assets/img/logo.png';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/, 'Password can only contain Latin letters.')
        .required(),
    passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();


const Signup: React.FC = () => {

    // const {login, user, loggedIn} = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    // const [confirmPassword, setConfirmPassword] = useState("");
    // Lazy query for login user method
    const [addUser, { loading, data: signUpData, error }] = useMutation(ADD_USER)
  
    const {
      register,
      handleSubmit,
      formState: { errors: validErrors }
    } = useForm<ISignUpInput>({
        resolver: yupResolver(schema)
    });
  
  
    const onSubmit = handleSubmit(async (signUpDatas) => {
        console.log(signUpDatas);
            delete signUpDatas.passwordConfirmation;
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
             <p>{validErrors.username?.message}</p>
             <input
              id="firstName"
              placeholder="firstName"
              className="login_input"
              required
              {...register("firstName")}
            />
            <p>{validErrors.firstName?.message}</p>
             <input
              id="lastName"
              placeholder="lastName"
              className="login_input"
              required
              {...register("lastName")}
            />
            <p>{validErrors.lastName?.message}</p>
             <input
              id="email"
              placeholder="email"
              type="email"
              className="login_input"
              required
              {...register("email")}
            />
            <p>{validErrors.email?.message}</p>
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
            <p>{validErrors.password?.message}</p>
            <div className="login_password">
              <input
                id="passwordConfirmation"
                type={passwordShown ? "text" : "password"}
                required
                placeholder="confirm password"
                className="login_input"
                {...register("passwordConfirmation")}
              />
              <div className={!passwordShown ? "login_password_toggle_button--hidden" : 'login_password_toggle_button'} onClick={togglePassword}><EyeOpenIcon /></div>
              <div className={passwordShown ? "login_password_toggle_button--hidden" : 'login_password_toggle_button'} onClick={togglePassword}><EyeCloseIcon /></div>
            </div>
            <p>{validErrors.passwordConfirmation?.message}</p>
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