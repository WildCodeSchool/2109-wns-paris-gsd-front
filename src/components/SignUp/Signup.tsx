import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
// import useAuth from '../../hooks/useAuth';
import ISignUpInput from '../../interfaces/SignupInput';
import { useNavigate, Link } from 'react-router-dom';
import { ADD_USER } from '../../query';
import EyeCloseIcon from '../SVG/EyeCloseIcon';
import EyeOpenIcon from '../SVG/EyeOpenIcon';
import logo from '../../assets/img/logo.png';
import './Signup.scss'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string()
        .min(8,'password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/,'Password must contains a number, an uppercase letter and a special character')
        .required(),
    passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();


const Signup: React.FC = () => {

    // const {login, user, loggedIn} = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // const [confirmPassword, setConfirmPassword] = useState("");
    // Lazy query for login user method
    const [addUser, { loading, data: signUpData, error }] = useMutation(ADD_USER);

    const navigate = useNavigate();

  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors: validErrors }
    } = useForm<ISignUpInput>({
        resolver: yupResolver(schema)
    });
  
  
    const onSubmit = handleSubmit(async (signUpDatas) => {
            delete signUpDatas.passwordConfirmation;
           addUser({variables: { data: signUpDatas }}).then(() => {
           setIsSuccess(true);
           reset({
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
           })
      });
    });
  
    if (loading) return <h2>it is loading !!!...</h2>;
  
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
            <p className="login_error_message">{validErrors.email?.message}</p>
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
            <p className="login_error_message">{validErrors.password?.message}</p>
            <p className="login_error_message">{validErrors.passwordConfirmation?.message}</p>
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
              <p className="login_warning_message">Password must be at least 8 letters long and contains a number, an uppercase letter and a special character</p>
            </div>
            <button type="submit" className="login_submit">
              Login
            </button>
            {error &&  <h2 className="login_error_validation">{`Error: ${error}`}</h2>}
            {isSuccess &&  <Link to={'/'}><h2 className="login_success_validation">Your account has been created you can sign in now</h2></Link>}
          </form>
        </div>
      </>
    )
}
export default Signup;