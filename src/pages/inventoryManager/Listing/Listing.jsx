// import React from "react";
// import "./Listing.css";
// import {  Table, Tag } from "antd";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import { Button, Modal,Select } from "antd";
// import toast, { Toaster } from "react-hot-toast";
// import { Checkbox } from 'antd';
// import { Radio,Space } from 'antd';
// import { AutoComplete } from "antd";
// import { NoEncryption } from "@mui/icons-material";
// import WarningToast from "../../../components/warningToast/WarningToast";
// import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
// import { nanoid } from 'nanoid';
// import { auth } from "../../../firebase";
// import { Input } from 'antd';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import Pagination from '@mui/material/Pagination';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { Form } from "react-router-dom";
// import {useSelector,useDispatch} from "react-redux";
// import { createItemOnListing ,inventoryReset} from "../../../redux/inventorySlice";
// const { Option } = Select;
// const { TextArea } = Input;



// const pStyles = {
//   fontSize: "1rem",
//   fontFamily: "'Inter', sans-serif",
//   fontWeight: "600",
//   letterSpacing: "0.1rem",
//   marginTop:"1rem",
// };

// const inputStyles={
//     marginTop:"0.5rem",
//     borderRadius: '4px',
//     border: '1px solid #d9d9d9',
//     boxShadow: 'none',
//     fontSize: '1rem',
//     padding: '1rem',
//     width: "100%",
//     fontWeight:"500",
//      fontFamily:" 'Poppins', sans-serif",
//      letterSpacing:"0.1rem",
     
// }

// const types=[
   
//     {
//       id:2,
//       categoryName:"Shirt",
//       path:"shirt",
//       isActive:false,
//     },
//     {
//       id:3,
//       categoryName:"T-shirt",
//       path:"t-shirt",
//       isActive:false,
//     },
//     {
//       id:4,
//       categoryName:"Skirt",
//       path:"skirt",
//       isActive:false,
//     },
//     {
//       id:5,
//       categoryName:"Frock",
//       path:"frock",
//       isActive:false,
//     },
//     {
//       id:6,
//       categoryName:"Party Frock",
//       path:"party-frock",
//       isActive:false,
//     },
//     {
//       id:7,
//       categoryName:"Jeans",
//       path:"jeans",
//       isActive:false,
//     },
 

// ];


// const sizeOptions2 = [
   
//     { value: "xs", label: "X-Small (XS)" },
//     { value: "s", label: "Small (S)" },
//     { value: "m", label: "Medium (M)" },
//     { value: "l", label: "Large (L)" },
//     { value: "xl", label: "X-Large (XL)" },
//     { value: "xxl", label: "XX-Large (XXL)" },
//     { value: "xxxl", label: "XXX-Large (XXXL)" },
//     { value: "4xl", label: "4X-Large (4XL)" },
//     { value: "5xl", label: "5X-Large (5XL)" },
//     { value: "6xl", label: "6X-Large (6XL)" },

//   ];
//   const sizeOptions = [
//     { value: "X-Small (XS)" },
//     { value: "Small (S)" },
//     { value: "Medium (M)" },
//     { value: "Large (L)" },
//     { value: "X-Large (XL)" },
//     { value: "XX-Large (XXL)" },
//     { value: "XXX-Large (XXXL)" },
//     { value: "4X-Large (4XL)" },
//     { value: "5X-Large (5XL)" },
//     { value: "6X-Large (6XL)" },
//   ];











// const Listing = () => {
// const dispatch=useDispatch();
//   const {screen}=useSelector((state)=>state.user)
//   const {inventoryLoading,
//     inventoryErrorMessage,
//     inventoryError,
//     inventoryCreateItemStatus,
//     inventoryStatus,}=useSelector((state)=>state.inventory);

//   const storage = getStorage();
//   const itemsPerPage = 10;
//   const [totalPages, setTotalPages] = React.useState(0);
//   const [pageNumber, setPageNumber] = React.useState(1);
//   const [displayItems, setDisplayItems] = React.useState([]);
//   const [isActive, setIsActive] = React.useState(true);
  
//   const [to, setTo] = React.useState(0);

//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [fileArray,setFileArray]=React.useState([]);
//   const [uploadFile,setUploadFile]=React.useState(null);
//   const [progress, setProgress] = React.useState(0);
//   const [validImages,setValidImages]=React.useState("");
//   const [downloadUrlArray,setDownloadUrlArray]=React.useState([]);
//   const [imageLoading,setImageLoading]=React.useState(false);

