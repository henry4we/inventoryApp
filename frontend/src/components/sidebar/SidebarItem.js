//  steps
// 1 import the react arrow  icon  and useState : expandMenu set use state to false
// 2 declare two prop : item isOpen
// 3

// import React, {useState} from "react";
// import { MdKeyboardArrowRight } from "react-icons/md";

// const SidebarItem = ({ item, isOpen }) => {
//     const [expandMenu, setExpandMenu] = useState(false)

//   // Check if the sidebar item has sub-items or "children"
//   if (item.childrens) {
//     return (
//     <div className={expandMenu ? "sidebar-item s-parent open " : "sidebar-item s-parent"}>
//          <div className="sidebar-title">
//           <span>
//             {item.icon && <div className="icons"></div> }
//           </span>
//          </div>

//     </div>

//     );
//   } else {
//     return <div>SidebarItem</div>;
//   }
// };

// export default SidebarItem;

import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? "active" : "link");
const activeSublink = ({ isActive }) => (isActive ? "active" : "link");

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icon  "> {item.icon}</div>}
            {isOpen && <div>{item.title}</div>}
          </span>

          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={() => setExpandMenu(!expandMenu)}
          />
        </div>

        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className="s-child">
                <NavLink to={child.path} className={activeSublink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      <span>
                        {child.icon && (
                          <div className="icon"> {child.icon}</div>
                        )}
                        {isOpen && <div> {child.title}</div>}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon"> {item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;

