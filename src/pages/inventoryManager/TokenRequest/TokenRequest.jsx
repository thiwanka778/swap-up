import React from "react";
import "./TokenRequest.css";
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

const data = [
    {
      key: "1",
      swapId: "501",
      itemName: "Shirt",
      customerName: "Nimal Lansa",
      status: "Pending",
      customerId: "200",
      itemId: "2",
      customerAddress: "21, New Road, Kaluthara",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "2",
      swapId: "502",
      itemName: "Pants",
      customerName: "John Doe",
      status: "Shipped",
      customerId: "201",
      itemId: "3",
      customerAddress: "123 Main Street, Cityville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "3",
      swapId: "503",
      itemName: "Shoes",
      customerName: "Jane Smith",
      status: "Stored",
      customerId: "202",
      itemId: "4",
      customerAddress: "45 Oak Avenue, Townsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "4",
      swapId: "504",
      itemName: "Hat",
      customerName: "Alice Johnson",
      status: "Pending",
      customerId: "203",
      itemId: "5",
      customerAddress: "67 Elm Street, Villagetown",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "5",
      swapId: "505",
      itemName: "Dress",
      customerName: "Bob Anderson",
      status: "Shipped",
      customerId: "204",
      itemId: "6",
      customerAddress: "89 Maple Road, Hamletsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "6",
      swapId: "506",
      itemName: "Socks",
      customerName: "Eve Taylor",
      status: "Stored",
      customerId: "205",
      itemId: "7",
      customerAddress: "34 Pine Lane, Woodsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "7",
      swapId: "507",
      itemName: "T-shirt",
      customerName: "David Wilson",
      status: "Pending",
      customerId: "206",
      itemId: "8",
      customerAddress: "56 Cedar Street, Riverside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "8",
      swapId: "508",
      itemName: "Jeans",
      customerName: "Grace Martinez",
      status: "Shipped",
      customerId: "207",
      itemId: "9",
      customerAddress: "78 Oakwood Drive, Hillside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "9",
      swapId: "509",
      itemName: "Sweater",
      customerName: "Frank Brown",
      status: "Stored",
      customerId: "208",
      itemId: "10",
      customerAddress: "90 Elm Avenue, Lakeside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "10",
      swapId: "510",
      itemName: "Jacket",
      customerName: "Olivia White",
      status: "Pending",
      customerId: "209",
      itemId: "11",
      customerAddress: "12 Cedar Lane, Brookside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "11",
      swapId: "511",
      itemName: "Scarf",
      customerName: "Sophia Lee",
      status: "Shipped",
      customerId: "210",
      itemId: "12",
      customerAddress: "45 Oak Avenue, Townsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "12",
      swapId: "512",
      itemName: "Gloves",
      customerName: "James Green",
      status: "Stored",
      customerId: "211",
      itemId: "13",
      customerAddress: "34 Pine Lane, Woodsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "13",
      swapId: "513",
      itemName: "Skirt",
      customerName: "Liam Harris",
      status: "Pending",
      customerId: "212",
      itemId: "14",
      customerAddress: "56 Cedar Street, Riverside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "14",
      swapId: "514",
      itemName: "Belt",
      customerName: "Emma Turner",
      status: "Shipped",
      customerId: "213",
      itemId: "15",
      customerAddress: "78 Oakwood Drive, Hillside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "15",
      swapId: "515",
      itemName: "Shorts",
      customerName: "Mia Collins",
      status: "Stored",
      customerId: "214",
      itemId: "16",
      customerAddress: "90 Elm Avenue, Lakeside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "16",
      swapId: "516",
      itemName: "Sweatshirt",
      customerName: "Noah Clark",
      status: "Pending",
      customerId: "215",
      itemId: "17",
      customerAddress: "12 Cedar Lane, Brookside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "17",
      swapId: "517",
      itemName: "Blouse",
      customerName: "Ava Adams",
      status: "Shipped",
      customerId: "216",
      itemId: "18",
      customerAddress: "21, New Road, Kaluthara",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "18",
      swapId: "518",
      itemName: "Sandals",
      customerName: "William Lewis",
      status: "Stored",
      customerId: "217",
      itemId: "19",
      customerAddress: "123 Main Street, Cityville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "19",
      swapId: "519",
      itemName: "Sweatpants",
      customerName: "Isabella Hall",
      status: "Pending",
      customerId: "218",
      itemId: "20",
      customerAddress: "45 Oak Avenue, Townsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "20",
      swapId: "520",
      itemName: "Cap",
      customerName: "Mason Scott",
      status: "Shipped",
      customerId: "219",
      itemId: "21",
      customerAddress: "67 Elm Street, Villagetown",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "21",
      swapId: "521",
      itemName: "Sunglasses",
      customerName: "Sophie Mitchell",
      status: "Stored",
      customerId: "220",
      itemId: "22",
      customerAddress: "89 Maple Road, Hamletsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "22",
      swapId: "522",
      itemName: "Backpack",
      customerName: "Lucas Wright",
      status: "Pending",
      customerId: "221",
      itemId: "23",
      customerAddress: "34 Pine Lane, Woodsville",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
    {
      key: "23",
      swapId: "523",
      itemName: "Watch",
      customerName: "Aiden Turner",
      status: "Shipped",
      customerId: "222",
      itemId: "24",
      customerAddress: "56 Cedar Street, Riverside",
      itemPicture: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/May/140501/2D274905752454-crocodile-tee-636.jpg",
    },
  ];
  
  

const TokenRequest= () => {
  const columns = [
    {
      title: "Requested Id",
      dataIndex: "swapId",
      key: "swapId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
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
        switch (record.status?.toLowerCase().trim()) {
          case "pending":
            color = "blue";
            break;
          case "shipped":
            color = "#13d609";
            break;
            case "stored":
                color="gray";
                break;
          default:
            color = "black"; // Fallback color for any other status
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
            {record.status}
          </span>
        );
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <button
    //       onClick={() => viewClick(record)}
    //       className="donation-request-view-button"
    //     >
    //       View
    //     </button>
    //   ),
    // },

    {
        title: "Action",
        key:"action",
        render:(_,record)=>{
            return (
                <div>

               {record?.status?.toLowerCase().trim()!=="shipped" && <button  className="donation-request-view-button-shipped" style={{margin:"0.1rem"}}>
                     Shipped
              </button>}

             {record?.status?.toLowerCase().trim()!=="stored" && <button  className="donation-request-view-button-stored" style={{margin:"0.1rem"}}>
                Stored
              </button>}

              { record?.status?.toLowerCase().trim()!=="pending" && <button  className="donation-request-view-button-pending" style={{margin:"0.1rem"}}>
                Pending
              </button>}
                    </div>
            )
        }
    },
      {
      title: "View",
      key: "view",
      render: (_, record) => (
        <button
          onClick={() => viewClick(record)}
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
  const [fileArray, setFileArray] = React.useState([]);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [validImages, setValidImages] = React.useState("");
  const [downloadUrlArray, setDownloadUrlArray] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [isModalOpena, setIsModalOpena] = React.useState(false);
  const [appealData, setAppealData] = React.useState({});
  const [filteredData, setFilteredData] = React.useState(data);
  const [statusData, setStatusData] = React.useState({});
  const [openu, setOpenu] = React.useState(false);

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
  }, [pageNumber, filteredData, totalPages]);

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
      <div className="token-request">
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
            Token Requests
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
            Token Request Details
          </h2>
        }
        open={isModalOpena}
        onOk={handleOka}
        onCancel={handleCancela}
        footer={null}
        zIndex={50000}
      >
        <div style={{ width: "100%" }}>
          <p style={pStyles2}>
            Requested Id : <span style={pStyles}>{appealData?.swapId}</span>
          </p>
          <p style={pStyles2}>
            Customer Name :{" "}
            <span style={pStyles}>{appealData?.customerName}</span>
          </p>
          <p style={pStyles2}>
            Customer Address :{" "}
            <span style={pStyles}>{appealData?.customerAddress}</span>
          </p>
          <p style={pStyles2}>
            Customer Id : <span style={pStyles}>{appealData?.customerId}</span>
          </p>
          <p style={pStyles2}>
            Item Name : <span style={pStyles}>{appealData?.itemName}</span>
          </p>
          <p style={pStyles2}>
            Item Id : <span style={pStyles}>{appealData?.itemId}</span>
          </p>

          {/* <div style={{width:"100%", marginTop: "1rem",}}>
           <img src={appealData?.itemPicture}  style={{width:"100%",borderRadius:"10px",}}/>
          </div> */}

          <br />
        

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <button className="q-submit-btn" onClick={handleCancela}>
              Okay
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

export default TokenRequest;
