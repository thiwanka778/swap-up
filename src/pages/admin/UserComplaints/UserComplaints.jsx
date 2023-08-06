import React from "react";
import "./UserComplaints.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, Modal } from "antd";
import { AutoComplete } from "antd";
import { NoEncryption } from "@mui/icons-material";
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { auth } from "../../../firebase";
import { Input } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
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

const data = [
    {
      key: "1",
      no: "01",
      date: "02/06/2023",
      name: "Sunil Perera",
      userType: "Member",
      status: "Pending",
      contactNumber: "1234567890",
      description: "Issue with account login",
      subject: "Account",
    },
    {
      key: "2",
      no: "02",
      date: "03/06/2023",
      name: "John Doe",
      userType: "Quality Checker",
      status: "Resolved",
      contactNumber: "9876543210",
      description: "Product quality review",
      subject: "Product",
    },
    {
      key: "3",
      no: "03",
      date: "04/06/2023",
      name: "Jane Smith",
      userType: "Delivery Manager",
      status: "Pending",
      contactNumber: "4567890123",
      description: "Delayed delivery",
      subject: "Delivery",
    },
    {
      key: "4",
      no: "04",
      date: "05/06/2023",
      name: "Alice Johnson",
      userType: "Member",
      status: "Resolved",
      contactNumber: "7890123456",
      description: "Billing issue",
      subject: "Billing",
    },
    {
      key: "5",
      no: "05",
      date: "06/06/2023",
      name: "Bob Anderson",
      userType: "Quality Checker",
      status: "Pending",
      contactNumber: "0123456789",
      description: "Technical problem",
      subject: "Technical",
    },
    {
      key: "6",
      no: "06",
      date: "07/06/2023",
      name: "Emily Brown",
      userType: "Delivery Manager",
      status: "Resolved",
      contactNumber: "6543210987",
      description: "Order status inquiry",
      subject: "Order",
    },
    {
      key: "7",
      no: "07",
      date: "08/06/2023",
      name: "David Lee",
      userType: "Member",
      status: "Pending",
      contactNumber: "9876543210",
      description: "Issue with account settings",
      subject: "Account",
    },
    {
      key: "8",
      no: "08",
      date: "09/06/2023",
      name: "Karen White",
      userType: "Quality Checker",
      status: "Resolved",
      contactNumber: "4567890123",
      description: "Product return request",
      subject: "Product",
    },
    {
      key: "9",
      no: "09",
      date: "10/06/2023",
      name: "Michael Johnson",
      userType: "Delivery Manager",
      status: "Pending",
      contactNumber: "7890123456",
      description: "Late shipment",
      subject: "Delivery",
    },
    {
      key: "10",
      no: "10",
      date: "11/06/2023",
      name: "Samantha Carter",
      userType: "Member",
      status: "Resolved",
      contactNumber: "0123456789",
      description: "Account upgrade",
      subject: "Account",
    },
    {
      key: "11",
      no: "11",
      date: "12/06/2023",
      name: "Christopher Davis",
      userType: "Quality Checker",
      status: "Pending",
      contactNumber: "6543210987",
      description: "Product inquiry",
      subject: "Product",
    },
    {
      key: "12",
      no: "12",
      date: "13/06/2023",
      name: "Jennifer Adams",
      userType: "Delivery Manager",
      status: "Resolved",
      contactNumber: "9876543210",
      description: "Order cancellation",
      subject: "Order",
    },
    {
      key: "13",
      no: "13",
      date: "14/06/2023",
      name: "Alex Turner",
      userType: "Member",
      status: "Pending",
      contactNumber: "4567890123",
      description: "Login assistance",
      subject: "Account",
    },
    {
      key: "14",
      no: "14",
      date: "15/06/2023",
      name: "Olivia Wilson",
      userType: "Quality Checker",
      status: "Resolved",
      contactNumber: "7890123456",
      description: "Product defect report",
      subject: "Product",
    },
    {
      key: "15",
      no: "15",
      date: "16/06/2023",
      name: "Daniel Mitchell",
      userType: "Delivery Manager",
      status: "Pending",
      contactNumber: "0123456789",
      description: "Shipping inquiry",
      subject: "Delivery",
    },
    {
      key: "16",
      no: "16",
      date: "17/06/2023",
      name: "Sophia Robinson",
      userType: "Member",
      status: "Resolved",
      contactNumber: "6543210987",
      description: "Account termination request",
      subject: "Account",
    },
    {
      key: "17",
      no: "17",
      date: "18/06/2023",
      name: "Matthew Martinez",
      userType: "Quality Checker",
      status: "Pending",
      contactNumber: "9876543210",
      description: "Product review",
      subject: "Product",
    },
    {
      key: "18",
      no: "18",
      date: "19/06/2023",
      name: "Emma Hall",
      userType: "Delivery Manager",
      status: "Resolved",
      contactNumber: "4567890123",
      description: "Late delivery complaint",
      subject: "Delivery",
    },
    {
      key: "19",
      no: "19",
      date: "20/06/2023",
      name: "Ryan Evans",
      userType: "Member",
      status: "Pending",
      contactNumber: "7890123456",
      description: "Password reset",
      subject: "Account",
    },
    {
      key: "20",
      no: "20",
      date: "21/06/2023",
      name: "Ava Adams",
      userType: "Quality Checker",
      status: "Resolved",
      contactNumber: "0123456789",
      description: "Product inquiry",
      subject: "Product",
    },
    {
      key: "21",
      no: "21",
      date: "22/06/2023",
      name: "Noah Brown",
      userType: "Delivery Manager",
      status: "Pending",
      contactNumber: "6543210987",
      description: "Order status inquiry",
      subject: "Order",
    },
    {
      key: "22",
      no: "22",
      date: "23/06/2023",
      name: "Isabella Taylor",
      userType: "Member",
      status: "Resolved",
      contactNumber: "9876543210",
      description: "Account update request",
      subject: "Account",
    },
    {
      key: "23",
      no: "23",
      date: "24/06/2023",
      name: "Ethan Moore",
      userType: "Quality Checker",
      status: "Pending",
      contactNumber: "4567890123",
      description: "Product feedback",
      subject: "Product",
    },
  ];
  

