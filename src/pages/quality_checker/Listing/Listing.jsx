import React,{useState} from "react";
import "./Listing.css";
import { Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, Modal, Select } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Checkbox,Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Radio, Space } from "antd";
import { AutoComplete } from "antd";
import { NoEncryption } from "@mui/icons-material";
import WarningToast from "../../../components/warningToast/WarningToast";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { nanoid } from "nanoid";
import { auth } from "../../../firebase";
import { Input } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createItemOnListing,
  inventoryReset,
  getItemsOnListing,
} from "../../../redux/inventorySlice";
import ListingCard from "./ListingCard";
import { acceptQualityCheckerRequest, resetQualityChecker } from "../../../redux/qualityCheckerSlice";
const { Option } = Select;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const pStyles = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop: "1rem",
};

const inputStyles = {
  marginTop: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #d9d9d9",
  boxShadow: "none",
  fontSize: "1rem",
  padding: "1rem",
  width: "100%",
  fontWeight: "500",
  fontFamily: " 'Poppins', sans-serif",
  letterSpacing: "0.1rem",
};

const types = [
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
];

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
const sizeOptions = [
  { value: "X-Small (XS)" },
  { value: "Small (S)" },
  { value: "Medium (M)" },
  { value: "Large (L)" },
  { value: "X-Large (XL)" },
  { value: "XX-Large (XXL)" },
  { value: "XXX-Large (XXXL)" },
  { value: "4X-Large (4XL)" },
  { value: "5X-Large (5XL)" },
  { value: "6X-Large (6XL)" },
];

