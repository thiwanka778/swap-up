import React from 'react';
import "./Card.css";
import { FiArrowLeft } from 'react-icons/fi';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const CardHome = ({id,title,description}) => {
  return (
    <div className="myCard">
    <div className="innerCard">
        <div className="frontSide">
            <p className="title" style={{marginBottom:"auto"}}>{title}</p>
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
               <p style={{fontFamily:" 'Poppins', sans-serif",marginRight:"0.8rem"}}>Turn Back</p>
              <KeyboardReturnIcon/>
            </div>
        </div>
        <div className="backSide">
            <p className="card-text">{description}</p>
        </div>
    </div>
</div>
  )
}

export default CardHome