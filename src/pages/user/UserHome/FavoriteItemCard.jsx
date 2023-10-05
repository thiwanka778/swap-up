import React from 'react';
import "./UserHome.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector,useDispatch } from 'react-redux';
import { fetchFavoriteItemsByUser, getItemsOnListing } from '../../../redux/inventorySlice';


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

const FavoriteItemCard = (props) => {
  const dispatch=useDispatch();
  const {screen,user}=useSelector((state)=>state.user);
  const {favoriteList,listingItems}=useSelector((state)=>state.inventory);

  React.useEffect(() => {
    
    dispatch(getItemsOnListing());
  }, []);
const itemPriceObject=listingItems?.find((item)=>item?.itemId==props.item?.itemId)
const requiredObject=sizeOptions2.find((item)=>item?.value?.toLowerCase()==props.item.size.toLowerCase());





  return (
    <div style={{width:screen<=694?"100%":"320px",padding:"1.5rem", margin: "1rem",
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
          <p style={{fontSize:"1.5rem"}}>Rs. {itemPriceObject?.price}</p>
         </div>

         <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",}}>
               <FavoriteIcon
               onClick={()=>props.deleteFavoriteItemClick(props.item)}
                style={{color:"red",fontSize:"2rem",cursor:"pointer"}} 
               />
         </div>
        </div>
  )
}

export default FavoriteItemCard;