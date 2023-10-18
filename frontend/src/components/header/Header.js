// import React from "react";

// const Header = () => {
//   return (
//     <div className="--pad header">
//       <div className="--flex-between">
//         <h3>
//           <span className="--fw-thin"> Welcome,</span>
//           <span className="--color-danger"> Henry </span>
//         </h3>
//         <button className="--btn --btn-danger"> Logout </button>
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default Header;







import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import {selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;