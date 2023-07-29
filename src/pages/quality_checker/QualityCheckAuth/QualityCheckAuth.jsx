import React from "react";
import "./QualityCheckAuth.css";
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
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "204",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "203",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "202",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "201",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "200",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "109",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "108",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "107",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "106",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "105",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "104",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "103",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "102",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },
  {
    key: "101",
    memberName: "Ryan Diyon",
    memberId: 501,
    itemType: "Shoe",
    status: "Approved",
  },

  {
    key: "2",
    memberName: "Emma Watson",
    memberId: 502,
    itemType: "T-Shirt",
    status: "Rejected",
  },
  {
    key: "3",
    memberName: "John Doe",
    memberId: 503,
    itemType: "Jeans",
    status: "In progress",
  },
  {
    key: "4",
    memberName: "Alice Johnson",
    memberId: 504,
    itemType: "Sweater",
    status: "Approved",
  },
  {
    key: "5",
    memberName: "Michael Smith",
    memberId: 505,
    itemType: "Jacket",
    status: "Rejected",
  },
  {
    key: "6",
    memberName: "Sophia Lee",
    memberId: 506,
    itemType: "Hat",
    status: "In progress",
  },
  {
    key: "7",
    memberName: "Noah Martin",
    memberId: 507,
    itemType: "Socks",
    status: "Approved",
  },
  {
    key: "8",
    memberName: "Olivia Brown",
    memberId: 508,
    itemType: "Shorts",
    status: "Rejected",
  },
  {
    key: "9",
    memberName: "William Clark",
    memberId: 509,
    itemType: "Skirt",
    status: "Approved",
  },
  {
    key: "10",
    memberName: "Ava Rodriguez",
    memberId: 510,
    itemType: "Dress",
    status: "Approved",
  },
  {
    key: "11",
    memberName: "Liam Harris",
    memberId: 511,
    itemType: "Shirt",
    status: "In progress",
  },
  {
    key: "12",
    memberName: "Isabella Lopez",
    memberId: 512,
    itemType: "Pants",
    status: "Approved",
  },
  {
    key: "13",
    memberName: "Ethan Wilson",
    memberId: 513,
    itemType: "Coat",
    status: "Approved",
  },
  {
    key: "14",
    memberName: "Mia Thomas",
    memberId: 514,
    itemType: "Scarf",
    status: "Rejected",
  },
  {
    key: "15",
    memberName: "James Martinez",
    memberId: 515,
    itemType: "Gloves",
    status: "Approved",
  },
  {
    key: "16",
    memberName: "Sophia Lee",
    memberId: 516,
    itemType: "Sneakers",
    status: "Rejected",
  },
  {
    key: "17",
    memberName: "Logan Wilson",
    memberId: 517,
    itemType: "Boots",
    status: "In progress",
  },
  {
    key: "18",
    memberName: "Ava Martinez",
    memberId: 518,
    itemType: "Sandals",
    status: "Approved",
  },
  {
    key: "19",
    memberName: "Jackson Taylor",
    memberId: 519,
    itemType: "Slippers",
    status: "Rejected",
  },
  {
    key: "20",
    memberName: "Emma Rodriguez",
    memberId: 520,
    itemType: "Hat",
    status: "Approved",
  },
  {
    key: "21",
    memberName: "Daniel Adams",
    memberId: 521,
    itemType: "Socks",
    status: "In progress",
  },
  {
    key: "22",
    memberName: "Oliver Moore",
    memberId: 522,
    itemType: "Shorts",
    status: "Rejected",
  },
  {
    key: "23",
    memberName: "Sophia Johnson",
    memberId: 523,
    itemType: "Skirt",
    status: "Approved",
  },
  {
    key: "24",
    memberName: "Ethan Clark",
    memberId: 524,
    itemType: "Dress",
    status: "Approved",
  },
  {
    key: "25",
    memberName: "Emily Hernandez",
    memberId: 525,
    itemType: "Blouse",
    status: "In progress",
  },
  {
    key: "26",
    memberName: "Michael Anderson",
    memberId: 526,
    itemType: "Jeans",
    status: "Approved",
  },
  {
    key: "27",
    memberName: "Abigail Jackson",
    memberId: 527,
    itemType: "Shoes",
    status: "Rejected",
  },
  {
    key: "28",
    memberName: "Noah White",
    memberId: 528,
    itemType: "Jacket",
    status: "Approved",
  },
  {
    key: "29",
    memberName: "Isabella Clark",
    memberId: 529,
    itemType: "Sweater",
    status: "Approved",
  },
  {
    key: "30",
    memberName: "James Wilson",
    memberId: 530,
    itemType: "Hat",
    status: "Rejected",
  },
  // Add more objects...
];



