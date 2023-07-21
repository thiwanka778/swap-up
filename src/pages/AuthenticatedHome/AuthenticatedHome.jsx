import React from 'react';
import "./AuthenticatedHome.css";
import UserHome from '../user/UserHome/UserHome';

const AuthenticatedHome = () => {
  

  return (
    <div className='authenticated-home'>
     <UserHome/>
      </div>
  )
}

export default AuthenticatedHome