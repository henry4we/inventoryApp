import React, { useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail, loginUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
// import useLocalStorage from "use-local-storage";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  // const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";

  //   setTheme(newTheme)
  // };
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password:"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block">Login</button>
          </form>
          <Link to="/forgot">Forgot Password</Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; &nbsp; Don't have an account? &nbsp; &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
          {/* <div className='theme-toggle'>
          <h2>Light Theme</h2>
          <i onClick={switchTheme} class='fas fa-toggle-on'></i>
        </div> */}
        </div>
      </Card>
    </div>
  );
};

export default Login;

// import React from "react";
// import styles from "./auth.module.scss";
// import { BiLogIn } from "react-icons/bi";
// import Card from "../../components/card/Card";
// import { Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <div className={`container ${styles.auth}`}>
//       <Card>
//         <div className={styles.form}>
//           <div className="--flex-center">
//             <BiLogIn size={35}  color= '#999'/>
//           </div>
//           <h2>Login</h2>
//           <form>
//             <input type="email"  placeholder="Email" required name="email"/>
//             <input type="password" placeholder="Password"  required name="password"/>
//             <button className="--btn --btn-primary --btn-block">Login</button>
//           </form>
//              <Link to="/forgot">Forgot Password</Link>
//              <span className={styles.register}>
//              <Link to="/">Home</Link>
//                <p> &nbsp; Don't have an account? &nbsp;</p>
//              <Link to="/register">Register</Link>
//              </span>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;
