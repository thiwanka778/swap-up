import React from "react";
import "./Swap.css";
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
        id: "501",
        dateOfSwap: "02/06/2023",
        itemName: "T-shirt",
        status: "Swap",
      },
      {
        key: "2",
        id: "502",
        dateOfSwap: "03/06/2023",
        itemName: "Jeans",
        status: "Swap",
      },
      {
        key: "3",
        id: "503",
        dateOfSwap: "04/06/2023",
        itemName: "Sweater",
        status: "Swap",
      },
      {
        key: "4",
        id: "504",
        dateOfSwap: "05/06/2023",
        itemName: "Jacket",
        status: "Swap",
      },
      {
        key: "5",
        id: "505",
        dateOfSwap: "06/06/2023",
        itemName: "Shoes",
        status: "Swap",
      },

      {
        key: "6",
        id: "501",
        dateOfSwap: "02/06/2023",
        itemName: "T-shirt",
        status: "Swap",
      },
      {
        key: "7",
        id: "502",
        dateOfSwap: "03/06/2023",
        itemName: "Jeans",
        status: "Swap",
      },
      {
        key: "8",
        id: "503",
        dateOfSwap: "04/06/2023",
        itemName: "Sweater",
        status: "Swap",
      },
      {
        key: "9",
        id: "504",
        dateOfSwap: "05/06/2023",
        itemName: "Jacket",
        status: "Swap",
      },
      {
        key: "10",
        id: "505",
        dateOfSwap: "06/06/2023",
        itemName: "Shoes",
        status: "Swap",
      },
      {
        key: "6",
        id: "506",
        dateOfSwap: "07/06/2023",
        itemName: "Hat",
        status: "Swap",
      },
      // Continue with more objects...
      {
        key: "51",
        id: "551",
        dateOfSwap: "22/07/2023",
        itemName: "Skirt",
        status: "Swap",
      },
      {
        key: "52",
        id: "552",
        dateOfSwap: "23/07/2023",
        itemName: "Dress",
        status: "Swap",
      },
      {
        key: "53",
        id: "553",
        dateOfSwap: "24/07/2023",
        itemName: "Hat",
        status: "Swap",
      },
      {
        key: "54",
        id: "554",
        dateOfSwap: "25/07/2023",
        itemName: "Socks",
        status: "Swap",
      },
      {
        key: "55",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },

      {
        key: "56",
        id: "551",
        dateOfSwap: "22/07/2023",
        itemName: "Skirt",
        status: "Swap",
      },
      {
        key: "57",
        id: "552",
        dateOfSwap: "23/07/2023",
        itemName: "Dress",
        status: "Swap",
      },
      {
        key: "58",
        id: "553",
        dateOfSwap: "24/07/2023",
        itemName: "Hat",
        status: "Swap",
      },
      {
        key: "59",
        id: "554",
        dateOfSwap: "25/07/2023",
        itemName: "Socks",
        status: "Swap",
      },
      {
        key: "60",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },

      {
        key: "61",
        id: "551",
        dateOfSwap: "22/07/2023",
        itemName: "Skirt",
        status: "Swap",
      },
      {
        key: "62",
        id: "552",
        dateOfSwap: "23/07/2023",
        itemName: "Dress",
        status: "Swap",
      },
      {
        key: "63",
        id: "553",
        dateOfSwap: "24/07/2023",
        itemName: "Hat",
        status: "Swap",
      },
      {
        key: "64",
        id: "554",
        dateOfSwap: "25/07/2023",
        itemName: "Socks",
        status: "Swap",
      },
      {
        key: "65",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },

      {
        key: "71",
        id: "551",
        dateOfSwap: "22/07/2023",
        itemName: "Skirt",
        status: "Swap",
      },
      {
        key: "72",
        id: "552",
        dateOfSwap: "23/07/2023",
        itemName: "Dress",
        status: "Swap",
      },
      {
        key: "73",
        id: "553",
        dateOfSwap: "24/07/2023",
        itemName: "Hat",
        status: "Swap",
      },
      {
        key: "74",
        id: "554",
        dateOfSwap: "25/07/2023",
        itemName: "Socks",
        status: "Swap",
      },
      {
        key: "75",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },

      {
        key: "81",
        id: "551",
        dateOfSwap: "22/07/2023",
        itemName: "Skirt",
        status: "Swap",
      },
      {
        key: "82",
        id: "552",
        dateOfSwap: "23/07/2023",
        itemName: "Dress",
        status: "Swap",
      },
      {
        key: "83",
        id: "553",
        dateOfSwap: "24/07/2023",
        itemName: "Hat",
        status: "Swap",
      },
      {
        key: "84",
        id: "554",
        dateOfSwap: "25/07/2023",
        itemName: "Socks",
        status: "Swap",
      },
      {
        key: "85",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },

      {
        key: "91",
        id: "551",
        dateOfSwap: "22/07/2023",
        itemName: "Skirt",
        status: "Swap",
      },
      {
        key: "92",
        id: "552",
        dateOfSwap: "23/07/2023",
        itemName: "Dress",
        status: "Swap",
      },
      {
        key: "93",
        id: "553",
        dateOfSwap: "24/07/2023",
        itemName: "Hat",
        status: "Swap",
      },
      {
        key: "94",
        id: "554",
        dateOfSwap: "25/07/2023",
        itemName: "Socks",
        status: "Swap",
      },
      {
        key: "95",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },
      {
        key: "96",
        id: "555",
        dateOfSwap: "26/07/2023",
        itemName: "Shorts",
        status: "Swap",
      },
   
  ];



const Swap = () => {

    const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Date of Swap",
          dataIndex: "dateOfSwap",
          key: "dateOfSwap",
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
              case "Swap":
                color = "#04ba25";
                break;
              case "Rejected":
                color = "red";
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
      
        // {
        //   title: "Action",
        //   key: "action",
        //   render: (_, record) => (
        //     <button
        //     onClick={()=>appealClick(record)}
        //       className="appeal-button"
        //       disabled={record.status == "Rejected" ? false : true}
        //     >
        //       Appeal
        //     </button>
        //   ),
        // },
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
      const slicedData = data?.slice(startIndex, endIndex + 1);
      const actualItemsPerPage = slicedData.length;
      const toValue = startIndex + actualItemsPerPage;
      setTo(toValue);
      return slicedData;
    });
  }, [pageNumber]);

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
       setDownloadUrlArray(downloadUrls);
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
      <div className="swap">
        <div style={{ width: "100%", alignItems: "center",display:"flex",justifyContent:"center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "2rem",
            }}
          >
            Swap
          </p>
        </div>

        <div style={{ width: "100%", alignItems: "center",display:"flex",justifyContent:"center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
       Submit the item you want to swap
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <button className="new-swap-button" onClick={showModal}>
            New Swap
          </button>
        </div>

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
          </div>



        </div>
      </div>

      <Modal
        title={<h2 style={{color:"#00425A",
        fontSize:"1.5rem",marginBottom:"1rem"}}>Submit the item you want to swap</h2>}
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

{fileArray?.length>=2 && <div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"0.5rem"}}>
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

export default Swap;
