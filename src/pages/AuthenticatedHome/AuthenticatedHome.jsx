import React from 'react';
import "./AuthenticatedHome.css";
import UserHome from '../user/UserHome/UserHome';
import QualityCheckerHome from '../quality_checker/QualityCheckerHome/QualityCheckerHome';
import AdminHome from '../admin/AdminHome/AdminHome';
import { useSelector } from 'react-redux';
import Home from "../Home/Home";
import HelpAssistantHome from '../helpAssistant/HelpAssistantHome/HelpAssistantHome';
import InventoryManagerHome from '../inventoryManager/InventoryManagerHome/InventoryManagerHome';
import QualityCheckAuth from '../quality_checker/QualityCheckAuth/QualityCheckAuth';
import HelpRequest from '../helpAssistant/HelpRequest/HelpRequest';

const AuthenticatedHome = () => {

 const {user} =useSelector((state)=>state.user);

 let componentToRender = <div>Unknown user role</div>

switch (user?.role?.toLowerCase().trim()) {
  case "customer":
    componentToRender = <UserHome />;
    break;

    case "quality_checker":
    componentToRender = <QualityCheckAuth/>;
    break;

    case "admin":
      componentToRender = <AdminHome />;
      break;

      case "inventory_manager":
        componentToRender=<InventoryManagerHome/>;
        break;

        case "help_assistant":
          componentToRender=<HelpRequest/>;
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