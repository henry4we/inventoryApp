// Import React and useState hook for component-level state management.
//   Importing CSS styles specific for this component.
//   Import mail icon from React icons library.
//  Import Card component.
//   Import Link for routing within React.
//   Import utility functions.
//   Import toast for notifications.

//   useState hook for email state and its setter function.
//     Function to handle the forgot password process.
//     Prevents the default form submission behavior.
//        Validations for the entered email.
//        Notify if no email is provided.
//         Notify if the entered email is invalid.
//       Object to hold email data.
//       Call the service function to perform forgot password operation.
//       Reset the email input field.
//       On change of value, update the email state.

import React, { useState } from "react";
import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword ,validateEmail} from '../../services/authService';




const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot =  async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please Enter an email address");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    }
    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>

            <div className={styles.links}>
              <p>
                <Link to="/">-Home</Link>
              </p>

              <p>
                <Link to="/login">-Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;

