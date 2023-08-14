import React, { useEffect, useState } from "react";
import "./UserHome.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import TryIcon from "@mui/icons-material/Try";
import Badge from '@mui/material/Badge';
import CountUp from "react-countup";
// Import Swiper styles
import "swiper/css";
import {
  getItemsOnListing,
  addFavoriteByUser,
  deleteFavoriteItem,
  inventoryReset,
  fetchFavoriteItemsByUser,
} from "../../../redux/inventorySlice";
import Card from "./Card";

const data = [
  {
    id: 1,
    categoryName: "All",
    path: "all",
    isActive: true,
  },
  {
    id: 2,
    categoryName: "Shirt",
    path: "shirt",
    isActive: false,
  },
  {
    id: 3,
    categoryName: "T-shirt",
    path: "t-shirt",
    isActive: false,
  },
  {
    id: 4,
    categoryName: "Skirt",
    path: "skirt",
    isActive: false,
  },
  {
    id: 5,
    categoryName: "Frock",
    path: "frock",
    isActive: false,
  },
  {
    id: 6,
    categoryName: "Party Frock",
    path: "party-frock",
    isActive: false,
  },
  {
    id: 7,
    categoryName: "Jeans",
    path: "jeans",
    isActive: false,
  },
  // {
  //   id:8,
  //   categoryName:"Leggings",
  //   path:"leggings",
  //   isActive:false,
  // },
  // {
  //   id:9,
  //   categoryName:"Mini Skirt",
  //   path:"mini-dresses",
  //   isActive:false,
  // },
  // {
  //   id:10,
  //   categoryName:"Shorts",
  //   path:"shorts",
  // },

  // {
  //   id:11,
  //   categoryName:"Mini Dresses",
  //   path:"mini-dresses",
  // },

  // {
  //   id:12,
  //   categoryName:"Pants",
  //   path:"pants"
  // },
];

