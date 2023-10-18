// Import necessary libraries, components, styles, and functions
// Initial form state
// Redux dispatch and router navigation hooks
// Local state for loading and form data
// Destructure form data for easy access
// Function to handle form input changes
// Function to handle user registration
// Prevent default form submission
// Form validation checks
// Prepare user data for registration
// Start loading animation
// Update global state with user details
// Navigate to dashboard upon successful registration
// Stop loading animation
// Reset loading state in case of an error
// Render the registration form

// my steps

// Import necessary libraries, components, styles, and functions
// Render the registration form
// create a Form data usestate
// Destructuring form data for easier usage
// Handle form inputs changes
// Initial form state to empty object
// Prevent default form submission behavior for registration by creating a function
// Validate form inputs:
// import Services functions related to authentication
// Toast notifications library for better UX: import { toast } from "react-toastify";
// If validation passes, construct the user data
// Set loading state to true (show loader)
// State to handle loader display :const [isLoading, setIsLoading] = useState(false);
//using try catch set both   setIsLoading(false);
// Hook to programmatically navigate : const navigate = useNavigate();
// To dispatch Redux actions:  const dispatch = useDispatch();
// Set the user as logged in  await dispatch(SET_LOGIN(true));
// Set the user's name  await dispatch(SET_NAME(data.name));
//import SET_LOGIN and SET_NAME
// Navigate to the dashboard after successful registration
// import Component to show a loading spinner
// Show the loader if 'isLoading' is true

import React, { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loading  from "../../components/loader/Loader"


const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);

  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  
  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("password does match");
    }

    const userData = {
      name,
      email,
      password,
      password2,
    }
  


    setIsLoading(true);

    try {
      const data = await registerUser(userData)
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
      {isLoading && <Loading/>}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name:"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email:"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="password:"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password:"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; &nbsp; Already have an account? &nbsp; &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;

