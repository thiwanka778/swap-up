import React, { useState } from "react";
import "./QualityCheck.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button, Modal } from "antd";
import { AutoComplete } from "antd";
import { NoEncryption } from "@mui/icons-material";
import {
  fetchAllRequestTokens,
  requestTokenFromCustomer,
  resetUser,
} from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
// import { format } from 'date-fns';
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
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useSelector } from "react-redux";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const pStyles = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop: "0.5rem",
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

const QualityCheck = () => {
  const dispatch = useDispatch();
  const {
    openRedux,
    screen,
    requestTokenStatus,
    userLoading,
    user,
    requestTokenData,
  } = useSelector((state) => state.user);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [selectedDates, setSelectedDates] = React.useState([null, null]);
  const [fileList, setFileList] = useState([]);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [des, setDes] = useState("");
  const [data, setData] = React.useState([...requestTokenData]);
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
  const [viewData, setViewData] = React.useState({});
  const [statusOptions, setStatusOptions] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(data);
  const [paginationKey, setPaginationKey] = React.useState(0);
  const [filteredArrayByDate, setFilteredArrayByDate] = React.useState([]);

  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 10,
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

  // console.log("data", data);

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
        let btnLabel=""
        if(record.status===0){
            btnLabel="Pending"
        }else if(record.status===1){
          btnLabel="Completed"
        }else{
          btnLabel="Rejected"
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
        <button
          onClick={() => viewClick(record)}
          className="view-requested-token-details-btn"
        >
          View
        </button>
      ),
    },
  ];

 

  const handleAutoCompleteChange = (value) => {
    setSelectedValue(value);
  };

  React.useEffect(() => {
    const statusArray = data?.map((item) => {
      return item?.status;
    });
    const statusSet = new Set(statusArray);
    const newArray = Array.from(statusSet);
    const tempArray = newArray?.map((item) => {
      return { value: item };
    });

    setStatusOptions(tempArray);
  }, [data]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
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
    // setFileArray([]);
    // setValidImages("");
    // setUploadFile(null);
    // setDownloadUrlArray([]);
  };

  React.useEffect(() => {
    if (des !== "") {
      const payload = {
        customerId: user?.userId,
        itemDescription: des,
        itemImage: downloadUrlArray[0],
      };
      dispatch(requestTokenFromCustomer({ ...payload }));
    }
  }, [downloadUrlArray]);

  React.useEffect(() => {
    if (userLoading === false) {
      if (requestTokenStatus === true) {
        setDes("");
        setDownloadUrlArray([]);
        setIsModalOpen(false);
        dispatch(resetUser());
        setFileList([]);
        const userId = user?.userId;
        const email = user.email;
        dispatch(fetchAllRequestTokens({ userId, email }));
      } else {
        console.log("request token error");
      }
    }
  }, [userLoading]);

  React.useEffect(() => {
    const userId = user?.userId;
    const email = user.email;
    dispatch(fetchAllRequestTokens({ userId, email }));
  }, [user]);

  const requestTokenSubmitClick = () => {
    // console.log("requestTokenSubmitClick");
    if(setFileList?.length>=1){
      uploadImagesToFirebase();
    }

  };

  React.useEffect(() => {
    if (selectedValue !== "") {
      setPageNumber(1);
      const filtered = data.filter((item)=>{
          if(selectedValue==="Pending"){
            if(item.status===0){
              return item;
            }
          }else if(selectedValue==="Completed"){
            if(item.status===1){
              return item;
            }
          }else{
            if(item.status!==1 && item.status!==0){
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

  const handlePageChange = (event, page) => {
    setPageNumber(page);
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
    setViewData({});
    setViewData(data);
    setIsModalOpena(true);
  };

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

  const handleCancelImage = () => setPreviewOpen(false);
  
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChangeImages = ({ fileList: newFileList }) => {
    // Update the status for each file in the fileList to prevent the "upload error" tooltip.
    const updatedFileList = newFileList.map((file) => {
      if (file) {
        file.status = "done"; // Set status to 'done' for successfully uploaded files.
      }
      return file;
    });

    setFileList(updatedFileList);
  };

  const uploadButtonComponent = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  const uploadImagesToFirebase = async () => {
    const urls = []; // Create an array to store download URLs
    setImageLoading(true);
    await Promise.all(
      fileList.map(async (file) => {
        if (file.status === "done") {
          const uniqueFilename = nanoid();
          const storageRef = ref(getStorage(), `images/${uniqueFilename}`);

          // Upload the file
          await uploadBytes(storageRef, file.originFileObj);

          // Get the download URL for the uploaded file
          const downloadURL = await getDownloadURL(storageRef);
          urls.push(downloadURL); // Add the URL to the array

          console.log(`File uploaded to Firebase Storage: ${downloadURL}`);
        }
      })
    );

    // Set the download URLs in the state
    setDownloadUrlArray(urls);
    setImageLoading(false);
  };

  const handleFromDateChange = (newValue) => {
    if (newValue) {
      setFromDate(newValue);
    } else {
      setFromDate(null);
    }
  };

  const handleToDateChange = (newValue) => {
    if (newValue) {
      // Format the date using date-fns and store it in the desired format
      // setToDate(format(new Date(newValue), 'yyyy-MM-dd'));
      setToDate(newValue);
    } else {
      setToDate(null);
    }
  };

  // console.log(fromDate)
  // console.log(toDate)

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
  };
  console.log(selectedDates);
  const thirtyDaysAgo = dayjs().subtract(30, "days").format(dateFormat);
  const currentDate = dayjs().format(dateFormat);

  const handleTextAreaChange = (e) => {
    setDes(e.target.value);
  };
  // console.log(selectedValue)
  return (
    <>
      <div
        className="q-check"
        style={{ paddingLeft: openRedux && screen > 650 ? "270px" : "1rem" }}
      >
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
              position: screen < 465 ? "" : "absolute",
            }}
          >
            Token Requests
          </p>

          <button
            style={{
              marginLeft: screen < 465 ? "1rem" : "auto",
              whiteSpace: "nowrap",
            }}
            className="new-swap-button"
            onClick={showModal}
          >
            New Token
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
                  value:"Completed"
                },{
                  value:"Pending"
                },
                {
                  value:"Rejected"
                }
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
            Request a new token
          </h2>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ width: "100%" }}>
         
          <p style={pStyles}>Description</p>

          <TextArea
            value={des}
            onChange={handleTextAreaChange}
            rows={4}
            style={{ marginTop: "0.3rem", width: "100%" }}
          />

          {/* <p style={pStyles}>Desired outcome</p>
  <TextArea rows={3} style={{marginTop:"0.3rem",width:"100%",}} /> */}

          <div className="notice" style={{ marginTop: "1rem" }}>
            <p style={pStyles}>
              Please provide three high-quality photos of the dress:
            </p>
            <ol>
              <li>Front view of the dress.</li>
              <li>Back view of the dress.</li>
              <li>
                An additional photo showcasing any specific details or angles
                you'd like to highlight.
              </li>
            </ol>
            <p
              style={{
                marginTop: "0.5rem",
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#757478",
              }}
            >
              <span style={{ color: "#f21202", fontWeight: "bold" }}>
                *&nbsp;
              </span>
              These photos will help ensure an accurate representation of the
              dress for potential swappers. Thank you for your cooperation.
            </p>
          </div>

         

          <div style={{ marginTop: "1rem" }}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangeImages}
            >
              {fileList.length >= 3 ? null : uploadButtonComponent}
            </Upload>
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
            <button
              className="q-submit-btn"
              // disabled={fileList?.length===3?false:true}
              onClick={requestTokenSubmitClick}
            >
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
            <div style={{ width: "100%", padding: "1rem" }}>
              <img
                src={viewData?.itemImage}
                style={{ width: "100%", borderRadius: "10px" }}
              />
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
              <button className="q-submit-btn" onClick={handleCancela}>
                OKAY
              </button>
              
            </div>
          </div>
        </Modal>
      )}

      {/* image preview */}

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelImage}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default QualityCheck;
