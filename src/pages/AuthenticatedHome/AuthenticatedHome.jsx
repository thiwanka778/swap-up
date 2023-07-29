import React from 'react';
import "./AuthenticatedHome.css";
import UserHome from '../user/UserHome/UserHome';
import QualityCheckerHome from '../quality_checker/QualityCheckerHome/QualityCheckerHome';
import { useSelector } from 'react-redux';

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
  default:
    componentToRender = <div>Unknown user role</div>;
    break;
}
  

  return (
    <div className='authenticated-home'>
    {componentToRender}
      </div>
  )
}

export default AuthenticatedHome