//   const [isModalOpena, setIsModalOpena] = React.useState(false);
//   const [appealData,setAppealData]=React.useState({});
//   const [gender, setGender] = React.useState("unisex");
//   const [quality, setQuality] = React.useState("good");
//   const [options,setOptions]=React.useState([]);
//   const [dressType,setDressType]=React.useState("");
//   const [dressSize,setDressSize]=React.useState("");
//   const [from,setFrom]=React.useState(0);
//   const [form, setForm] = React.useState({
//     itemTitle:"",
//     priceRange:"",
//     color:"",
//   });


//   const onChangeHandleInput=(event)=>{
// const {name,value}=event.target;
//             setForm((prevState)=>{
//              return {...prevState,[name]:value}
//             })
//   }

//              React.useEffect(()=>{
//                 let newArray=[];
//              newArray=types?.map((item,index)=>{
       
//             return {
                
//                 value:item?.categoryName,
//             }    
      
//             });
    
//     setOptions(newArray);

//   },[types]);

 

//   const showModal = () => {
//     setIsModalOpen(true);
//     setFileArray([]);
//     setValidImages("")
//     setUploadFile(null)
//     setDownloadUrlArray([])
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//     setFileArray([]);
//     setValidImages("")
//     setUploadFile(null)
//     setDownloadUrlArray([])
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setFileArray([]);
//     setValidImages("")
//     setUploadFile(null)
//     setDownloadUrlArray([])
//   };

 


//   const handleFileSelect = (event) => {
   
//   setDownloadUrlArray([])
//     const selectedFiles = event.target.files;
//     const fileNamesArray = [];
//     setUploadFile(selectedFiles);
//     let count=0;
//     // Iterate through the FileList and extract the names of each file
//     for (let i = 0; i < selectedFiles.length; i++) {
//       count=count+1;
//       const fileName = selectedFiles[i].name;
//       fileNamesArray.push(fileName);
//     }

//     if(count>=5){
//       setValidImages("Please select at least 5 images !")
//     }else{
//       setValidImages("");
//     }

//     setFileArray((prevState)=>{
//       return fileNamesArray;
//     })

   
//   };

   

//   const handleUpload = async () => {
//     // console.log('bulla', uploadFile);
//     if (!uploadFile || uploadFile.length < 1) {
//       return;
//     }
  
//     try {
//       setImageLoading(true);
//       const downloadUrls = []; // Array to store the download URLs of the uploaded images
  
//       // Upload each file to Firebase Storage
//       for (let i = 0; i < uploadFile.length; i++) {
//         const file = uploadFile[i];
//         const fileId = nanoid(); // Generate a unique ID for the file using nanoid
//         const storageRef = ref(getStorage(), `images/${fileId}_${file.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);
  
//         // Wait for the file to be uploaded before moving to the next one
//         await uploadTask;
  
//         // Get the download URL of the uploaded file
//         const downloadUrl = await getDownloadURL(storageRef);
  
//         // Add the download URL to the array
//         downloadUrls.push(downloadUrl);
//       }
  
//       // All files have been uploaded
//       // console.log('Files uploaded successfully!');
//       // console.log('Download URLs:', downloadUrls);
//       setImageLoading(false);
//        // Array of download URLs
//        setDownloadUrlArray(downloadUrls);
//     } catch (error) {
//       console.log(error);
//       setImageLoading(false);
//     }
//   };
  
//   const appealClick=(data)=>{
//     // console.log(data)
//     setAppealData(data);
//     setIsModalOpena(true);
//   };

//   const showModala = () => {
//     setIsModalOpena(true);
//   };
//   const handleOka = () => {
//     setIsModalOpena(false);
//   };
//   const handleCancela = () => {
//     setIsModalOpena(false);
//   };
  
  
//   const onChangeGender = (e) => {
//     setGender(e.target.value);
//   };

//   const onChangeQuality = (e) => {
//     setQuality(e.target.value);
//   };
//   const handleChangeType = (event, newValue) => {
//     // console.log('Selected Size:', newValue ? newValue.value : "");
//     setDressType(newValue ? newValue.value : "");
//   };

