import React from "react";
import "./QualityCheck.css";
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
import { useSelector } from "react-redux";
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
    itemId: "501",
    dateSubmitted: "02/06/2023",
    itemName: "T-shirt",
    status: "Approved",
  },
  // {
  //   key: "14566",
  //   itemId: "501",
  //   dateSubmitted: "02/06/2023",
  //   itemName: "T-shirt",
  //   status: "Bulla",
  // },

  {
    key: "2",
    itemId: "502",
    dateSubmitted: "03/06/2023",
    itemName: "Jeans",
    status: "Rejected",
  },
  {
    key: "3",
    itemId: "503",
    dateSubmitted: "04/06/2023",
    itemName: "Sweater",
    status: "In progress",
  },
  {
    key: "4",
    itemId: "504",
    dateSubmitted: "05/06/2023",
    itemName: "Jacket",
    status: "Approved",
  },
  {
    key: "5",
    itemId: "505",
    dateSubmitted: "06/06/2023",
    itemName: "Shoes",
    status: "Rejected",
  },
  // More objects...
  {
    key: "26",
    itemId: "526",
    dateSubmitted: "27/06/2023",
    itemName: "Shorts",
    status: "In progress",
  },
  {
    key: "27",
    itemId: "527",
    dateSubmitted: "28/06/2023",
    itemName: "Skirt",
    status: "Approved",
  },
  {
    key: "28",
    itemId: "528",
    dateSubmitted: "29/06/2023",
    itemName: "Dress",
    status: "Rejected",
  },
  {
    key: "29",
    itemId: "529",
    dateSubmitted: "30/06/2023",
    itemName: "Hat",
    status: "In progress",
  },
  {
    key: "30",
    itemId: "530",
    dateSubmitted: "01/07/2023",
    itemName: "Socks",
    status: "Approved",
  },
  {
    key: "31",
    itemId: "501",
    dateSubmitted: "02/06/2023",
    itemName: "T-shirt",
    status: "Approved",
  },
  {
    key: "32",
    itemId: "502",
    dateSubmitted: "03/06/2023",
    itemName: "Jeans",
    status: "Rejected",
  },
  {
    key: "33",
    itemId: "503",
    dateSubmitted: "04/06/2023",
    itemName: "Sweater",
    status: "In progress",
  },
  {
    key: "34",
    itemId: "504",
    dateSubmitted: "05/06/2023",
    itemName: "Jacket",
    status: "Approved",
  },
  {
    key: "35",
    itemId: "505",
    dateSubmitted: "06/06/2023",
    itemName: "Shoes",
    status: "Rejected",
  },
  // More objects...
  {
    key: "36",
    itemId: "526",
    dateSubmitted: "27/06/2023",
    itemName: "Shorts",
    status: "In progress",
  },
  {
    key: "37",
    itemId: "527",
    dateSubmitted: "28/06/2023",
    itemName: "Skirt",
    status: "Approved",
  },
  {
    key: "38",
    itemId: "528",
    dateSubmitted: "29/06/2023",
    itemName: "Dress",
    status: "Rejected",
  },
  {
    key: "45",
    itemId: "527",
    dateSubmitted: "28/06/2023",
    itemName: "Skirt",
    status: "Approved",
  },
  {
    key: "46",
    itemId: "528",
    dateSubmitted: "29/06/2023",
    itemName: "Dress",
    status: "Rejected",
  },
  {
    key: "47",
    itemId: "529",
    dateSubmitted: "30/06/2023",
    itemName: "Hat",
    status: "In progress",
  },
  {
    key: "48",
    itemId: "530",
    dateSubmitted: "01/07/2023",
    itemName: "Socks",
    status: "Approved",
  },
  {
    key: "49",
    itemId: "531",
    dateSubmitted: "02/06/2023",
    itemName: "T-shirt",
    status: "Approved",
  },
];



const QualityCheck = () => {

  const {openRedux,screen}=useSelector((state)=>state.user)

  const columns = [
    {
      title: "Item Id",
      dataIndex: "itemId",
      key: "itemId",
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      key: "dateSubmitted",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
        onClick={()=>appealClick(record)}
          className="appeal-button"
          disabled={record.status == "Rejected" ? false : true}
        >
          Appeal
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
  const [statusOptions,setStatusOptions]=React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data); 
  const [paginationKey, setPaginationKey] = React.useState(0);

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
  if(selectedValue!==""){
    setPageNumber(1);
    const filtered = data.filter((item) => item.status === selectedValue);
    setFilteredData(filtered); 
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setPaginationKey((prevKey) => prevKey + 1);
  }else{
    setFilteredData(data); 
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }
  

  }, [selectedValue]);

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
      <div className="q-check"  style={{paddingLeft:(openRedux&&screen>650)?"270px":"1rem"}} >
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

      <div>
      <AutoComplete
    style={{
      width: 200,
    }}
    onChange={handleAutoCompleteChange}
    options={statusOptions}
    allowClear={true}
    placeholder="Filter by status"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
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
            {/* {pageNumber != 1 && (
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
            )} */}
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

export default QualityCheck;
