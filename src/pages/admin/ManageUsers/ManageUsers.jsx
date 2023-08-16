import React from "react";
import "./ManageUsers.css";
import { Space, Table, Tag } from "antd";
import Avatar from '@mui/material/Avatar';
import { Outlet ,useNavigate} from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { auth } from "../../../firebase";
import { Input } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { adminReset, fetchAllUsers, putUserOnHold, removeUserHold } from "../../../redux/adminSlice";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
const { TextArea } = Input;

const pStyles = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop:"0.5rem",
};

const p2Styles={
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1rem",
    color:"#626363",
}

const options = [
  {
    value: "Burns Bay Road",
  },
  {
    value: "Downing Street",
  },
  {
    value: "Wall Street",
  },
];


  

const ManageUsers = () => {
  const dispatch=useDispatch();
  const [openu, setOpenu] = React.useState(false);
  const [data,setData]=React.useState([]);
  const {userArrayByAdmin,putOnHoldStatus,adminLoading,removeUserHoldStatus}=useSelector((state)=>state.admin);
  const navigate=useNavigate();
  const [enableData,setEnableData]=React.useState({});

  React.useEffect(()=>{
    const transformedArray = userArrayByAdmin.map((user, index) => {
      return {
        key: index + 1,
        ...user
      };
    });

    setData(transformedArray);
  },[userArrayByAdmin]);

  const columns = [

    {
      title:"USER ID",
      dataIndex:"userId",
      key:"userId"
    },
 

    {
      title: "NAME",
      render:(_,record)=>{
        const fullName=record?.firstName+" "+record?.lastName;
        return (
        <div style={{display:"flex",alignItems:"center",}}>
<Avatar alt={fullName} src={record?.profilePicture} />
<p style={{fontSize:"1rem",fontWeight:"bold",marginLeft:"0.8rem"}}>{fullName}</p>
        </div>
        );
      }
    },
    {
      title:"EMAIL",
      dataIndex:"email",
      key:"email"

    },

    {
      title: "USER TYPE",
      render:(_,record)=>{
        const userType=record?.role;
        const userTypeFormatted = userType
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
        return (
        <div style={{display:"flex",alignItems:"center",}}>
            <p style={{fontSize:"1rem",fontWeight:"bold",marginLeft:"0.8rem"}}>{userTypeFormatted}</p>
        </div>
        );
      }
    },


    {
      title: "ACCOUNT STATUS",
      
      render: (_, record) => {
       
      if(record?.activeStatus){

        return <span onClick={()=>enableClick(record)}
        style={{padding:"3px 6px",border:"3px solid #04db33",color:"#04db33",cursor:"pointer"}}
        >ENABLED</span>
      }else{
        return <span onClick={()=>enableClick(record)}
         style={{padding:"3px 6px",border:"3px solid #ff1605",color:"#ff1605",cursor:"pointer"}} >DISABLED</span>;
      }
  
       
      },
    },

  
    {
      title: "Action",
      render: (_, record) => (
        <span>
            <button className="admin-complaint-view" onClick={()=>navigate(`/view-profile/${record?.userId}`)}
            style={{marginRight:"0.4rem"}}>View</button>
          
        </span>
      ),
    },
  ];

  const storage = getStorage();
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [displayItems, setDisplayItems] = React.useState([]);
  const [from, setFrom] = React.useState(0);
  const [to, setTo] = React.useState(0);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [fileArray,setFileArray]=React.useState([]);
  const [uploadFile,setUploadFile]=React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [validImages,setValidImages]=React.useState("");
  const [downloadUrlArray,setDownloadUrlArray]=React.useState([]);
  const [imageLoading,setImageLoading]=React.useState(false);

  const [isModalOpena, setIsModalOpena] = React.useState(false);
  const [viewData,setViewData]=React.useState({});
  const [filteredData, setFilteredData] = React.useState([]); 

React.useEffect(()=>{
setFilteredData(data);
},[data,userArrayByAdmin])

  const showModal = () => {
    setIsModalOpen(true);
    setFileArray([]);
    setValidImages("")
    setUploadFile(null)
    setDownloadUrlArray([])
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setFileArray([]);
    setValidImages("")
    setUploadFile(null)
    setDownloadUrlArray([])
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setFileArray([]);
    setValidImages("")
    setUploadFile(null)
    setDownloadUrlArray([])
  };


  React.useEffect(()=>{
dispatch(fetchAllUsers())
  },[]);



  React.useEffect(() => {
   
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);

//  console.log("filtered data ",filteredData);


  React.useEffect(() => {
    setDisplayItems((prevState) => {
      const startIndex = pageNumber * itemsPerPage - itemsPerPage;
      const endIndex = pageNumber * itemsPerPage - 1;
      setFrom(startIndex + 1);
      const slicedData = filteredData?.slice(startIndex, endIndex + 1);
      const actualItemsPerPage = slicedData.length;
      const toValue = startIndex + actualItemsPerPage;
      setTo(toValue);
      return slicedData;
    });
  }, [pageNumber,filteredData]);



  const handleFileSelect = (event) => {
   
  setDownloadUrlArray([])
    const selectedFiles = event.target.files;
    const fileNamesArray = [];
    setUploadFile(selectedFiles);
    let count=0;
    // Iterate through the FileList and extract the names of each file
    for (let i = 0; i < selectedFiles.length; i++) {
      count=count+1;
      const fileName = selectedFiles[i].name;
      fileNamesArray.push(fileName);
    }

    if(count>=5){
      setValidImages("Please select at least 5 images !")
    }else{
      setValidImages("");
    }

    setFileArray((prevState)=>{
      return fileNamesArray;
    })

   
  };

   

  const handleUpload = async () => {
    // console.log('bulla', uploadFile);
    if (!uploadFile || uploadFile.length < 1) {
      return;
    }
  
    try {
      setImageLoading(true);
      const downloadUrls = []; // Array to store the download URLs of the uploaded images
  
      // Upload each file to Firebase Storage
      for (let i = 0; i < uploadFile.length; i++) {
        const file = uploadFile[i];
        const fileId = nanoid(); // Generate a unique ID for the file using nanoid
        const storageRef = ref(getStorage(), `images/${fileId}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Wait for the file to be uploaded before moving to the next one
        await uploadTask;
  
        // Get the download URL of the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);
  
        // Add the download URL to the array
        downloadUrls.push(downloadUrl);
      }
  
      // All files have been uploaded
      // console.log('Files uploaded successfully!');
      // console.log('Download URLs:', downloadUrls);
      setImageLoading(false);
       // Array of download URLs
       setDownloadUrlArray(downloadUrls)
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };
  
  const viewClick=(data)=>{
    console.log(data)
    setViewData(data);
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

  const handlePageChange = (event, page) => {
    setPageNumber(page)
  };

  //dialog 
  const handleClickOpenu = () => {
    setOpenu(true);
  };

  const handleCloseu = () => {
    setOpenu(false);
  };

  const handleCloseDisableClick=()=>{
    setOpenu(false);
    const userId=enableData?.userId;
    if(enableData?.activeStatus==true){
      dispatch(putUserOnHold({userId}));
    }else if(enableData?.activeStatus==false){
      console.log("already disabled")
      dispatch(removeUserHold({userId}))
    }
    
  }

  React.useEffect(()=>{
    if(adminLoading==false &&removeUserHoldStatus==true ){
      dispatch(adminReset());
      dispatch(fetchAllUsers());

    }

  },[adminLoading])

  React.useEffect(()=>{

    if(adminLoading==false && putOnHoldStatus==true){
      dispatch(fetchAllUsers());
      dispatch(adminReset())
    }

  },[adminLoading])

  const enableClick=(data)=>{
console.log(data);
setEnableData(data);
setOpenu(true);

  }
  
  
 

  return (
    <>
      <div className="manage-users">

        <div style={{ width: "100%", alignItems: "center",display:"flex",
        justifyContent:"center",marginTop:"2rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Manage Users
          </p>
        </div>

        {/* <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <button className="new-swap-button" onClick={showModal}>
            Complain
          </button>
        </div> */}

        <div style={{ marginTop: "2rem", width: "100%", overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={displayItems}
            pagination={false}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1rem",
            overflowX:"auto",
            
          }}
        >
           {displayItems?.length>1 &&  <div>
            {from} - {to} of {filteredData?.length} 
          </div>}

        {displayItems?.length==1 &&  <div>
          {from} item out of {filteredData?.length}
          </div>}

          <div style={{ display: "flex", alignItems: "center" }}>
         
              <Pagination count={totalPages}  onChange={handlePageChange}   
                // key={paginationKey} 
                color="primary" />
          </div>
        </div>

    


      </div>

    


      <Backdrop
        sx={{ color: 'gold', zIndex: 1500 }}
        open={imageLoading}

      >
        <CircularProgress color="inherit" size={50} />
      </Backdrop>


      <Dialog
        open={openu}
        onClose={handleCloseu}
      
      >
  
        <DialogContent>
       <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
        <p style={{fontSize:"1.2rem",fontFamily:" 'Poppins', sans-serif",fontWeight:"bold"}}>
          Are you sure you want to {enableData?.activeStatus?"disable":"enable"}  this account ?</p>
          <p style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>
            <span style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{enableData?.firstName}</span> &nbsp;
             <span style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{enableData?.lastName}</span></p>
          <p style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{enableData?.email}</p>

       </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisableClick} 
          className={enableData?.activeState === true ? "custom-mui-button" : "custome-mui-button3"}
           variant="contained" sx={{background:enableData?.activeStatus?"red":"green"}}
          size="small">{enableData?.activeStatus?"DISABLE":"ENABLE"}</Button>

          <Button onClick={handleCloseu}   className="custom-mui-button2"
           variant="contained" size="small" sx={{background:"orange"}}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
     

    


    </>
  );
};

export default ManageUsers;
