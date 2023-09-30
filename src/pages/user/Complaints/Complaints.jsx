import React,{useState} from "react";
import "./Complaints.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, Modal } from "antd";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
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
import { useSelector } from "react-redux";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getHelpRequestById, helpRequest, resetUser } from "../../../redux/userSlice";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;

const pStyles = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop: "0.5rem",
};




const Complaints = () => {
  const dispatch=useDispatch();
  const {screen,createHelpRequest,userLoading,user,complaintArray,openRedux}=useSelector((state)=>state.user);
  const [selectedValue, setSelectedValue] = React.useState("");
  const columns = [
    {
      title: "Help Request Id",
      dataIndex: "helpRequestId",
      key: "helpRequestId",
    },
    {
      title: "Date Reported",
      key: "receivedTime",
      render:(_,record)=>{
         // Convert the UTC date to a local date
    const utcDate = new Date(record.receivedTime);
    const localDate = utcDate.toLocaleString();

        return (
          <span>{localDate}</span>
        )
      }
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        let color;
        switch (record.status) {
          case true:
            color = "#13d609";
            break;
          case false:
            color = "blue";
            break;
          default:
            color = "black"; // Fallback color for any other status
            break;
        }

        return (
          <span style={{ color, fontWeight: "bold", fontSize: "1rem",whiteSpace:"nowrap" }}>
            {record.status?"Completed":"In progress"}
          </span>
        );
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
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filteredArrayByDate, setFilteredArrayByDate] = React.useState([]);
  const [fileArray, setFileArray] = React.useState([]);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [validImages, setValidImages] = React.useState("");
  const [data,setData] =React.useState([]);
  const [filteredData, setFilteredData] = React.useState(data);
  const [downloadUrlArray, setDownloadUrlArray] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [paginationKey, setPaginationKey] = React.useState(0);
  const [selectedDates, setSelectedDates] = React.useState([null, null]);

  const [isModalOpena, setIsModalOpena] = React.useState(false);
  const [appealData, setAppealData] = React.useState({});


  React.useEffect(()=>{
  dispatch(getHelpRequestById(user?.userId))
  },[user]);

  React.useEffect(()=>{
   const getData=complaintArray.map((item,index)=>{
                 return {...item,key:index}
   });
   setData(getData);
  },[complaintArray]);

  React.useEffect(()=>{
        setFilteredData(data);
  },[data])

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
    // setFileArray([]);
    // setValidImages("");
    // setUploadFile(null);
    // setDownloadUrlArray([]);
  };
  const submitComplain=()=>{
    if(message!=="" && subject!==""){
      const customerId=user?.userId;
      dispatch(helpRequest({customerId,message,subject}))
    }
  }

  React.useEffect(()=>{
    if(userLoading===false){
      if(createHelpRequest){
        setIsModalOpen(false);
        setMessage("");
        setSubject("");
        dispatch(resetUser());
        dispatch(getHelpRequestById(user?.userId))
      }
    
    }

  },[userLoading])



  React.useEffect(() => {
    if (selectedValue !== "") {
      setPageNumber(1);
      
     const filtered = data.filter((item)=>{
         if(selectedValue==="in progress"){
             if(item?.status===false){
              return item
             }
         }else{
            if(item?.status){
              return item
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
        const requestDate = new Date(item.receivedTime);

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
  }, [pageNumber, filteredData, data,filteredArrayByDate]);

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

  const handlePageChange = (event, page) => {
    setPageNumber(page);
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
      setDownloadUrlArray(downloadUrls);
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const appealClick = (data) => {
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

 

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
  };
  const handleAutoCompleteChange = (value) => {
    setSelectedValue(value);
  };
console.log(selectedValue)

  return (
    <>
      <div className="complaints"  style={{paddingLeft:(openRedux&&screen>650)?"270px":"1rem"}} >
      <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              position: screen < 584 ? "" : "absolute",
            }}
          >
            Submitted Complaints
          </p>

          <button
            style={{
              marginLeft: screen < 584 ? "1rem" : "auto",
              whiteSpace: "nowrap",
            }}
            className="new-swap-button"
            onClick={showModal}
          >
            New Complain
          </button>
        </div>
       
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: screen < 520 ? "column" : "row",
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
                value:"in progress"},
                {
                value:"completed"}
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
      >
        <div style={{ width: "100%" }}>
          <p style={pStyles}>Subject</p>
          <Input
           value={subject}
           onChange={handleSubjectChange}
            style={{ width: "100%", marginTop: "0.3rem" }}
            placeholder="Complaint Subject"
          />
          <p style={pStyles}>Message</p>
          <TextArea 
           value={message}
           onChange={handleMessageChange}
          rows={4} style={{ marginTop: "0.3rem", width: "100%" }} />

       

          {/* <label
            className="custom-file-upload"
            onChange={handleFileSelect}
            style={{ marginTop: "1rem" }}
          >
            <input type="file" multiple />
            Choose images
          </label> */}

          {/* <div style={{ width: "100%", marginTop: "1rem" }}>
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
          </div> */}

          {/* {fileArray?.length>=1 &&<div style={{width:"100%",display:"flex",alignItems:"center",marginTop:"1rem",color:"red",}}>
{fileArray?.length<2?"Please select at least 5 images !":""}
</div>} */}

          {/* {fileArray?.length >= 1 && (
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
          )} */}

          {/* {downloadUrlArray?.length >= 1 && (
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
          )} */}

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <button className="q-submit-btn" onClick={submitComplain}>
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

      <Backdrop sx={{ color: "gold", zIndex: 1500 }} open={userLoading}>
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
            Appeal
          </h2>
        }
        open={isModalOpena}
        onOk={handleOka}
        onCancel={handleCancela}
        footer={null}
      >
        <div style={{ width: "100%" }}>
          <p style={pStyles}>
            Item Id : <span>{appealData?.itemId}</span>
          </p>
          <p style={pStyles}>
            Item Name : <span>{appealData?.itemName}</span>
          </p>
          <br />
          <p style={pStyles}>Reason for appeal</p>
          <Input
            placeholder="Reason for appeal"
            style={{ width: "100%", marginTop: "0.3rem" }}
          />

          <p style={pStyles}>Describe Objection</p>
          <TextArea rows={4} style={{ marginTop: "0.3rem", width: "100%" }} />

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
              Submit
            </button>
            <button
              className="q-cancel-btn"
              style={{ marginLeft: "1rem" }}
              onClick={handleCancela}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Complaints;