const QualityCheckAuth = () => {

  const columns = [
    {
      title: "Member Name",
      dataIndex: "memberName",
      key: "memberName",
    },
    {
      title: "Member Id",
      dataIndex: "memberId",
      key: "memberId",
    },
    {
      title: "Item Type",
      dataIndex: "itemType",
      key: "itemType",
    },
    {
      title: "Status",
      key: "status",
   
      render: (_, record) => {
        let color;
        switch (record.status) {
          case "Approved":
            color = "#04ba25";
            break;
          case "Rejected":
            color = "#fc1303";
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
      title: "Actions",
      key: "action",
      render: (_, record) => (
<div>
{ (record?.status==="Approved" || record?.status==="Rejected") &&  <button className="appeal-button-p" style={{marginRight:"0.5rem"}}>In Progress</button>}
{ (record?.status==="In progress" || record?.status==="Rejected") &&<button className="appeal-button" style={{marginRight:"0.5rem"}}>Approve</button>}
{ (record?.status==="In progress" || record?.status==="Approved") && <button className="appeal-button-r" style={{marginRight:"0.5rem"}}>Reject</button>}

</div>
      
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
  const [statusOptions,setStatusOptions]=React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data); 
  const [paginationKey, setPaginationKey] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');




  const handleInputChange = (e) => {
    // Update the state with the new input value
    setInputValue(e.target.value);
  };

  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 10,
  });

  const handleAutoCompleteChange = (value) => {
    setSelectedValue(value);
  };


  React.useEffect(()=>{
     const statusArray=data?.map((item)=>{
              return item?.status;
     });
     const statusSet = new Set(statusArray);
     const newArray = Array.from(statusSet);
     const   tempArray=newArray?.map((item)=>{
        return {value:item}
      })

      setStatusOptions(tempArray);
  },[data]);


  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

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

  // React.useEffect(() => {
  //   
  //   setTotalPages(Math.ceil(data.length / itemsPerPage));
  // }, []);

  React.useEffect(() => {
  if(inputValue!==""){
    // console.log(inputValue)
    setPageNumber(1);
    let filtered = [];

    // Escape special characters in inputValue to ensure they are treated as literals
    const escapedInputValue = inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    for (let i = 0; i < data?.length; i++) {
      const text = data[i].memberName;
      const pattern = new RegExp(escapedInputValue, "i"); // Using "i" for case-insensitive matching
    
      if (text.match(pattern)) {
       
        filtered.push(data[i]);
      }
    }
   
    setFilteredData(filtered); 
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setPaginationKey((prevKey) => prevKey + 1);
  }else{
    setFilteredData(data); 
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }
  

  }, [inputValue]);





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

  const handlePageChange = (event, page) => {
    setPageNumber(page)
  };
  // const prevClick = () => {
  //   setPageNumber((prevState) => {
  //     return prevState > 1 ? prevState - 1 : prevState;
  //   });
  // };

  // const nextClick = () => {
  //   setPageNumber((prevState) => {
  //     return prevState < totalPages ? prevState + 1 : prevState;
  //   });
  // };



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
      setImageLoading(false);
       // Array of download URLs
       setDownloadUrlArray(downloadUrls)
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };
  
  const appealClick=(data)=>{
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
  

 

  return (
    <>
      <div className="q-check">
        <div style={{ width: "100%", alignItems: "center",display:"flex",justifyContent:"center",marginTop:"2rem"  }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Quality Check
          </p>
        </div>

      <div style={{width:"100%",display:"flex",alignItems:"center"}}>
      {/* <AutoComplete
    style={{
      width: 200,
      marginRight:"1rem",
    }}
    onChange={handleAutoCompleteChange}
    options={statusOptions}
    allowClear={true}
    placeholder="Filter by status"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  /> */}
  <Input placeholder="Type name" 
     value={inputValue} // Set the value of the Input to the state variable
     onChange={handleInputChange} 
  style={{width:200,marginRight:"1rem"}}/>
      </div>

        <div style={{ marginTop: "1rem", width: "100%", overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={displayItems}
            pagination={false}
            // pagination={pagination}
           
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
         
              <Pagination count={totalPages}  onChange={handlePageChange}     key={paginationKey} color="primary" />
          </div>
        </div>

      </div>

      <Modal
        title={<h2 style={{color:"#00425A",
        fontSize:"1.5rem",marginBottom:"1rem"}}>Submit the item you want to check quality</h2>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ width: "100%" }}>

          <p style={pStyles}>Item type</p>
          <AutoComplete
    style={{
     width:"100%",
marginTop:"0.3rem",

    }}
    options={options}
    placeholder="Item type"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
  <p style={pStyles}>Item description</p>

  <TextArea rows={4} style={{marginTop:"0.3rem",width:"100%",}} />

  <p style={pStyles}>Desired outcome</p>
  <TextArea rows={3} style={{marginTop:"0.3rem",width:"100%",}} />

  <p style={pStyles}>Choose Item (Upload atleast 5 pictures)</p>

  <label className="custom-file-upload" onChange={handleFileSelect} >
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

{fileArray?.length>=1 &&<div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem",color:"red",}}>
{fileArray?.length<2?"Please select at least 5 images !":""}
</div>}

{fileArray?.length>=2 && <div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem"}}>
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
        fontSize:"1.5rem",marginBottom:"1rem"}}>Appeal</h2>}
       open={isModalOpena} onOk={handleOka} onCancel={handleCancela}
       footer={null}
       >

       <div style={{width:"100%",}}>
        
        <p style={pStyles}>Item Id : <span>{appealData?.itemId}</span></p>
        <p style={pStyles}>Item Name : <span>{appealData?.itemName}</span></p>
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

export default QualityCheckAuth;
