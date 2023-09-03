import React from "react";
import "./HelpRequest.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Modal } from "antd";
import { AutoComplete } from "antd";
import { NoEncryption } from "@mui/icons-material";
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { auth } from "../../../firebase";
import { Input } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
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
  color:"black",
};

const pStyles2 = {
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1rem",
    marginTop:"0.5rem",
    color:"#616263"
  };

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

const data = [
  {
    key: "1",
    helpRequestId: "501",
    customerName: "Nimal Lansa",
    status: "Resolved",
    customerId: "200",
  },
  {
    key: "2",
    helpRequestId: "502",
    customerName: "Sara Johnson",
    status: "Unresolved",
    customerId: "201",
  },
  {
    key: "3",
    helpRequestId: "503",
    customerName: "John Doe",
    status: "Resolved",
    customerId: "202",
  },
  {
    key: "4",
    helpRequestId: "504",
    customerName: "Alice Smith",
    status: "Unresolved",
    customerId: "203",
  },
  {
    key: "5",
    helpRequestId: "505",
    customerName: "Robert Brown",
    status: "Resolved",
    customerId: "204",
  },
  {
    key: "6",
    helpRequestId: "506",
    customerName: "Emily Davis",
    status: "Unresolved",
    customerId: "205",
  },
  {
    key: "7",
    helpRequestId: "507",
    customerName: "Michael Wilson",
    status: "Resolved",
    customerId: "206",
  },
  {
    key: "8",
    helpRequestId: "508",
    customerName: "Jessica Lee",
    status: "Unresolved",
    customerId: "207",
  },
  {
    key: "9",
    helpRequestId: "509",
    customerName: "David Brown",
    status: "Resolved",
    customerId: "208",
  },
  {
    key: "10",
    helpRequestId: "510",
    customerName: "Mary Johnson",
    status: "Unresolved",
    customerId: "209",
  },
  {
    key: "11",
    helpRequestId: "511",
    customerName: "William Smith",
    status: "Resolved",
    customerId: "210",
  },
  {
    key: "12",
    helpRequestId: "512",
    customerName: "Olivia Anderson",
    status: "Unresolved",
    customerId: "211",
  },
  {
    key: "13",
    helpRequestId: "513",
    customerName: "James Wilson",
    status: "Resolved",
    customerId: "212",
  },
  {
    key: "14",
    helpRequestId: "514",
    customerName: "Sophia Taylor",
    status: "Unresolved",
    customerId: "213",
  },
  {
    key: "15",
    helpRequestId: "515",
    customerName: "Daniel Johnson",
    status: "Resolved",
    customerId: "214",
  },
  {
    key: "16",
    helpRequestId: "516",
    customerName: "Emma Davis",
    status: "Unresolved",
    customerId: "215",
  },
];


