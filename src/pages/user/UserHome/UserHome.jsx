import React, { useEffect, useState } from "react";
import "./UserHome.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import TryIcon from "@mui/icons-material/Try";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";
import CountUp from "react-countup";
import Slider from "react-slider";
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

const gender = ["unisex", "male", "female"];

const sizeOptions2 = [
   
  { value: "xs", label: "X-Small" },
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "X-Large" },
  { value: "xxl", label: "XX-Large" },
  { value: "xxxl", label: "XXX-Large" },
  { value: "4xl", label: "4X-Large" },
  { value: "5xl", label: "5X-Large" },
  { value: "6xl", label: "6X-Large" },

];

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
  const navigate = useNavigate();
  const { screen, user, openRedux } = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [uniqueColors, setUniqueColors] = useState([]);
  const [priceRange, setPriceRange] = React.useState([]);
  const [uniqueQualityStatus,setUniqueQualityStatus]=React.useState([]);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(100);
  const [updatedListingItems, setUpdatedListingItems] =
    React.useState(listingItems);

  const [categoryData, setCategoryData] = useState(() => {
    const localData = window.localStorage.getItem("categoryData");
    return localData ? JSON.parse(localData) : data;
  });
  const [selectedColor, setSelectedColor] = React.useState(null);
  const [selectedGender, setSelectedGender] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [selectedQuality, setSelectedQuality] = React.useState(null);
  function extractUniqueQualityStatus(array) {
    const uniqueQualityStatus = [];
    for (const item of array) {
      if (!uniqueQualityStatus.includes(item.qualityStatus)) {
        uniqueQualityStatus.push(item.qualityStatus);
      }
    }
    return uniqueQualityStatus;
  };

  useEffect(() => {
    // Call the function and update the state with unique qualityStatus values
    const uniqueQualityStatusValues = extractUniqueQualityStatus(listingItems);
    setUniqueQualityStatus(uniqueQualityStatusValues);
  }, [listingItems]);

  // console.log(uniqueQualityStatus)

  const handleGenderChange = (_, newValue) => {
    setSelectedGender(newValue);
  };

  const handleColorChange = (event, newValue) => {
    setSelectedColor(newValue); // Set the selected color when it changes
  };

  useEffect(() => {
    // Extract an array of all prices from the listing items
    const prices = listingItems.map((item) => parseInt(item.priceRange));

    // Calculate the minimum and maximum prices
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setMin(minPrice);
    setMax(maxPrice);

    setPriceRange([minPrice, maxPrice]);

    // Log the results
    console.log("Minimum Price:", minPrice);
    console.log("Maximum Price:", maxPrice);
  }, [listingItems]);

  useEffect(() => {
    // Function to extract unique colors from listingItems
    const extractUniqueColors = () => {
      const colors = [];
      for (const item of listingItems) {
        if (!colors.includes(item.color)) {
          colors.push(item.color);
        }
      }
      return colors;
    };

    // Call the function and update the uniqueColors state
    const extractedColors = extractUniqueColors();
    setUniqueColors(extractedColors);
  }, [listingItems]);

  // console.log(uniqueColors)

  console.log(listingItems);
  const displayItemsStyles =
    screen <= 694
      ? {
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }
      : {
          width: "100%",
          marginTop: "1rem",
          gridGap: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
        };

  useEffect(() => {
    setCurrentDate(new Date());
    dispatch(getItemsOnListing());
  }, []);

  // console.log(listingItems)

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

  React.useEffect(() => {
    if (inventoryLoading == false && deleteFavoriteStatus == true) {
      dispatch(inventoryReset());
      const userId = user?.userId;
      dispatch(fetchFavoriteItemsByUser({ userId }));
    }
  }, [inventoryLoading]);

  React.useEffect(() => {
    if (inventoryLoading == false && addFavoriteStatus == true) {
      dispatch(inventoryReset());
      const userId = user?.userId;
      dispatch(fetchFavoriteItemsByUser({ userId }));
    }
  }, [inventoryLoading]);

  const filteredItems = selectedColor
    ? updatedListingItems.filter(
        (item) =>
          item.color.toLowerCase().trim() === selectedColor.toLowerCase().trim()
      )
    : updatedListingItems;

  const filteredItemsByGender = (selectedGender && selectedGender!=="unisex")
    ? filteredItems.filter(
        (item) =>
          item.gender.toLowerCase().trim() ===
          selectedGender.toLowerCase().trim()
      )
    : filteredItems;

 
  // Assuming priceRange is an array [minPrice, maxPrice]
const filteredItemsByPriceRange = priceRange
? filteredItemsByGender.filter(
    (item) =>
      parseInt(item.priceRange) >= priceRange[0] &&
      parseInt(item.priceRange) <= priceRange[1]
  )
