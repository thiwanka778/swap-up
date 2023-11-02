import React, { useState } from "react";
import "./ItemViewPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemsOnListing } from "../../../redux/inventorySlice";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Divider } from "@mui/material";
import { Modal, Checkbox } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Magnifier from "react-magnifier";
import { nanoid } from "nanoid";
import { getSubscribedDetail, getValidTokens, requestSwap } from "../../../redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import WarningToast from "../../../components/warningToast/WarningToast";

const ItemViewPage = () => {
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const {
    screen,
    openRedux,
    requestSwapStatus,
    userLoading,
    getValidTokenArray,
    user,
    subData,
  } = useSelector((state) => state.user);
  const navigate=useNavigate();
  const { listingItems } = useSelector((state) => state.inventory);
  const [item, setItem] = useState({});
  const [imagesArray, setImagesArray] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [error,setError]=React.useState("");
  const [showModal,setShowModal]=React.useState(false);


  console.log(subData)
  React.useEffect(() => {
    dispatch(getValidTokens(user?.userId));
  }, [user]);

  console.log("getValidTokenArray : ", getValidTokenArray);

  React.useEffect(() => {
    dispatch(getItemsOnListing());
  }, [id]);

  React.useEffect(() => {
    const findObject = listingItems?.find((item) => item?.itemId == id);
    const imageArray = findObject?.imageURL
      ? JSON.parse(findObject?.imageURL)
      : [];
    const requiredObject = { ...findObject, imageURL: imageArray };
    setItem(requiredObject);
  }, [id, listingItems]);

  React.useEffect(() => {
    // console.log(item?.imageURL,"BNULLA");
    if (item?.imageURL?.length > 0) {
      const newArray = item?.imageURL?.map((item, index) => {
        const requiredObject = {
          id: index + 1,
          image: item,
        };
        return requiredObject;
      });

      setImagesArray(newArray);
    }
  }, [item]);

  React.useEffect(() => {
    if (item?.imageURL?.length > 0) {
      setPreviewImage(item?.imageURL[0]);
    }
  }, [item]);

  // console.log(item, "item balla", imagesArray);

  const viewImageClick = (id) => {
    console.log(id);
    const findObject = imagesArray.find((item) => item?.id == id);
    setPreviewImage(findObject?.image);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const swapClick = () => {
    if(subData?.subscribed){
      setIsModalOpen(true);
    }else{
      toast.custom(<WarningToast message={"Unable to swap. please subscribe"}/>)
     
    }
    
  };
  const onChangeActiveStatus = (e) => {
    const newValue = e.target.checked;
    setIsActive(newValue);
  };

  React.useEffect(()=>{
    if(user?.role==="CUSTOMER"){
      dispatch(getSubscribedDetail(user?.userId))
    }
  
  },[user])

  const swapClickFinal=(data)=>{
      setError("");
    if(data?.price>=item?.price){
      console.log(data)
      const integer = parseInt(id, 10);
      const payload={
        customerId:user?.userId,
        itemId:integer,
        tokenId: data?.tokenId,
      }
  
      dispatch(requestSwap({...payload}))
    }else{
      setError("Token price is not enough")
    }

    
  }

  React.useEffect(()=>{
       if(userLoading ===false && requestSwapStatus===true){
        //  toast.success("You have swapped successfully !")
        setShowModal(true);
          // navigate("/")
         setIsModalOpen(false);
       }
  },[userLoading])

  const handleCancel2=()=>{
    setShowModal(false);
    navigate("/")
  }

  if (previewImage !== "") {
    return (
      <>
        <div
          className="item-view-page"
          style={{ paddingLeft: openRedux && screen > 650 ? "280px" : "1rem" }}
        >
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              width: "100%",
              flexDirection: screen < 750 ? "column" : "row",
            }}
          >
            <section
              style={{
                width: screen < 750 ? "100%" : "50%",
                padding: "0.2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // background:"yellow"
              }}
            >
              <div
                style={{
                  width: screen < 500 ? "100%" : "500px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {/* <img
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  }}
                  src={previewImage}
                  alt="item"
                /> */}
                <Magnifier
                  style={{
                    borderRadius: "10px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  }}
                  src={previewImage}
                  width={"100%"}
                  mgWidth={150}
                  mgHeight={150}
                />

                {/* <div
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    display: "flex",
                    
                  }}
                >
                  {imagesArray?.map((item) => {
                    // const itemId = item?.image == previewImage ? item?.id : "";
                    const itemId = item?.image === previewImage ? item?.id : "";
               
                    return (
                      <img
                        onMouseOver={() => viewImageClick(item?.id)}
                        style={{
                          width:screen < 366 ? "50px" : "100px",
                          height: screen < 366 ? "50px" : "100px",
                          marginRight: "1rem",
                          borderRadius: "8px",
                          opacity: item?.id == itemId ? "1" : "0.5",
                          border: "1px solid #e0895a",
                          cursor: "pointer",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                           padding:"0.3rem"
                        }}
                        key={item?.id}
                        src={item?.image}
                        alt="item-preview-image"
                      />
                    );
                  })}
                </div> */}
              </div>
            </section>

            <section
              style={{
                width: screen < 750 ? "100%" : "50%",
                padding: "0.2rem",
                // background:"red",
                paddingLeft: screen < 750 ? "0.2rem" : "2rem",
                marginTop: screen < 750 ? "1rem" : "0rem",
              }}
            >
              {screen < 750 && (
                <div
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1.5rem",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(102px,1fr))",
                    gridGap: "5px",
                  }}
                >
                  {imagesArray?.map((item) => {
                    // const itemId = item?.image == previewImage ? item?.id : "";
                    const itemId = item?.image === previewImage ? item?.id : "";

                    return (
                      <img
                        onMouseOver={() => viewImageClick(item?.id)}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "1rem",
                          borderRadius: "8px",
                          opacity: item?.id == itemId ? "1" : "0.5",
                          border: "1px solid #e0895a",
                          cursor: "pointer",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          //  padding:"0.3rem",
                          padding: "5px",
                        }}
                        key={item?.id}
                        src={item?.image}
                        alt="item-preview-image"
                      />
                    );
                  })}
                </div>
              )}
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "10px",
                  // background: "#edeff5",
                  width: "fit-content",
                  // boxShadow:
                  //   "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                }}
              >
                <p
                  style={{
                    fontSize: "1.8rem",
                    fontFamily: " 'Poppins', sans-serif",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item?.type}
                </p>
                <Divider />
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "'Roboto', sans-serif",
                    marginBottom: "0.3rem",
                    marginTop: "0.3rem",
                  }}
                >
                  whimsical, ethereal wedding gown, designed to make brides feel
                  like princesses on their special day.
                </p>
                <Divider />
                <p
                  style={{
                    fontSize: "2rem",
                    fontFamily: "'Ubuntu', sans-serif",
                    marginBottom: "0.3rem",
                    marginTop: "0.3rem",
                    color: "red",
                  }}
                >
                  Rs. {item?.price}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    fontFamily: "'Roboto', sans-serif",
                    color: "gray",
                  }}
                >
                  Small
                </p>
              </div>

              <button
                onClick={swapClick}
                className="swap-button"
                style={{ marginTop: "1.5rem" }}
              >
                Swap
              </button>

              {screen >= 750 && (
                <div
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(102px,1fr))",
                    gridGap: "5px",
                  }}
                >
                  {imagesArray?.map((item) => {
                    // const itemId = item?.image == previewImage ? item?.id : "";
                    const itemId = item?.image === previewImage ? item?.id : "";

                    return (
                      <img
                        onMouseOver={() => viewImageClick(item?.id)}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "1rem",
                          borderRadius: "8px",
                          opacity: item?.id == itemId ? "1" : "0.5",
                          border: "1px solid #e0895a",
                          cursor: "pointer",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          //  padding:"0.3rem",
                          padding: "5px",
                        }}
                        key={item?.id}
                        src={item?.image}
                        alt="item-preview-image"
                      />
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>

        <Modal
          title={
            <h2
              style={{
                color: "#00425A",
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Acknowledgement
            </h2>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          zIndex={50000}
        >
          <div style={{ width: "100%" }}>
            <p style={{color:"red",marginBottom:"0.5rem",fontFamily:" 'Poppins', sans-serif",fontWeight:"bold"}}>{error}</p>
            <div style={{ width: "100%", display: "flex" }}>
              <div>
                <Checkbox onChange={onChangeActiveStatus} checked={isActive}>
                  {" "}
                </Checkbox>
              </div>
              <span
                style={{
                  fontFamily: "'Ubuntu', sans-serif",
                  fontWeight: "bold",
                }}
              >
                By using our platform, you acknowledge that you have the
                flexibility to choose clothing items with a total value equal to
                or less than the tokens you possess. Please note, when you take
                another item with a value less than your token amount, the value
                of the clothes you've already taken will be deducted from your
                original token balance. Your maximum allowed value for
                additional swaps will be equal to your remaining token balance.
                Do you agree to these terms?
              </span>
            </div>

            {/* <button
              className="swap-button-proceed"
              style={{ marginTop: "1rem" }}
            >
              Proceed
            </button> */}

           {isActive && <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {getValidTokenArray?.map((item, index) => {
                return (
                  // <button className="token-button" style={{marginTop:"0.5rem"}}>Rs. {item?.price}</button>
                  <button  onClick={()=>swapClickFinal(item)}
                    className="swap-button-proceed"
                    style={{ marginTop: "1rem" }}
                  >
                    Rs. {item?.price}
                  </button>
                );
              })}
            </div>}
          </div>
        </Modal>


        <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          custom: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />



<Modal
       title="" 
       footer={null}
       open={showModal} 
       onOk={handleOk} 
       centered={true}
       closable={false}
       zIndex={50000}
       >
         <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",
         flexDirection:"column"}}>
         <AiOutlineCheckCircle size={80} style={{ color: "green" }} />
           <p style={{fontSize:"1.5rem",letterSpacing:"0.1rem",color:"green",textAlign:"center"}}>
            Successfully swapped !
            </p>
            {/* <p>Go and check your inbox</p> */}
           <button onClick={handleCancel2} 
           className="rs-modal-btn" style={{marginTop:"0.5rem"}}>OKAY</button>
         </div>
     
      </Modal>
      </>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="item-view-page"
      >
        <div id="wifi-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
            <circle className="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className="circle-middle" viewBox="0 0 60 60">
            <circle className="back" cx="30" cy="30" r="27"></circle>
            <circle className="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className="circle-inner" viewBox="0 0 34 34">
            <circle className="back" cx="17" cy="17" r="14"></circle>
            <circle className="front" cx="17" cy="17" r="14"></circle>
          </svg>
        </div>
      </div>
    );
  }
};

export default ItemViewPage;
