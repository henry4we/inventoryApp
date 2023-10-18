// IMPORT the necessary tools and functions:
// useSelector hook from react-redux to extract data from the Redux store.
// selectIsLoggedIn function from the authSlice to get the user's logged-in status.
// Define a component named "ShowOnLogin".
// Use the useSelector hook to get the value of the logged-in state using the "selectIsLoggedIn" selector.
// Use the useSelector hook to get the value of the logged-in state using the "selectIsLoggedIn" selector.
// Check if the user is logged in.
// If user is logged in, render the child components passed to "ShowOnLogin".
// If user is not logged in, don't render anything.
// Define a component named "ShowOnLogout".
// Similarly, use the useSelector hook to get the value of the logged-in state.
// Check if the user is NOT logged in.
// If user is not logged in, render the child components passed to "ShowOnLogout".
// If user is logged in, don't render anything.

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};
