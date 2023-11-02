import React from 'react';
import "./FavoriteItemPage.css";
import { useSelector,useDispatch } from 'react-redux';
import { deleteFavoriteItem, fetchFavoriteItemsByUser, inventoryReset } from '../../../redux/inventorySlice';
import FavoriteItemCard from '../UserHome/FavoriteItemCard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';



const FavoriteItemPage = () => {
    const [open, setOpen] = React.useState(false);
    const [deleteData,setDeleteData]=React.useState({});
const dispatch=useDispatch();
const {
    inventoryLoading,
    inventoryErrorMessage,
    inventoryError,
    inventoryCreateItemStatus,
    listingItems,
    addFavoriteStatus,
    favoriteList,
    deleteFavoriteStatus,
    inventoryStatus,
  } = useSelector((state) => state.inventory);
  const { screen, user,openRedux } = useSelector((state) => state.user);
  const itemPriceObject=listingItems?.find((item)=>item?.itemId==deleteData?.itemId);
 
  let imageArray= [];
 
if(itemPriceObject && itemPriceObject?.imageURL && itemPriceObject?.imageURL!=null && itemPriceObject?.imageURL!="undefined" && itemPriceObject?.imageURL!=undefined){
  imageArray =  JSON.parse(itemPriceObject?.imageURL)
}


  const displayItemsStyles =
  screen <= 694
    ? {
        width: "100%",
        marginTop: "1.5rem",
        display: "flex",
        // padding:"1rem",
        paddingLeft:"1rem",
        alignItems: "center",
        flexDirection: "column",
      }
    : {
        width: "100%",
        marginTop: "1.5rem",
        gridGap: "10px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
      };

  React.useEffect(() => {
    const userId = user?.userId;
    dispatch(fetchFavoriteItemsByUser({ userId }));
  }, [user]);

  const deleteFavoriteItemClick=(data)=>{

    const imageArray=JSON.parse(data?.imageURL)
    const requiredObject={...data,imageURL:imageArray}
    setDeleteData(requiredObject);
    // console.log(data);
    // const userId = user?.userId;
    // const itemId = data?.itemId;
    
    //   dispatch(deleteFavoriteItem({ userId, itemId }));
    setOpen(true);
    
      };



      React.useEffect(()=>{
        if (inventoryLoading == false && deleteFavoriteStatus == true) {
          dispatch(inventoryReset());
          setOpen(false);
          const userId = user?.userId;
          dispatch(fetchFavoriteItemsByUser({ userId }));
        }
      },[inventoryLoading])

  const itemDisplay = favoriteList?.map((item, index) => {
    if (item?.activeState == false || item?.activeState==true) {
      return (
        <FavoriteItemCard
          key={index}
          item={item}
          deleteFavoriteItemClick={deleteFavoriteItemClick}
         
        />
      );
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
   
     const userId = user?.userId;
    const itemId = deleteData?.itemId;
    
      dispatch(deleteFavoriteItem({ userId, itemId }));
  
  };



  return (
    <>
    <div className="favorite-item-page" style={{paddingLeft:(openRedux&&screen>650)?"270px":"0rem"}} >

        <div style={{width:"100%",display:"flex",
        alignItems:"center",justifyContent:"center",marginTop:"1.5rem",
        textAlign:"center"}}>
{favoriteList?.length>=1 ?<p  style={{fontSize:"3rem",fontFamily: "'Ubuntu', sans-serif",
color:"gray",letterSpacing:"0.1rem",fontWeight:"bold"}}>Favorite Items ({favoriteList?.length})</p>:
<p  style={{fontSize:"3rem",fontFamily: "'Ubuntu', sans-serif",
color:"gray",letterSpacing:"0.1rem",fontWeight:"bold"}}>No Favorite Items</p>}
        </div>

        <div style={displayItemsStyles}>
        {itemDisplay }
            </div>


        </div>














<div>
<Dialog
style={{zIndex:"15000"}}
        open={open}
        onClose={handleClose}
       
      >
      
        <DialogContent>

            <div style={{width:screen<420?"100%":"300px",display:"flex",flexDirection:"column"}}>
          {imageArray?.length>0 && <img src={imageArray[0]} style={{width:"100%",borderRadius:"6px",}}/>}

           <div style={{marginTop:"0.5rem",display:"flex",
           alignItems:"center",justifyContent:"center",textAlign:"center"}}>
            <p style={{fontSize:"1.2rem",
            fontFamily:" 'Poppins', sans-serif",
            fontWeight:"bold",letterSpacing:"0.1rem",
            color:"#515159"}}>
                Are you sure you want to remove this item from favorite list ?</p>
           </div>
            </div>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} variant="contained" size="small">Yes</Button>
          <Button onClick={handleClose} 
          color="error"
           variant="contained" size="small">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
</div>
     


        </>
  )
}

export default FavoriteItemPage