//   const handleSizeChange = (event, newValue) => {
//     // console.log('Selected Size:', newValue ? newValue.value : "");
//     setDressSize(newValue ? newValue.value : "")
//   };

//   const onChangeActiveStatus = (e) => {
//     const newValue = e.target.checked;
//     setIsActive(newValue);
    
//   };

//   console.log({
//     isActive,
//     dressSize,
//     dressType,
//     gender,
//     quality,
//     ...form,


//   })

//   const onClickSave=()=>{
// if(dressSize=="" || dressType=="" ||
//  form.priceRange=="" || form.color=="" || 
//  downloadUrlArray.length<1){
//     toast.custom(<WarningToast message={"All fields are required !"}/>)

// }else {

//     console.log(gender)
//     const activeState=isActive;
//     const color=form.color;
//     const gender2=gender;
//     const imageURL=downloadUrlArray[0];
//     const priceRange=form.priceRange;
//     const qualityStatus=quality;
//     const type=dressType;
//     const sizeObject=sizeOptions2.find((item)=>item?.label.toLowerCase()==dressSize?.toLowerCase());
//     const size=sizeObject?.value;
   
//     dispatch(createItemOnListing({activeState,color,gender2,imageURL,priceRange,qualityStatus,size,type}))
// }


//   }

//   React.useEffect(()=>{
// if(inventoryLoading==false && inventoryCreateItemStatus==true){
// dispatch(inventoryReset());
// setGender("unisex");
// setDownloadUrlArray([]);
// setQuality("good");
// setFileArray([]);
// setUploadFile(null);
// setForm({
//     itemTitle:"",
//     color:"",
//     priceRange:""
// })
// setIsActive(true);
// }
//   },[inventoryLoading])


 

//   return (
//     <>
//       <div className="swap">
//         <div style={{ width: "100%", alignItems: "center",display:"flex",justifyContent:"center" }}>
//           <p
//             style={{
//               fontFamily: "'Inter', sans-serif",
//               color: "#00425A",
//               fontSize: "1.5rem",
//               fontWeight: "bold",
//               marginTop: "2rem",
//             }}
//           >
//             List Items to be seen 
//           </p>
//         </div>

//         <div style={{ width: "100%", alignItems: "center",display:"flex",justifyContent:"center" }}>
//           <p
//             style={{
//               fontFamily: "'Inter', sans-serif",
//               color: "#00425A",
//               fontSize: "1.2rem",
//               fontWeight: "bold",
//               marginTop: "1rem",
//             }}
//           >
//        Add Items
//           </p>
//         </div>


//         <div style={{width:"100%",
//         display:"flex",marginTop:"1.5rem",
//         padding:"1rem",flexDirection:screen<700?"column":"row"}}>

//             <section 
//             className="custom-scrollbar-inventory-listing"
//             style={{width:screen<700?"100%":"50%",
//             display:"flex",
//             alignItems:"center",
//             overflowY:"auto",
//             flexDirection:"column",
//             paddingRight:screen<401?"0rem":"1.5rem",
//             paddingLeft:screen<401?"0rem":"1.5rem",
            
//             }}>

//                 <div style={{width:"100%"}}>

//                 <div style={{marginTop:"1rem"}}>
// <Checkbox onChange={onChangeActiveStatus} checked={isActive}>Active Status</Checkbox>
// </div>

//                 {/* <p style={pStyles}>Item Title</p>
//                     <Input size="large" 
//                     onChange={onChangeHandleInput}
//                     value={form.itemTitle}
//                     name="itemTitle"
//                     style={{marginTop:"0.5rem",width:"100%"}} placeholder="Item Title"/> */}

//                     <div style={{width:"100%",marginTop:"1.5rem",}}>
// <Autocomplete
//     size="small"
//       disablePortal
//       id="combo-box-demo"
//       options={options}
//       getOptionLabel={(option)=>option.value}
//       sx={{ width: "100%" }}
//       onChange={handleChangeType}
//       renderInput={(params) => <TextField {...params} label="Select dress type" />}
//     />
//   </div>




//   <div style={{width:"100%",marginTop:"1.5rem",}}>
//   <Autocomplete
//     size="small"
//       disablePortal
//       id="combo-box-demo"
//       options={sizeOptions}
//       getOptionLabel={(option)=>option.value}
//       sx={{ width: "100%" }}
//       onChange={handleSizeChange}
//       renderInput={(params) => <TextField {...params} label="Select dress size" />}
//     />
//   </div>


