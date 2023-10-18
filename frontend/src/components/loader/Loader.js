// Import the necessary modules from the React library.
// Import the loader image that will be shown when the components are rendered.
// Import the ReactDOM for portal creation which allows rendering components outside the main app's root.
// Import the styles associated with the Loader.
// Use ReactDOM's createPortal method to render the loader outside the main React application root.
// The loader will be rendered inside a div with the id "loader" which should exist somewhere in the public/index.html.
// Define the SpinnerImg component, a simpler loading spinner that doesn't use a portal.



import React from 'react'
import loaderImg from "../../assets/loader.gif"
import ReactDOM  from 'react-dom';
import "./Loader.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  )
}

export const SpinnerImg =()=>{
  <div className="--center-all">
  <img src={loaderImg} alt="Loading..." />
  </div>
}

export default Loader