function formatDate(date) {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function getDayOfWeek(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

const UserHome = () => {
  const carouselRef = React.useRef(null);
  const dispatch = useDispatch();
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
  const navigate=useNavigate();
  const { screen, user } = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [updatedListingItems, setUpdatedListingItems] =
    React.useState(listingItems);

  const [categoryData, setCategoryData] = useState(() => {
    const localData = window.localStorage.getItem("categoryData");
    return localData ? JSON.parse(localData) : data;
  });

  const displayItemsStyles =
    screen <= 694
      ? {
          width: "100%",
          marginTop: "1.5rem",
          display: "flex",
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

  useEffect(() => {
    setCurrentDate(new Date());
    dispatch(getItemsOnListing());
  }, []);

  const formattedDate = formatDate(currentDate);
  const dayOfWeek = getDayOfWeek(currentDate);

  const categoryClick = (data) => {
    console.log(data);

    setCategoryData((prevState) => {
      let newArray = [];
      for (let i = 0; i < prevState?.length; i++) {
        let currentObject = prevState[i];
        if (currentObject?.id == data?.id) {
          const updatedObject = { ...currentObject, isActive: true };
          newArray.push(updatedObject);
        } else {
          const updatedObject2 = { ...currentObject, isActive: false };
          newArray.push(updatedObject2);
        }
      }
      return [...newArray];
    });
  };

  React.useEffect(() => {
    window.localStorage.setItem("categoryData", JSON.stringify(categoryData));
  }, [categoryData]);

  const categoryDisplay = categoryData?.map((item, index) => {
    return (
      <button
        onClick={() => categoryClick(item)}
        key={index}
        style={{
          border: "2px solid orange",
          minWidth: "120px",
          marginBottom: "1rem",
          fontFamily: " 'Poppins', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.1rem",
          whiteSpace: "nowrap",
          borderRadius: "20px",
          background: item?.isActive == true ? "orange" : "white",
          padding: "6px 12px",
          cursor: "pointer",
          marginRight: "1.5rem",
        }}
      >
        {item?.categoryName}
      </button>
    );
  });

  React.useEffect(() => {
    const getActiveObject = categoryData.find((item) => item?.isActive == true);
    // console.log(getActiveObject);
    if (getActiveObject?.categoryName.toLowerCase() == "all") {
      setUpdatedListingItems(listingItems);
    } else {
      const requiredArray = listingItems?.filter(
        (item) =>
          item?.type?.toLowerCase() ==
          getActiveObject?.categoryName?.toLowerCase()
      );
      setUpdatedListingItems(requiredArray);
    }
  }, [categoryData, listingItems]);

  const addFavoriteClick = (data) => {
    console.log(data);
    const userId = user?.userId;
    const itemId = data?.itemId;
    const findFavoriteItem = favoriteList?.find(
      (item) => item?.itemId == data?.itemId
    );
    console.log(findFavoriteItem, "findFavorite Item");

    if (!findFavoriteItem) {
      dispatch(addFavoriteByUser({ userId, itemId }));
    } else if (findFavoriteItem) {
      dispatch(deleteFavoriteItem({ userId, itemId }));
    }
  };

  React.useEffect(()=>{
    if (inventoryLoading == false && deleteFavoriteStatus == true) {
      dispatch(inventoryReset());
      const userId = user?.userId;
      dispatch(fetchFavoriteItemsByUser({ userId }));
    }
  },[inventoryLoading])

  React.useEffect(() => {
    if (inventoryLoading == false && addFavoriteStatus == true) {
      dispatch(inventoryReset());
      const userId = user?.userId;
      dispatch(fetchFavoriteItemsByUser({ userId }));
    }
  }, [inventoryLoading]);

  const itemDisplay = updatedListingItems?.map((item, index) => {
    if (item?.activeState == true) {
      return (
        <Card
          key={index}
          item={item}
          addFavoriteClick={addFavoriteClick}
          favoriteList={favoriteList}
        />
      );
    }
  });

  React.useEffect(() => {
    const userId = user?.userId;
    dispatch(fetchFavoriteItemsByUser({ userId }));
  }, [user]);

  return (
    <div className="user-home">
      <div
        style={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <p
          style={{
            fontFamily: " 'Poppins', sans-serif",
            fontSize: "1.2rem",
            fontWeight: 600,
            letterSpacing: "0.1rem",
            color: "#00425A",
          }}
        >
          {formattedDate}
        </p>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <p
          style={{
            fontFamily: " 'Poppins', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1rem",
          }}
        >
          {dayOfWeek}
        </p>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: screen < 485 ? "column" : "row",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: screen < 485 ? "0rem" : "2rem",
            marginBottom: screen < 485 ? "1.5rem" : "0rem",
            padding: "1rem",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            justifyContent: "center",
            flexDirection: "column",
            background: "#d3d3db",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "2rem",
              color: "#00425A",
              fontWeight: 500,
            }}
          >
            Total Swaps
          </p>
          <p
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>
              <i className="bi-file-text" style={{ fontSize: "1.5rem" }}></i>
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "30px",
                display: "flex",
                alignItems: "center",
                color: "#00425A",
                fontWeight: 500,
                marginLeft: "0.5rem",
              }}
            >
              <CountUp
                start={0}
                end={85}
                duration={3}
                style={{ fontSize: "2rem" }}
              />
            </span>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            justifyContent: "center",
            flexDirection: "column",
            background: "#d3d3db",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "2rem",
              color: "#00425A",
              fontWeight: 500,
            }}
          >
            Total Collection
          </p>
          <p
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>
              <i
                className="bi-file-earmark-bar-graph"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "2rem",
                color: "#00425A",
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                marginLeft: "0.5rem",
              }}
            >
              <CountUp
                start={0}
                end={70}
                duration={3}
                style={{ fontSize: "2rem" }}
              />
            </span>
          </p>
        </div>
      </div>

      {/* text slider start */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            background: "#d3d3db",
            borderRadius: "10px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.5rem",
              color: "#00425A",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Did you know ?
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.2rem",
              color: "#00425A",
              fontWeight: 500,
            }}
          >
            Manufacturing a cotton shirt produces the same amount of emissions
            as driving 35 miles in a car.
          </p>
        </div>
      </div>

      {/* text slider end */}

      {/* <div style={{width:"100%",marginTop:"2.5rem",
display:"flex",alignItems:"center",
justifyContent:"center",paddingLeft:screen<588?"0":"3%"}}>
<Carousel/>
</div> */}



      <div
        style={{
          width: "100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="custom-scrollbar"
          style={{
            marginTop: "2rem",

            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "auto",
          }}
        >
          {categoryDisplay}
        </div>
      </div>

      {/* favo rite button*/}  
       
      
      <div style={{width:"100%",display:"flex",alignItems:"center",
      justifyContent:"flex-end",marginTop:"1rem",paddingRight:"1rem"}}>
        <Badge badgeContent={favoriteList?.length} color="primary">
 <TryIcon style={{fontSize:"3rem",cursor:"pointer"}} onClick={()=>navigate("/favorite-items-page")}/>
 </Badge>
</div>

      <div style={displayItemsStyles}>
        {itemDisplay}</div>
    </div>
  );
};

export default UserHome;