//                     <p style={pStyles}>Item Color</p>
//                     <Input size="large" 
//                     onChange={onChangeHandleInput}
//                     value={form.color}
//                     name="color"
//                     style={{marginTop:"0.5rem",width:"100%"}} placeholder="Item Color"/>



//                     <p style={pStyles}>Price Range</p>
//                     <Input size="large" 
//                       onChange={onChangeHandleInput}
//                       value={form.priceRange}
//                       name="priceRange"
//                      style={{marginTop:"0.5rem",width:"100%"}} 
//                      placeholder="Price Range"/>


//                     <p style={pStyles}>Gender</p>
// <div style={{marginTop:"0.5rem"}}>
// <Radio.Group onChange={onChangeGender} value={gender}>
//       <Space direction="vertical">
//       <Radio value={"unisex"}>Unisex (Both)</Radio>
//       <Radio value={"male"}>Male</Radio>
//       <Radio value={"female"}>Female</Radio>
      
//       </Space>
    
//     </Radio.Group>
// </div>


// <p style={pStyles}>Quality Status</p>
// <div style={{marginTop:"0.5rem"}}>
// <Radio.Group onChange={onChangeQuality} value={quality}>
//       <Space direction="vertical">
//       <Radio value={"high"}>High Quality</Radio>
//       <Radio value={"good"}>Good Quality</Radio>
//       <Radio value={"average"}>Average Quality</Radio>
//       <Radio value={"low"}>Low Quality</Radio>
//       <Radio value={"poor"}>Poor Quality</Radio>
//       </Space>
    
//     </Radio.Group>
// </div>

// <p style={pStyles}>Choose Images</p>

// <label className="custom-file-upload" onChange={handleFileSelect} >
//   <input type="file" multiple />
//   Choose images
// </label>


// <div style={{width:"100%",marginTop:"1rem"}}>

//   {
//     fileArray?.map((item,index)=>{
//       return (
//         <p key={index} 
//         className="custom-scrollbar-filename"
//         style={{overflowX:"auto",marginBottom:"1.5rem"}}>{item}</p>
//       )
//     })
//   }
// </div>

// {fileArray?.length>=1 && <div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem"}}>
// <button className="q-upload-btn" onClick={handleUpload} disabled={downloadUrlArray?.length>=1?true:false}
// >Upload</button>
// </div>}


// <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1rem"}}>
// <button  className="q-submit-btn" onClick={onClickSave}>Save</button>

// </div>


//                     </div>

//             </section>

//             <section
//                    className="custom-scrollbar-inventory-listing"
//              style={{
//                 width:screen<700?"100%":"50%",
//              marginTop:screen<700?"3rem":"0rem",
//             display:"flex",alignItems:"center",
//             flexDirection:"column",overflawY:"auto",
//             paddingLeft:screen<700?"0rem":"1rem",
//         }}>

                     
//                      {downloadUrlArray?.length>=1?<div>
// {
//   downloadUrlArray?.map((item,index)=>{
// return (
//   <img src={item} key={index} style={{width:"100%",
//   marginBottom:"1rem",borderRadius:"8px",
//   boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
// }}/>
// )
//   })
// }
// </div>:
// <div>
// <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"   style={{width:"100%",
//   marginBottom:"1rem",borderRadius:"8px",
//   boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
// }}/></div>}

                    

//             </section>

//          </div>

    
//       </div>



//       <Backdrop
//         sx={{ color: 'gold', zIndex: 1500 }}
//         open={imageLoading}

//       >
//         <CircularProgress color="inherit" size={50} />
//       </Backdrop>

//       <Backdrop
//         sx={{ color: 'blue', zIndex: 1500 }}
//         open={inventoryLoading}

//       >
//         <CircularProgress color="inherit" size={50} />
//       </Backdrop>



//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         gutter={8}
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           // Define default options
//           className: "",
//           duration: 2000,
//           style: {
//             background: "#363636",
//             color: "#fff",
//           },

//           // Default options for specific types
//           success: {
//             duration: 3000,
//             theme: {
//               primary: "green",
//               secondary: "black",
//             },
//           },
//           custom: {
//             duration: 2000,
//             theme: {
//               primary: "green",
//               secondary: "black",
//             },
//           },
//         }}
//       />


//     </>
//   );
// };

// export default Listing;