: filteredItemsByGender;

const filteredItemsBySize = selectedSize
  ? filteredItemsByPriceRange.filter(
      (item) =>
        item.size.toLowerCase().trim() ===
        selectedSize.value.toLowerCase().trim()
    )
  : filteredItemsByPriceRange;

  const filteredItemsBySizeAndQuality = selectedQuality
  ? filteredItemsBySize.filter(
      (item) =>
        item.qualityStatus.toLowerCase().trim() ===
        selectedQuality.toLowerCase().trim()
    )
  : filteredItemsBySize;

  const itemDisplay = filteredItemsBySizeAndQuality?.map((item, index) => {
    if (item?.activeState == true) {
      return (
        <Card
          key={index}
          item={item}
          noHeart={false}
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

  console.log(priceRange);

  let priceRangeWidth = "400px";
  if (openRedux && screen < 738) {
    priceRangeWidth = "100%";
  } else if (openRedux === false && screen < 440) {
    priceRangeWidth = "100%";
  }

  return (
    <div
      className="user-home"
      style={{ paddingLeft: openRedux && screen > 650 ? "290px" : "1rem" }}
    >
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

       {/* <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: "1.5rem",
          paddingRight: "1rem",
        }}
      >
        <Badge
          badgeContent={favoriteList?.length}
          color="primary"
          sx={{ marginLeft: "auto" }}
        >
          <TryIcon
            style={{ fontSize: "3rem", cursor: "pointer" }}
            onClick={() => navigate("/favorite-items-page")}
          />
        </Badge>
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

      {priceRange && priceRange?.length>=1 && 
      <div style={{display:"flex",justifyContent:"flex-end"}}>
       <div
        style={{
          marginTop: "1rem",
          background: "#ecebf2",
          borderRadius: "10px",
          width: priceRangeWidth,
          padding: "1rem",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            letterSpacing: "0.1rem",
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: "1.2rem",
          }}
        >
          Price Range
        </p>

        <p
          style={{
            fontWeight: "bold",
            letterSpacing: "0.1rem",
            marginTop: "0.2rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Rs. {priceRange[0]} - Rs. {priceRange[1]}
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <Slider
            onChange={setPriceRange}
            className="price-range"
            value={priceRange}
            min={min}
            max={max}
          />
        </div>
      </div>
      </div>}

      <div
        style={{
          // width: "100%",
          // display: "flex",
          // flexDirection: screen < 360 ? "column" : "row",
          // marginTop: "1rem",
          // paddingRight: "1rem",
          width: "100%",
          marginTop: "1rem",
          gridGap: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        }}
      >
        <div
          style={{
            // marginRight: "1.5rem",
            // marginBottom: screen < 360 ? "1rem" : "0rem",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={uniqueColors}
            sx={{ width: 150 }}
            size="small"
            onChange={handleColorChange} // Handle color selection
            value={selectedColor} // Set the value to control the selected color
            renderInput={(params) => (
              <TextField {...params} label="Choose color" />
            )}
          />
        </div>

        <div style={{
          //  marginRight: "1.5rem" 
           }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={gender}
            sx={{ width: 150 }}
            size="small"
            onChange={handleGenderChange} // Handle color selection
            value={selectedGender} // Set the value to control the selected color
            renderInput={(params) => (
              <TextField {...params} label="Choose gender" />
            )}
          />
        </div>

        <div>
        <Autocomplete
    disablePortal
    id="size-combo-box"
    size="small"
    options={sizeOptions2}
    sx={{ width: 150 }}
    value={selectedSize}
    onChange={(event, newValue) => {
      setSelectedSize(newValue);
    }}
    renderInput={(params) => <TextField {...params} label="Size" />}
  />
        </div>

        <div>
        <Autocomplete
    disablePortal
    id="size-combo-box"
    size="small"
    options={uniqueQualityStatus}
    sx={{ width: 150 }}
    value={selectedQuality}
    onChange={(event, newValue) => {
      setSelectedQuality(newValue);
    }}
    renderInput={(params) => <TextField {...params} label="Quality" />}
  />
        </div>
      </div>

    

      {/* <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: "1.5rem",
          paddingRight: "1rem",
        }}
      >
        <Badge
          badgeContent={favoriteList?.length}
          color="primary"
          sx={{ marginLeft: "auto" }}
        >
          <TryIcon
            style={{ fontSize: "3rem", cursor: "pointer" }}
            onClick={() => navigate("/favorite-items-page")}
          />
        </Badge>
      </div> */}

      <div style={displayItemsStyles}>{itemDisplay}</div>
    </div>
  );
};

export default UserHome;