const Listing = () => {
  const dispatch = useDispatch();
  const { screen ,user} = useSelector((state) => state.user);
  const {acceptRequestStatus,qLoading}=useSelector((state)=>state.qualityChecker)
  const {
    inventoryLoading,
    inventoryErrorMessage,
    inventoryError,
    listingItems,
    inventoryCreateItemStatus,
    inventoryStatus,
  } = useSelector((state) => state.inventory);

  const storage = getStorage();
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [displayItems, setDisplayItems] = React.useState([]);
  const [isActive, setIsActive] = React.useState(true);
  const [to, setTo] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [fileArray, setFileArray] = React.useState([]);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [validImages, setValidImages] = React.useState("");
  const [downloadUrlArray, setDownloadUrlArray] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [isModalOpena, setIsModalOpena] = React.useState(false);
  const [appealData, setAppealData] = React.useState({});
  const [gender, setGender] = React.useState("unisex");
  const [quality, setQuality] = React.useState("good");
  const [options, setOptions] = React.useState([]);
  const [dressType, setDressType] = React.useState("");
  const [dressSize, setDressSize] = React.useState("");
  const [localData,setLocalData]=React.useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [from, setFrom] = React.useState(0);
  const [form, setForm] = React.useState({
    itemTitle: "",
    priceRange: "",
    color: "",
    des:"",
  });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleCancelImage = () => setPreviewOpen(false);

   React.useEffect(()=>{
      const storedData=window.localStorage.getItem("localData");
      if(storedData && storedData!=="undefined" && storedData!==null && storedData!==undefined){
        setLocalData(JSON.parse(storedData))
      }  
   },[])

// console.log("listing local storage data ", localData);
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

  const onChangeHandleInput = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  React.useEffect(()=>{
dispatch(getItemsOnListing())
  },[])

  React.useEffect(() => {
    let newArray = [];
    newArray = types?.map((item, index) => {
      return {
        value: item?.categoryName,
      };
    });

    setOptions(newArray);
  }, [types]);

  const showModal = () => {
    setIsModalOpen(true);
    setFileArray([]);
    setValidImages("");
    setUploadFile(null);
    setDownloadUrlArray([]);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setFileArray([]);
    setValidImages("");
    setUploadFile(null);
    setDownloadUrlArray([]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFileArray([]);
    setValidImages("");
    setUploadFile(null);
    setDownloadUrlArray([]);
  };



  const appealClick = (data) => {
    // console.log(data)
    setAppealData(data);
    setIsModalOpena(true);
  };

  const showModala = () => {
    setIsModalOpena(true);
  };
  const handleOka = () => {
    setIsModalOpena(false);
  };
  const handleCancela = () => {
    setIsModalOpena(false);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeQuality = (e) => {
    setQuality(e.target.value);
  };
  const handleChangeType = (event, newValue) => {
    // console.log('Selected Size:', newValue ? newValue.value : "");
    setDressType(newValue ? newValue.value : "");
  };

  const handleSizeChange = (event, newValue) => {
    // console.log('Selected Size:', newValue ? newValue.value : "");
    setDressSize(newValue ? newValue.value : "");
  };

  const onChangeActiveStatus = (e) => {
    const newValue = e.target.checked;
    setIsActive(newValue);
  };

  console.log({
    isActive,
    dressSize,
    dressType,
    gender,
    quality,
    ...form,
  });

  const onClickSave = () => {
    // toast.success("Created successfully!")
    uploadImagesToFirebase();
  };

  React.useEffect(()=>{
    if(downloadUrlArray.length>=1){
      if (
        dressSize == "" ||
        dressType == "" ||
        form.priceRange == "" ||
        form.color == "" ||
        form.des=="" ||
        downloadUrlArray.length < 1
      ) {
        toast.custom(<WarningToast message={"All fields are required !"} />);
      } else {
        const activeState = isActive;
        const color = form.color;
        const gender2 = gender;
        const imageURL = downloadUrlArray[0];
        const priceRange = form.priceRange;
        const description=form.des;
        const qualityStatus = quality;
        const type = dressType;
        const sizeObject = sizeOptions2.find(
          (item) => item?.label.toLowerCase() == dressSize?.toLowerCase()
        );
        const size = sizeObject?.value;
  
        dispatch(
          acceptQualityCheckerRequest({
            requestTokenId:localData?.requestTokenId,
                  qualityCheckerId:user?.userId,
                  color:color,
                  imageURL:downloadUrlArray[0],
                  gender:gender2,
                  type:type,
                  price:priceRange,
                  size:size,
                  description:description,
          })
        );
      }
    }
    
  },[downloadUrlArray]);

  React.useEffect(()=>{
        if(qLoading===false && acceptRequestStatus===true){
          toast.success("Created successfully!")
          dispatch(resetQualityChecker())
          dispatch(getItemsOnListing());
          setGender("unisex");
          setDownloadUrlArray([]);
          setQuality("good");
          setFileArray([]);
          setUploadFile(null);
          setForm({
            itemTitle: "",
            color: "",
            priceRange: "",
            des:"",
          });
          setIsActive(true);
        }
  },[qLoading])

 

  const itemDisplay = listingItems?.map((item, index) => {
    if (item?.activeState == true) {
      return (
        <ListingCard
          key={index}
          item={item}
          noHeart={true}
          // addFavoriteClick={addFavoriteClick}
          // favoriteList={favoriteList}
        />
      );
    }
  });

  const handleChangeImages = ({ fileList: newFileList }) => {
    // Update the status for each file in the fileList to prevent the "upload error" tooltip.
    const updatedFileList = newFileList.map((file) => {
      if (file) {
        file.status = "done"; // Set status to 'done' for successfully uploaded files.
      }
      return file;
    });

    setFileList(updatedFileList);
  };

  const uploadButtonComponent = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const uploadImagesToFirebase = async () => {
    const urls = []; // Create an array to store download URLs
    if(fileList.length===0){
      return;
    }
    setImageLoading(true);
    await Promise.all(
      fileList.map(async (file) => {
        if (file.status === "done") {
          const uniqueFilename = nanoid();
          const storageRef = ref(getStorage(), `images/${uniqueFilename}`);

          // Upload the file
          await uploadBytes(storageRef, file.originFileObj);

          // Get the download URL for the uploaded file
          const downloadURL = await getDownloadURL(storageRef);
          urls.push(downloadURL); // Add the URL to the array

          console.log(`File uploaded to Firebase Storage: ${downloadURL}`);
        }
      })
    );

    // Set the download URLs in the state
    setDownloadUrlArray(urls);
    setImageLoading(false);
  };

  return (
    <>
      <div className="swap">
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            paddingLeft:"1rem",
            // justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "bold",
              marginTop: "1rem",
              color: "#00425A",
              fontSize: "1.5rem",
            }}
          >
            Accept Item
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            marginTop: "1rem",
            padding: "1rem",
            flexDirection: screen < 914 ? "column" : "row",
          }}
        >
          <section
            className="custom-scrollbar-inventory-listing"
            style={{
              background:"#f7f7fa",
              width: screen < 914 ? "100%" : "50%",
              display: "flex",
              alignItems: "center",
              borderRadius:"20px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" ,
              // overflowY: "auto",
              flexDirection: "column",
              paddingTop:"1.5rem",
              paddingBottom:"1.5rem",
              paddingRight: screen < 401 ? "1rem" : "1.5rem",
              paddingLeft: screen < 401 ? "1rem" : "1.5rem",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ marginTop: "0rem" }}>
                <Checkbox onChange={onChangeActiveStatus} checked={isActive}>
                  Use existing image
                </Checkbox>
              </div>

              {/* <p style={pStyles}>Item Title</p>
                    <Input size="large" 
                    onChange={onChangeHandleInput}
                    value={form.itemTitle}
                    name="itemTitle"
                    style={{marginTop:"0.5rem",width:"100%"}} placeholder="Item Title"/> */}

              <div style={{ width: "100%", marginTop: "1.5rem" }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.value}
                  sx={{ width: "100%" }}
                  onChange={handleChangeType}
                  renderInput={(params) => (
                    <TextField {...params} label="Select dress type" />
                  )}
                />
              </div>

              <div style={{ width: "100%", marginTop: "1.5rem" }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={sizeOptions}
                  getOptionLabel={(option) => option.value}
                  sx={{ width: "100%" }}
                  onChange={handleSizeChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Select dress size" />
                  )}
                />
              </div>

              {/* <p style={pStyles}>Item Color</p>
                    <Input size="large" 
                    onChange={onChangeHandleInput}
                    value={form.color}
                    name="color"
                    style={{marginTop:"0.5rem",width:"100%"}} placeholder="Item Color"/> */}

              <div style={{ width: "100%", marginTop: "1.5rem" }}>
                <TextField
                  id="outlined-basic"
                  label="Dress color"
                  onChange={onChangeHandleInput}
                  value={form.color}
                  name="color"
                  variant="outlined"
                  size="small"
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ width: "100%", marginTop: "1.5rem" }}>
                <TextField
                  id="outlined-basic"
                  label="Price"
                  onChange={onChangeHandleInput}
                  value={form.priceRange}
                  name="priceRange"
                  variant="outlined"
                  size="small"
                  style={{ width: "100%" }}
                />
              </div>


              <div style={{ width: "100%", marginTop: "1.5rem" }}>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  onChange={onChangeHandleInput}
                  value={form.des}
                  name="des"
                  variant="outlined"
                  size="small"
                  style={{ width: "100%" }}
                />
              </div>

              <p style={pStyles}>Gender</p>
              <div style={{ marginTop: "0.5rem" }}>
                <Radio.Group onChange={onChangeGender} value={gender}>
                  <Space direction="vertical">
                    <Radio value={"unisex"}>Unisex (Both)</Radio>
                    <Radio value={"male"}>Male</Radio>
                    <Radio value={"female"}>Female</Radio>
                  </Space>
                </Radio.Group>
              </div>

              {/* <p style={pStyles}>Quality Status</p> */}
              {/* <div style={{ marginTop: "0.5rem" }}>
                <Radio.Group onChange={onChangeQuality} value={quality}>
                  <Space direction="vertical">
                    <Radio value={"high"}>High Quality</Radio>
                    <Radio value={"good"}>Good Quality</Radio>
                    <Radio value={"average"}>Average Quality</Radio>
                    <Radio value={"low"}>Low Quality</Radio>
                    <Radio value={"poor"}>Poor Quality</Radio>
                  </Space>
                </Radio.Group>
              </div> */}
              <div style={{ marginTop: "1rem", }}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangeImages}
            >
              {fileList.length >= 10 ? null : uploadButtonComponent}
            </Upload>
          </div>

                <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                   justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <button className="n-button" onClick={onClickSave}>
                  Save
                </button>
              </div>

            </div>
          </section>

          <section
            className="custom-scrollbar-inventory-listing"
            style={{
              width: screen < 914 ? "100%" : "50%",
              marginTop: screen < 914 ? "1rem" : "0rem",
              display: "flex",
              // alignItems: "center",
              flexDirection: "column",
              // overflawY: "auto",
              paddingLeft: screen < 914 ? "0rem" : "1rem",
            }}
          >
            <div style={{width:"100%",display:"flex",alignItems:"center",
            padding:screen<466?"0rem":"0rem",justifyContent:"center"}}>
               <img src={localData?.itemImage} 
               style={{width:screen<466?"100%":"400px",borderRadius:"10px",
               boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
               }}/>
            </div>
           
         
          </section>
        </div>

        <div style={displayItemsStyles}>{itemDisplay}</div>
      </div>

      <Backdrop sx={{ color: "gold", zIndex: 1500 }} open={imageLoading}>
        <CircularProgress color="inherit" size={50} />
      </Backdrop>

      <Backdrop sx={{ color: "blue", zIndex: 1500 }} open={qLoading}>
        <CircularProgress color="inherit" size={50} />
      </Backdrop>

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
            marginTop:"80px",
            fontFamily:"'Ubuntu', sans-serif",
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
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelImage}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default Listing;
