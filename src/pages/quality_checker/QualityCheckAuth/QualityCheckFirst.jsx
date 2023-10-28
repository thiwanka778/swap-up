import React from "react";
import "./QualityCheckAuth.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import toast, { Toaster } from "react-hot-toast";
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
import { useNavigate } from "react-router-dom";
import { getRequestToken, rejectRequestToken, resetQualityChecker } from "../../../redux/qualityCheckerSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
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

const QualityCheckFirst = () => {
  const dispatch = useDispatch();
  const { screen, user, openRedux } = useSelector((state) => state.user);
  const { qLoading, requestTokenData,rejectRequestStatus } = useSelector(
    (state) => state.qualityChecker
  );
  const navigate = useNavigate();
  const columns = [
    {
      title: "Request Token Id",
      dataIndex: "requestTokenId",
      key: "RequestTokenId",
    },
    {
      title: "Request Date Time",
      key: "requestDateTime",
      render: (_, record) => {
        const date = record?.requestDateTime;
        const formattedDate = new Date(date).toLocaleString();

        return <span>{formattedDate}</span>;
      },
    },

    {
      title: "Status",
      key: "status",

      render: (_, record) => {
        let color;
        switch (record.status) {
          case 1:
            color = "#04ba25";
            break;
          case -1:
            color = "#fc1303";
            break;
          case 0:
            color = "blue";
            break;
          default:
            color = "blue"; // Fallback color for any other status
            break;
        }
        let btnLabel = "";
        if (record.status === 0) {
          btnLabel = "Pending";
        } else if (record.status === 1) {
          btnLabel = "Accepted";
        } else {
          btnLabel = "Rejected";
        }

        return (
          <span style={{ color, fontWeight: "bold", fontSize: "1rem" }}>
            {btnLabel}
          </span>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          

          {/* <button
          style={{margin:"0.1rem"}}
             onClick={() => acceptClick(record)}
            className="view-requested-token-details-btn"
          >
            View
          </button> */}

          <button
           disabled={record?.status===-1?true:false}
            onClick={() => viewClick(record)}
             className="view-requested-token-details-btn"
          >
            {/* {record?.status===-1?"Rejected":"Reject"} */}
            View
          </button>


        </>
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
  const [data, setData] = React.useState([...requestTokenData]);
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
  const [filteredArrayByDate, setFilteredArrayByDate] = React.useState([]);
  const [selectedDates, setSelectedDates] = React.useState([null, null]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [paginationKey, setPaginationKey] = React.useState(0);
  const [viewData, setViewData] = React.useState({});
  const [localData,setLocalData]=React.useState(()=>{
    const loData=window.localStorage.getItem("localData");
    return (loData && loData!=="undefined")?JSON.parse(loData):{};
  });

  React.useEffect(() => {
    const getData = requestTokenData?.map((item, index) => {
      return { ...item, key: index + 1 };
    });
    if (getData) {
      setData(getData);
      setFilteredData(getData);
    }
  }, [requestTokenData]);

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
    dispatch(getRequestToken());
  }, []);

  React.useEffect(() => {
    if (selectedValue !== "") {
      setPageNumber(1);
      const filtered = data.filter((item) => {
        if (selectedValue === "Pending") {
          if (item.status === 0) {
            return item;
          }
        } else if (selectedValue === "Accepted") {
          if (item.status === 1) {
            return item;
          }
        } else {
          if (item.status !== 1 && item.status !== 0) {
            return item;
          }
        }
      });
      setFilteredData(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setPaginationKey((prevKey) => prevKey + 1);
    } else {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [selectedValue, data]);

  React.useEffect(() => {
    if (
      selectedDates[0] !== null &&
      selectedDates[1] !== null &&
      selectedDates[0] !== "" &&
      selectedDates[1] !== ""
    ) {
      // Convert selected dates to Date objects
      const startDate = new Date(selectedDates[0]);
      const endDate = new Date(selectedDates[1]);

      // Filter the data based on the selected date range
      const filteredDataByDateRange = filteredData.filter((item) => {
        const requestDate = new Date(item.requestDateTime);

        return requestDate >= startDate && requestDate <= endDate;
      });
      setPageNumber(1);
      // console.log("filteredDataByDateRange",filteredDataByDateRange)
      setFilteredArrayByDate(filteredDataByDateRange);
      setTotalPages(Math.ceil(filteredDataByDateRange.length / itemsPerPage));
      setPaginationKey((prevKey) => prevKey + 1);
    } else {
      setFilteredArrayByDate(filteredData);
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }
  }, [selectedDates, data, filteredData]);

  React.useEffect(() => {
    setDisplayItems((prevState) => {
      const startIndex = pageNumber * itemsPerPage - itemsPerPage;
      const endIndex = pageNumber * itemsPerPage - 1;
      setFrom(startIndex + 1);
      const slicedData = filteredArrayByDate?.slice(startIndex, endIndex + 1);
      const actualItemsPerPage = slicedData.length;
      const toValue = startIndex + actualItemsPerPage;
      setTo(toValue);
      return slicedData;
    });
  }, [pageNumber, filteredData, filteredArrayByDate, data]);

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

  // const viewClick = (data) => {
  //   console.log(data);
  //   setAppealData(data);
  //   setIsModalOpena(true);
  // };

  const viewClick = (data) => {
    console.log(data);
    if(data?.itemImage){
      const imageArray=JSON.parse(data?.itemImage);
      const requiredObject={...data,itemImage:imageArray}
      setViewData({});
      setViewData(requiredObject);
      setIsModalOpena(true);
    }
    
  };

  const acceptClick=(data)=>{
    const imageArray=JSON.parse(data?.itemImage)
    const requiredObject={...data,itemImage:imageArray}
  setLocalData(requiredObject);
   console.log("click data",requiredObject)
  window.localStorage.setItem("localData",JSON.stringify(requiredObject))
  navigate("/listing")
  }
  // React.useEffect(()=>{
  //   console.log(localData,"QAUTH PAGE")
  //    window.localStorage.setItem("localData",JSON.stringify(localData))
  // },[localData])

  const showModala = () => {
    setIsModalOpena(true);
  };
  const handleOka = () => {
    setIsModalOpena(false);
    setViewData({});
  };
  const handleCancela = () => {
    setIsModalOpena(false);
    setViewData({});
  };
  const rejectRequestConfirmClick=()=>{
    // console.log(viewData,"vhbk")
  
    dispatch(rejectRequestToken({
      requestTokenId:viewData?.requestTokenId,
        qualityCheckerId:user?.userId,
    }))
    
  }

  React.useEffect(()=>{
   if(qLoading===false && rejectRequestStatus===true){
    setIsModalOpena(false);
    toast.success("Rejected successfully!");
    dispatch(resetQualityChecker());
    dispatch(getRequestToken())
   }
  },[qLoading])

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

  const handleAutoCompleteChange = (value) => {
    setSelectedValue(value);
  };
  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
  };

  return (
    <>
      <div
        className="quality-checker-token-request"
        style={{ paddingLeft: openRedux && screen > 650 ? "270px" : "1rem" }}
      >
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop:"0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Token Requests First Approval
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
          <button className="new-swap-button" 
          // onClick={showModal}
          onClick={()=>navigate("/listing")}
          >
            Add New Item
          </button>
        </div> */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: screen < 520 ? "column" : "row",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              marginRight: screen < 520 ? "0rem" : "2rem",
              marginBottom: screen < 520 ? "1rem" : "0rem",
            }}
          >
            <AutoComplete
              style={{
                width: 200,
              }}
              onChange={handleAutoCompleteChange}
              options={[
                {
                  value: "Accepted",
                },
                {
                  value: "Pending",
                },
                {
                  value: "Rejected",
                },
              ]}
              allowClear={true}
              placeholder="Filter by status"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </div>

          <RangePicker
            defaultValue={
              [
                // dayjs(thirtyDaysAgo, dateFormat),
                // dayjs(currentDate, dateFormat),
              ]
            }
            format={dateFormat}
            onChange={handleDateChange}
          />
        </div>

        <div style={{ marginTop: "1rem", width: "100%", overflowX: "auto" }}>
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
              key={paginationKey}
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
            Add a new item
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

          {fileArray?.length >= 1 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                color: "red",
              }}
            >
              {fileArray?.length < 5 ? "Please select at least 5 images !" : ""}
            </div>
          )}

          {fileArray?.length >= 5 && (
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

      {viewData?.itemImage && viewData?.itemImage !== "" && (
        <Modal
          title={
            <h2
              style={{
                color: "#00425A",
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Requested Item
            </h2>
          }
          open={isModalOpena}
          onOk={handleOka}
          onCancel={handleCancela}
          footer={null}
          zIndex={50000}
        >
          <div style={{ width: "100%" }}>
            <p style={pStyles}>
              Request Token Id : <span>{viewData?.requestTokenId}</span>
            </p>
            <p style={pStyles}>
              <span>{viewData?.itemDescription}</span>
            </p>
            <br />
            {/* images */}
            <div style={{ width: "100%", padding: "0.2rem" }}>
                {
                    viewData?.itemImage?.map((item,index)=>{
                        return (
                            <img key={index}
                            src={item}
                            style={{ width: "100%", borderRadius: "10px" }}
                          />
                        )
                    })
                }
             
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

              <button className="q-submit-btn" 
              style={{background:"red"}}
              onClick={rejectRequestConfirmClick}>
                Reject
              </button>
              <button 
              style={{marginLeft:"1rem",background:"green"}}
              className="q-submit-btn" onClick={handleCancela}>
                Accept
              </button>
              <button 
              style={{marginLeft:"1rem"}}
              className="q-submit-btn" onClick={handleCancela}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

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
          marginTop:"13vh",
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
    </>
  );
};

export default QualityCheckFirst;