const UserComplaints = () => {

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "User Type",
        dataIndex: "userType",
        key: "userType",
      },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        let color;
        switch (record.status) {
          case "Pending":
            color = "blue";
            break;
          case "Resolved":
            color = "#13d609";
            break;
          case "In progress":
            color = "blue";
            break;
          default:
            color = "black"; // Fallback color for any other status
            break;
        }
  
        return <span style={{ color,fontWeight:"bold",fontSize:"1rem" }}>{record.status}</span>;
      },
    },
  
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
            <button className="admin-complaint-view" onClick={()=>viewClick(record)}
            style={{marginRight:"0.4rem"}}>View</button>
            <button className="admin-complaint-remove" style={{marginRight:"0.4rem"}}>Remove</button>
            <button className="admin-complaint-respond" style={{marginRight:"0.4rem"}}>Respond</button>
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
  const [filteredData, setFilteredData] = React.useState(data); 

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
  }, []);

 


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

  const prevClick = () => {
    setPageNumber((prevState) => {
      return prevState > 1 ? prevState - 1 : prevState;
    });
  };

  const nextClick = () => {
    setPageNumber((prevState) => {
      return prevState < totalPages ? prevState + 1 : prevState;
    });
  };



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
  
  
 

  return (
    <>
      <div className="user-complaints">

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
            Complaints
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
        fontSize:"1.5rem",marginBottom:"1rem"}}>View Complaint</h2>}
       open={isModalOpena} onOk={handleOka} onCancel={handleCancela}
       footer={null}
       >

       <div style={{width:"100%",}}>
        
        <p style={pStyles}>Name : <span style={p2Styles}>{viewData?.name}</span></p>
        <p style={pStyles}>User Type : <span style={p2Styles}>{viewData?.userType}</span></p>
        <p style={pStyles}>Subject : <span style={p2Styles}>{viewData?.subject}</span></p>
        <p style={pStyles}>Description : <span style={p2Styles}>{viewData?.description}</span></p>
        <p style={pStyles}>Contact number : <span style={p2Styles}>{viewData?.contactNumber}</span></p>
        <p style={pStyles}>Date Reported : <span style={p2Styles}>{viewData?.date}</span></p>
            <br/>
        <p style={pStyles} >Reason for appeal</p>
        <Input placeholder="Reason for appeal" style={{width:"100%",marginTop:"0.3rem"}}/>

        <p style={pStyles}>Describe Objection</p>
        <TextArea rows={4} style={{marginTop:"0.3rem",width:"100%",}} />

        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1rem"}}>
        <button className="q-submit-btn" onClick={handleCancela}>Submit</button>
        <button className="q-cancel-btn" style={{marginLeft:"1rem"}} onClick={handleCancela}>Cancel</button>
        </div>

       </div>


      </Modal>


    </>
  );
};

export default UserComplaints;
