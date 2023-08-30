import React from 'react';
import "./UserHome.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector,useDispatch } from 'react-redux';
import { fetchFavoriteItemsByUser } from '../../../redux/inventorySlice';


const sizeOptions2 = [
   
  { value: "xs", label: "X-Small (XS)" },
  { value: "s", label: "Small (S)" },
  { value: "m", label: "Medium (M)" },
  { value: "l", label: "Large (L)" },
  { value: "xl", label: "X-Large (XL)" },
  { value: "xxl", label: "XX-Large (XXL)" },
  { value: "xxxl", label: "XXX-Large (XXXL)" },
  { value: "4xl", label: "4X-Large (4XL)" },
  { value: "5xl", label: "5X-Large (5XL)" },
  { value: "6xl", label: "6X-Large (6XL)" },

];

const Card = (props) => {
  const dispatch=useDispatch();
  const {screen,user}=useSelector((state)=>state.user);
  const {favoriteList}=useSelector((state)=>state.inventory);



const requiredObject=sizeOptions2.find((item)=>item?.value?.toLowerCase()==props.item.size.toLowerCase());
// console.log(favoriteList,"CARD PAGE");

const addFavoriteLocalClick=(data)=>{
  props.addFavoriteClick(data)
}

const oneFavoriteObject=favoriteList?.find((item)=>item.itemId==props.item.itemId);


  return (
    <div style={{width:screen<=694?"100%":"320px",padding:"1.5rem", margin: screen<=694? "0.5rem":"0rem",
    display:"flex",flexDirection:"column",
    borderRadius:"10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px ",
    alignItems:'center'}}>
        <img src={props.item.imageURL}
         style={{width:"100%",borderRadius:"10px",}}/>

         <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
          <p>{requiredObject?.label}</p>
         </div>

         <div style={{width:"100%",display:"flex",
         alignItems:"center",marginTop:"auto",
         justifyContent:"flex-start",}}>
          <p style={{fontSize:"1.5rem"}}>Rs. {props.item.priceRange}</p>
         </div>

        {props.noHeart==false && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"auto"}}>
               <FavoriteIcon style={{color:oneFavoriteObject?.itemId==props.item.itemId?"red":"gray",fontSize:"2rem",cursor:"pointer"}} 
               onClick={()=>addFavoriteLocalClick(props.item)}/>
         </div>}


        </div>
  )
}

export default Card