import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/form/form.scss';
import flogo from '../../../public/assets/img/full-logo.png';
import { validateLogin } from '../../../backend/methods/formValidation';
import { loginWithEmail, signInWithGoogle, signInWithApple } from '../../../backend/methods/auth'; // Firebase auth

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await loginWithEmail(formData.email, formData.password);
        navigate("/home"); // redirect after successful login
      } catch (err) {
        console.error(err.message);
        setErrors({ firebase: err.message });
      }
    }
  };

  const handleSignUpClick = () => navigate("/signup");
  const handleLogoClick = () => navigate("/App");


  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (err) {
      console.error(err.message);
      setErrors({ firebase: err.message });
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithApple();
      navigate("/home");
    } catch (err) {
      console.error(err.message);
      setErrors({ firebase: err.message });
    }
  };

  return (
    <section className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <img src={flogo} alt="logo" className="f-logo" onClick={handleLogoClick}/>

        {/* Email */}
        <div className="flex-column"><label>Username/Email </label></div>
        <div className="inputForm">
          <svg style={{ enableBackground: "new 0 0 512 512" }} viewBox="0 0 512 512" height="20" width="20">
            <g>
              <path fill="#595959" d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"/>
            </g>
          </svg>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Enter your Username or Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="error">{errors.email}</div>

        {/* Password */}
        <div className="flex-column"><label>Password </label></div>
        <div className="inputForm" style={{ position: "relative" }}>
          <svg height={20} viewBox="-64 0 512 512" width={20}>
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"/>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"/>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="input"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
          />
          <img
            id="toggle-password"
            src={showPassword ? "/assets/icons/hide.png" : "/assets/icons/show.png"}
            alt="toggle"
            style={{ cursor: "pointer", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px" }}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="error">{errors.password}</div>
        {errors.firebase && <div className="error">{errors.firebase}</div>}

        {/* Remember / Forgot */}
        <div className="flex-row">
          <div><input type="checkbox"/><label>Remember me </label></div>
          <span className="span">Forgot password?</span>
        </div>

        <button type="submit" className="button-submit" style={{ background: "linear-gradient(to right, #4f46e5, #8b5cf6)" }}>Login</button>

        <p className="p">
          Don't have an account? <span className="span" style={{ cursor: "pointer", color: "#2d79f3" }} onClick={handleSignUpClick}>Sign Up</span>
        </p>

        <p className="p line">Or With</p>

        <div className="flex-row">
          <button type="button" className="btn google" onClick={handleGoogleLogin}>
                        <svg
  version="1.1"
  width={20}
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 512 512"
  style={{ enableBackground: "new 0 0 512 512" }}
  xmlSpace="preserve"
>
  <path
    style={{ fill: "#FBBB00" }}
    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
      c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
      C103.821,274.792,107.225,292.797,113.47,309.408z"
  />
  <path
    style={{ fill: "#518EF8" }}
    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
      c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
      c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
  />
  <path
    style={{ fill: "#28B446" }}
    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
      c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
      c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
  />
  <path
    style={{ fill: "#F14336" }}
    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
      c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
      C318.115,0,375.068,22.126,419.404,58.936z"
  />
</svg>
            Google</button>
          <button type="button" className="btn apple" onClick={handleAppleLogin}>
                        <svg
  version="1.1"
  height={20}
  width={20}
  id="Capa_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 22.773 22.773"
  style={{ enableBackground: "new 0 0 22.773 22.773" }}
  xmlSpace="preserve"
>
  <g>
    <g>
      <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
      <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
    </g>
  </g>
</svg>
            Apple</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