const HelpRequest = () => {

  const columns = [
    {
      title: "Help Request Id",
      dataIndex: "helpRequestId",
      key: "helpRequestId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        let color;
        switch (record.status?.toLowerCase().trim()) {
          case "resolved":
            color = "#13d609";
            break;
          case "unresolved":
            color = "blue";
            break;
          default:
            color = "black"; // Fallback color for any other status
            break;
        }
  
        return <span  onClick={()=>statusClick(record)}
        style={{ color,fontWeight:"bold",fontSize:"1rem",cursor:"pointer" }}>{record.status}</span>;
      },
    },
  
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
        onClick={()=>viewClick(record)}
          className="donation-request-view-button"
        >
          View
        </button>
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
  const [appealData,setAppealData]=React.useState({});
  const [filteredData, setFilteredData] = React.useState(data); 
  const [statusData,setStatusData]=React.useState({});
  const [openu, setOpenu] = React.useState(false);


  const statusClick=(data)=>{
    console.log(data);
    setStatusData(data);
    setOpenu(true);
    
      }

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

  React.useEffect(() => {
    // console.log(data?.length);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);


 

  
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
  }, [pageNumber,filteredData,totalPages]);

 



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

  const handlePageChange = (event, page) => {
    setPageNumber(page)
  };
  
  const handleCloseu = () => {
    setOpenu(false);
  };

  const handleCloseDisableClick=()=>{
    setOpenu(false);
    // const userId=enableData?.userId;
    // if(enableData?.activeStatus==true){
    //   dispatch(putUserOnHold({userId}));
    // }else if(enableData?.activeStatus==false){
    //   console.log("already disabled")
    //   dispatch(removeUserHold({userId}))
    // }
    
  }
 

  return (
    <>
      <div className="help-request">
        <div style={{ width: "100%", alignItems: "center",display:"flex",justifyContent:"center",marginTop:"2rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Help Requests
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

        {/* <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
           {displayItems?.length>1 &&  <div>
            from {from} to {to} out of {data?.length} item{data?.length==1?"":"s"}
          </div>}

        {displayItems?.length==1 &&  <div>
          {from} item out of {data?.length} item{data?.length==1?"":"s"}
          </div>}

          <div style={{ display: "flex", alignItems: "center" }}>
            {pageNumber != 1 && (
              <KeyboardArrowLeftIcon
                style={{ cursor: "pointer" }}
                onClick={prevClick}
              />
            )}

            <div
              style={{
                padding: "0.5rem",
                border: "2px solid black",
                borderRadius: "4px",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              {pageNumber}
            </div>

            {totalPages !== pageNumber && (
              <KeyboardArrowRightIcon
                style={{ cursor: "pointer" }}
                onClick={nextClick}
              />
            )}
          </div> */}
        {/* </div> */}

      </div>

      <Modal
        title={<h2 style={{color:"#00425A",
        fontSize:"1.5rem",marginBottom:"1rem"}}>Report a complaint</h2>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ width: "100%" }}>

          <p style={pStyles}>Complaint Subject</p>
          <Input style={{width:"100%",marginTop:"0.3rem"}} placeholder="Complaint Subject"/>
          {/* <AutoComplete
    style={{
     width:"100%",
marginTop:"0.3rem",

    }}
    options={options}
    placeholder="Item type"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  /> */}
  <p style={pStyles}>Complaint description</p>

  <TextArea rows={4} style={{marginTop:"0.3rem",width:"100%",}} />

  <p style={pStyles}>Desired outcome</p>
  <TextArea rows={3} style={{marginTop:"0.3rem",width:"100%",}} />

 

  <label className="custom-file-upload" onChange={handleFileSelect} style={{marginTop:"1rem"}}>
    <input type="file" multiple />
    Choose images
</label>

<div style={{width:"100%",marginTop:"1rem"}}>

  {
    fileArray?.map((item,index)=>{
      return (
        <p key={index} style={{overflowX:"auto",marginBottom:"0.5rem"}}>{item}</p>
      )
    })
  }
</div>

{/* {fileArray?.length>=1 &&<div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem",color:"red",}}>
{fileArray?.length<2?"Please select at least 5 images !":""}
</div>} */}

{fileArray?.length>=1 && <div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem"}}>
<button className="q-upload-btn" onClick={handleUpload} disabled={downloadUrlArray?.length>=1?true:false}
>Upload</button>
</div>}


{downloadUrlArray?.length>=1 &&<div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",marginTop:"1rem"}}>
{
  downloadUrlArray?.map((item,index)=>{
return (
  <img src={item} key={index} style={{width:"100%",
  marginBottom:"1rem",borderRadius:"8px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}}/>
)
  })
}
</div>}



<div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1rem"}}>
<button  className="q-submit-btn" onClick={handleCancel}>Submit</button>
<button className="q-cancel-btn" onClick={handleCancel} style={{marginLeft:"1rem"}}>Cancel </button>
</div>
     
        </div>
      </Modal>


      <Backdrop
        sx={{ color: 'gold', zIndex: 1500 }}
        open={imageLoading}

      >
        <CircularProgress color="inherit" size={50} />
      </Backdrop>
     

      <Modal title={<h2 style={{color:"#00425A",
        fontSize:"1.5rem",marginBottom:"1rem"}}>Help Request Details</h2>}
       open={isModalOpena} onOk={handleOka} onCancel={handleCancela}
       footer={null}
       >

       <div style={{width:"100%",}}>
       <p style={pStyles2}>Help Request Id : <span style={pStyles}>{appealData?.helpRequestId}</span></p>
        <p style={pStyles2}>Customer Name : <span style={pStyles}>{appealData?.customerName}</span></p>
        <p style={pStyles2}>Customer Id : <span style={pStyles}>{appealData?.customerId}</span></p>
      

<br/>
        {/* <p style={pStyles} >Reason for appeal</p>
        <Input placeholder="Reason for appeal" style={{width:"100%",marginTop:"0.3rem"}}/> */}

        {/* <p style={pStyles}>Describe Objection</p>
        <TextArea rows={4} style={{marginTop:"0.3rem",width:"100%",}} /> */}

        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1rem"}}>
        <button className="q-submit-btn" onClick={handleCancela}>Okay</button>
        {/* <button className="q-cancel-btn" style={{marginLeft:"1rem"}} onClick={handleCancela}>Cancel</button> */}
        </div>

       </div>


      </Modal>




      <Dialog
        open={openu}
        onClose={handleCloseu}
      
      >
  
        <DialogContent>
       <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
        <p style={{fontSize:"1.2rem",fontFamily:" 'Poppins', sans-serif",fontWeight:"bold"}}>
          {/* Are you sure you want to {enableData?.activeStatus?"disable":"enable"}  this account ? */}

           You want to change status to {statusData?.status?.toLowerCase().trim()==="resolved"?"unresolved":"resolved"}
          </p>
         
          {/* <p style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>
            <span style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{statusData?.customerName}</span> &nbsp;
             <span style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{statusData?.itemName}</span>

             </p> */}
          

       </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisableClick} 
          className={statusData?.status?.toLowerCase().trim() === "resolved" ? "custom-mui-button-d" : "custome-mui-button3-d"}
           variant="contained" sx={{background:statusData?.status?.toLowerCase().trim() === "unresolved"?"green":"blue"}}
          size="small">{statusData?.status?.toLowerCase().trim() === "resolved"?"unresolved":"resolved"}</Button>

          <Button onClick={handleCloseu}   className="custom-mui-button2"
           variant="contained" size="small" sx={{background:"orange"}}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default HelpRequest;
