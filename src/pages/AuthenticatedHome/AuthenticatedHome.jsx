import React from 'react';
import "./AuthenticatedHome.css";
import UserHome from '../user/UserHome/UserHome';
import QualityCheckerHome from '../quality_checker/QualityCheckerHome/QualityCheckerHome';
import AdminHome from '../admin/AdminHome/AdminHome';
import { useSelector } from 'react-redux';
import Home from "../Home/Home";

const AuthenticatedHome = () => {

 const {user} =useSelector((state)=>state.user);

 let componentToRender = <div>Unknown user role</div>

switch (user) {
  case "user":
    componentToRender = <UserHome />;
    break;

    case "qualityChecker":
    componentToRender = <QualityCheckerHome />;
    break;

    case "admin":
      componentToRender = <AdminHome />;
      break;

    default:
    componentToRender = <Home/>;
    break;
}
  

  return (
    <div className='authenticated-home'>
    {componentToRender}
      </div>
  )
}

export default AuthenticatedHome