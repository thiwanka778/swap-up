import React from 'react';
import './SideBar.css';
import { NavLink } from 'react-router-dom';

const SideBarItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const arrowIconClass = open ? 'bi-chevron-up' : 'bi-chevron-down';

  const handleToggle = () => {
    setOpen(!open);
  };

  if (props.item?.children) {
    const subItems = props.item.children.map((item, index) => {
      return <SideBarItem key={index} item={item} />;
    });

    return (
      <div className={open ? 'sidebar-main-item open' : 'sidebar-main-item'}>
        <div className="sidebar-item">
          <span>
            <i style={{ fontSize: '1.2rem' }} className={props.item.icon}></i>
          </span>

          <p className="item-title">{props.item.title}</p>
          <i
            style={{ fontSize: '1.2rem' }}
             onClick={handleToggle}
            className={`bi-chevron-down toggle-btn`}
          ></i>

        </div>

        <div className="side-bar-content" style={{transition:'linear 0.5s'}}>{subItems}</div>

      </div>
    );
  } else {
    return (
      <div className={open ? 'sidebar-main-item open' : 'sidebar-main-item'}>
        <NavLink to={props.item?.path} className="sidebar-item">
          <span>
            <i
              style={{ fontSize: '1.2rem', textDecoration: 'none', color: 'white' }}
              className={props.item.icon}
            ></i>
          </span>

          <p className="item-title" style={{ textDecoration: 'none', color: 'white' }}>
            {props.item.title}
          </p>
        
        </NavLink>
      </div>
    );
  }
};

export default SideBarItem;
