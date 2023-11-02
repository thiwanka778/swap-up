import React from "react";
import "./SwapRequest.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Modal } from "antd";
import { AutoComplete } from "antd";
import { NoEncryption } from "@mui/icons-material";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useSelector,useDispatch } from "react-redux";
import { getAllUnshippedSwapItems, inventoryReset, shipSwappingItem } from "../../../redux/inventorySlice";
const { TextArea } = Input;

const pStyles = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop: "0.5rem",
  color: "black",
};

const pStyles2 = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop: "0.5rem",
  color: "#616263",
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


  

const SwapRequest = () => {
  const dispatch=useDispatch();
  const {unshippedSwapArray,shipSwappingStatus,inventoryLoading}=useSelector((state)=>state.inventory);
  const {user}=useSelector((state)=>state.user);

  React.useEffect(()=>{
     dispatch(getAllUnshippedSwapItems())
  },[]);



  const columns = [
    {
      title: "Swap Id",
      dataIndex: "swapId",
      key: "swapId",
    },
    {
      title: "Shipped Date",
      dataIndex: "timeCreated",
      render:(_,record)=>{
        const shippedDate=record?.timeCreated==null?"-":record?.timeCreated?.slice(0,10);
         return (
          <span>{shippedDate}</span>
         )
      }
    },
    // {
    //   title: "Item Name",
    //   dataIndex: "itemName",
    //   key: "itemName",
    // },
    {
      title: "Swapping Status",
      key: "status",
      render: (_, record) => {
        let color;
        let wordSpan="";
        switch (record.swappingStatus) {
          case true:
            color = "#13d609";
            wordSpan="Shipped"
            break;
          case false:
            color = "blue";
            wordSpan="Pending"
            break;
         
        }

        return (
          <span
            onClick={() => statusClick(record)}
            style={{
              color,
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {wordSpan}
          </span>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => viewClick(record)}
          className="donation-request-view-button"
        >
          Confirm Shipping
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
  const [fileArray, setFileArray] = React.useState([]);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [validImages, setValidImages] = React.useState("");
  const [downloadUrlArray, setDownloadUrlArray] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [isModalOpena, setIsModalOpena] = React.useState(false);
  const [appealData, setAppealData] = React.useState({});
  const [filteredData, setFilteredData] = React.useState([]);
  const [statusData, setStatusData] = React.useState({});
  const [openu, setOpenu] = React.useState(false);
  const [data,setData]=React.useState([]);

console.log("unshippedSwapArray",unshippedSwapArray?.data)

React.useEffect(()=>{
  const getData=unshippedSwapArray?.data?.map((item,index)=>{
      return {...item,key:index+1}
  })
  setData(getData)
},[unshippedSwapArray]);

React.useEffect(()=>{
 if(inventoryLoading===false &&shipSwappingStatus===true){
  dispatch(getAllUnshippedSwapItems());
  setIsModalOpena(false);
  dispatch(inventoryReset())
 }

},[inventoryLoading])



  const statusClick = (data) => {

    console.log(data);
    setStatusData(data);
    setOpenu(true);
  };

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

  React.useEffect(() => {
    // console.log(data?.length);
    setTotalPages(Math.ceil(unshippedSwapArray?.data?.length / itemsPerPage));
  }, [data,unshippedSwapArray]);

  React.useEffect(() => {
    setDisplayItems((prevState) => {
      const startIndex = pageNumber * itemsPerPage - itemsPerPage;
      const endIndex = pageNumber * itemsPerPage - 1;
      setFrom(startIndex + 1);
      const slicedData = data?.slice(startIndex, endIndex + 1);
      const actualItemsPerPage = slicedData?.length;
      const toValue = startIndex + actualItemsPerPage;
      setTo(toValue);
      return slicedData;
    });
  }, [pageNumber, filteredData, totalPages,data,]);

  

  const handleFileSelect = (event) => {
    setDownloadUrlArray([]);
    const selectedFiles = event.target.files;
    const fileNamesArray = [];
    setUploadFile(selectedFiles);
    let count = 0;
    // Iterate through the FileList and extract the names of each file
    for (let i = 0; i < selectedFiles.length; i++) {
      count = count + 1;
      const fileName = selectedFiles[i].name;
      fileNamesArray.push(fileName);
    }

    if (count >= 5) {
      setValidImages("Please select at least 5 images !");
    } else {
      setValidImages("");
    }

    setFileArray((prevState) => {
      return fileNamesArray;
    });
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

  const viewClick = (data) => {
    console.log(data);
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

  const shippedClick=()=>{
     console.log(appealData)
     dispatch(shipSwappingItem({
      inventoryManagerId:user?.userId,
      swapId:appealData?.swapId,
       status: true,
     }))
  }

  const handlePageChange = (event, page) => {
    setPageNumber(page);
  };

  const handleCloseu = () => {
    setOpenu(false);
  };

  const handleCloseDisableClick = () => {
    setOpenu(false);
    // const userId=enableData?.userId;
    // if(enableData?.activeStatus==true){
    //   dispatch(putUserOnHold({userId}));
    // }else if(enableData?.activeStatus==false){
    //   console.log("already disabled")
    //   dispatch(removeUserHold({userId}))
    // }
  };

  return (
    <>
      <div className="swap-request">
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Swapped Requests
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
            overflowX: "auto",
          }}
        >
          {displayItems?.length > 1 && (
            <div>
              {from} - {to} of {filteredData?.length}
            </div>
          )}

          {displayItems?.length == 1 && (
            <div>
              {from} item out of {filteredData?.length}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center" }}>
            <Pagination
              count={totalPages}
              onChange={handlePageChange}
              // key={paginationKey}
              color="primary"
            />
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
        title={
          <h2
            style={{
              color: "#00425A",
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Report a complaint
          </h2>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        zIndex={50000}
      >
        <div style={{ width: "100%" }}>
          <p style={pStyles}>Complaint Subject</p>
          <Input
            style={{ width: "100%", marginTop: "0.3rem" }}
            placeholder="Complaint Subject"
          />
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

          <TextArea rows={4} style={{ marginTop: "0.3rem", width: "100%" }} />

          <p style={pStyles}>Desired outcome</p>
          <TextArea rows={3} style={{ marginTop: "0.3rem", width: "100%" }} />

          <label
            className="custom-file-upload"
            onChange={handleFileSelect}
            style={{ marginTop: "1rem" }}
          >
            <input type="file" multiple />
            Choose images
          </label>

          <div style={{ width: "100%", marginTop: "1rem" }}>
            {fileArray?.map((item, index) => {
              return (
                <p
                  key={index}
                  style={{ overflowX: "auto", marginBottom: "0.5rem" }}
                >
                  {item}
                </p>
              );
            })}
          </div>

          {/* {fileArray?.length>=1 &&<div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem",color:"red",}}>
{fileArray?.length<2?"Please select at least 5 images !":""}
</div>} */}

          {fileArray?.length >= 1 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <button
                className="q-upload-btn"
                onClick={handleUpload}
                disabled={downloadUrlArray?.length >= 1 ? true : false}
              >
                Upload
              </button>
            </div>
          )}

          {downloadUrlArray?.length >= 1 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              {downloadUrlArray?.map((item, index) => {
                return (
                  <img
                    src={item}
                    key={index}
                    style={{
                      width: "100%",
                      marginBottom: "1rem",
                      borderRadius: "8px",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                  />
                );
              })}
            </div>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <button className="q-submit-btn" onClick={handleCancel}>
              Submit
            </button>
            <button
              className="q-cancel-btn"
              onClick={handleCancel}
              style={{ marginLeft: "1rem" }}
            >
              Cancel{" "}
            </button>
          </div>
        </div>
      </Modal>

      <Backdrop sx={{ color: "gold", zIndex: 1500 }} open={imageLoading}>
        <CircularProgress color="inherit" size={50} />
      </Backdrop>

      <Modal
        title={
          <h2
            style={{
              color: "#00425A",
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Confirm shipping
          </h2>
        }
        open={isModalOpena}
        onOk={handleOka}
        onCancel={handleCancela}
        footer={null}
        zIndex={50000}
      >
        <div style={{ width: "100%" }}>
          
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <button className="q-submit-btn-shipped" 
         
            onClick={shippedClick}>
              Shipping
            </button>
            {/* <button className="q-cancel-btn" style={{marginLeft:"1rem"}} onClick={handleCancela}>Cancel</button> */}
          </div>
        </div>
      </Modal>

      <Dialog open={openu} onClose={handleCloseu}>
        <DialogContent>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                fontFamily: " 'Poppins', sans-serif",
                fontWeight: "bold",
              }}
            >
              {/* Are you sure you want to {enableData?.activeStatus?"disable":"enable"}  this account ? */}
              Change status to{" "}
              {statusData?.status?.toLowerCase().trim() === "processed"
                ? "Shipped"
                : "Processed"}
            </p>

            {/* <p style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>
            <span style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{statusData?.customerName}</span> &nbsp;
             <span style={{fontSize:"1rem",fontFamily:" 'Poppins', sans-serif",}}>{statusData?.itemName}</span>

             </p> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDisableClick}
            className={
              statusData?.status?.toLowerCase().trim() === "processed"
                ? "custom-mui-button-d"
                : "custome-mui-button3-d"
            }
            variant="contained"
            sx={{
              background:
                statusData?.status?.toLowerCase().trim() === "processed"
                  ? "blue"
                  : "green",
            }}
            size="small"
          >
            {statusData?.status?.toLowerCase().trim() === "processed"
              ? "Shipped"
              : "Processed"}
          </Button>

          <Button
            onClick={handleCloseu}
            className="custom-mui-button2"
            variant="contained"
            size="small"
            sx={{ background: "orange" }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SwapRequest;
