// **Outlined Pseudo Code:**

// 1. Import required libraries, modules, styles, and assets.
// 2. Define `Sidebar` component that accepts a prop called `children`.
// 3. Inside the component:
//     - Initialize state `isOpen` to `true` (meaning the sidebar starts opened by default).
//     - Define a function `toggle` to toggle the value of `isOpen`.
//     - Use the `useNavigate` hook to get the `navigate` function for changing routes.
//     - Define a function `goHome` to navigate to the root (`/`) route.
//     - Render the component layout:
//         a. Create the main container with class `layout`.
//         b. Define the sidebar with its width controlled by `isOpen`.
//         c. Inside the sidebar:
//             i. Create the top section containing:
//                 1. The product logo, which when clicked, takes the user to the homepage.
//                 2. The menu toggle button which, when clicked, toggles the state of the sidebar.
//             ii. Iterate over the `menu` data to render each sidebar item.
//         d. Define the main content area which adjusts its left padding based on the `isOpen` state. Render the passed-in children here.
// 4. Export the `Sidebar` component.

import React, {useState} from 'react'
import "./Sidebar.scss"
import {HiMenuAlt3} from "react-icons/hi"
import {RiProductHuntLine} from "react-icons/ri"
import menu from "../../data/sidebar"
import SidebarItem from "./SidebarItem"
import { useNavigate } from 'react-router-dom';

const Sidebar = ({children}) => {
  const [isOpen , setIsOpen] = useState(true)
  const toggle = ()=> setIsOpen(!isOpen)
  const navigate = useNavigate();

  const goHome =()=>{
    navigate("/")
  }


  return (
    <div className='layout'>
      <div className="sidebar" style={{width: isOpen ? "230px" : "60px"}}>
      <div className="top_section">
           <div className="logo" style={{display: isOpen ? "block" : "none"}}>
           <RiProductHuntLine size={35} style={{cursor: "pointer"}} onClick={goHome}/>
           </div>
           <div className="bars" style={{marginLeft: isOpen ? "100px" : "0px"}}>
            <HiMenuAlt3 style={{cursor: "pointer"}} onClick={toggle}/>
           </div>

      </div>
       {menu.map((item, index)=>{
       return  <SidebarItem key={index} item={item} isOpen={isOpen}/>
       })}
      </div>
    <main style={{paddingLeft : isOpen ? "230px" : "60px" , transition:"all 5s"}}>
      {children}
    </main>
    </div>
  )
}

export default Sidebar









// import React, {useState } from 'react'
// import "./Sidebar.scss";
// import {HiMenuAlt3} from "react-icons/hi"
// import {RiProductHuntLine} from "react-icons/ri"
// import { useNavigate } from 'react-router-dom'
// import menu from "../../data/sidebar"
// import SidebarItem from "./SidebarItem"



// const Sidebar = ({children}) => {

//   const [isOpen , setIsOpen] = useState(true,)
//   const toggle = ()=> setIsOpen(!isOpen)
//   const  navigate = useNavigate();

//   const goHome = () => {
//     navigate("/")
//   }
//   return (
//     <div className='layout'>
//         <div className="sidebar " style={{width: isOpen ? "230px" :  "60px"}}>
//           <div className="top_section">

//           <div className="logo" style={{display: isOpen ? "block" : "none"}}>
//           <RiProductHuntLine size={35} style={{cursor: "pointer"}} onClick={goHome} />
//           </div>

//           <div className="bars" style={{marginLeft: isOpen ? "100px" : "0px"}}>
//             <HiMenuAlt3 onClick={toggle}/>
//           </div>
//           </div>

//           {menu.map((item, index)=>{
//               return <SidebarItem key={index} item={item} isOpen={isOpen}/>
//           })}
//           </div>
        
//           <main style={{paddingLeft: isOpen ? "230px" : "60px" , transition: "all .5s"}}>
//             {children}
//           </main>
      
//     </div>
//   )
// }

// export default Sidebar


























