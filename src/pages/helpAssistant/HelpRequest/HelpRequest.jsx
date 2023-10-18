import React,{useState} from "react";
import "./HelpRequest.css";
import { Space, Table, Tag } from "antd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Modal } from "antd";
import toast, { Toaster } from "react-hot-toast";
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
import { useDispatch, useSelector } from "react-redux";
import { checkHelpRequestFromHelpAssistant, getHelpRequests, resetHelp } from "../../../redux/helpSlice";
import { getUserById } from "../../../redux/userSlice";
import { fetchAllUsers } from "../../../redux/adminSlice";
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
  marginTop:"0.5rem",
  color:"black",
};

const pStylesReply={
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  marginTop:"0.5rem",
  color:"#28bf06",
}

const pStyles2 = {
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1rem",
    marginTop:"0.5rem",
    color:"#616263"
  };
  const pStyles2Message={
    fontSize: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1rem",
    marginTop:"0.5rem",
    color:"#6487fa"
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




const HelpRequest = () => {
  const dispatch=useDispatch();
  const {helpLoading,helpArray,sendReplyStatus}=useSelector((state)=>state.help);
  const {userArrayByAdmin}=useSelector((state)=>state.admin);
  const {screen,user,openRedux}=useSelector((state)=>state.user);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [paginationKey, setPaginationKey] = React.useState(0);
  const [reply, setReply] = useState('');

  const columns = [
    {
      title: "Help Request Id",
      dataIndex: "helpRequestId",
      key: "helpRequestId",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    // {
    //   title: "Message",
    //   dataIndex: "message",
    //   key: "message",
    // },
    {
      title: "Received Date and Time",
      key: "receivedTime",
      render:(_,record)=>{
        const receivedTime = new Date(record.receivedTime);
        const localReceivedTime = receivedTime.toLocaleString();
        return (
          <span>{localReceivedTime}</span>
        )

      }
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        let color;
        switch (record?.status) {
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
  
        return <span  
        // onClick={()=>statusClick(record)}
        style={{ color,fontWeight:"bold",fontSize:"1rem",cursor:"pointer" }}>{record.status?"Resolved":"Unresolved"}</span>;
      },
    },
  
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
        disabled={record?.status?true:false}
        onClick={()=>viewClick(record)}
          className={!record?.status?"donation-request-view-button":"donation-request-view-button-replied"}
        >
          {!record?.status?"Reply":"Replied"}
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
  const [data,setData]=React.useState(helpArray);
  const [filteredData, setFilteredData] = React.useState(data); 
  const [statusData,setStatusData]=React.useState({});
  const [selectedDates, setSelectedDates] = React.useState([null, null]);
  const [openu, setOpenu] = React.useState(false);
  const [filteredArrayByDate, setFilteredArrayByDate] = React.useState([]);

  React.useEffect(()=>{
       dispatch(getHelpRequests())
  },[]);

  React.useEffect(()=>{
     const arrangedArray=helpArray?.map((item,index)=>{
         return {...item,key:index+1}
     })
     setData(arrangedArray)
     setFilteredData(arrangedArray)
  },[helpArray]);

 




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

console.log(filteredData)
 
React.useEffect(() => {
  if (selectedValue !== "") {
    setPageNumber(1);
    const filtered = data.filter((item)=>{
        if(selectedValue?.toLowerCase().trim()==="unresolved"){
          if(item.status===false){
            return item;
          }
        }else if(selectedValue?.toLowerCase().trim()==="resolved"){
          if(item.status===true){
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
      const requestDate = new Date(item?.receivedTime);

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
    dispatch(fetchAllUsers())
    setAppealData(data);
    setIsModalOpena(true);
  };

 console.log(userArrayByAdmin,"po")



  const showModala = () => {
    setIsModalOpena(true);
  };
  const handleOka = () => {
    setIsModalOpena(false);
  };
  const handleCancela = () => {
    setIsModalOpena(false);
  };

  const sendReplyClick=()=>{
    if(reply!==""){
      const payload={
        "helpRequestId":appealData?.helpRequestId,
         "helpAssistantId":user?.userId, 
         "reply":reply,
      }

      dispatch(checkHelpRequestFromHelpAssistant({...payload}))
    }


   
  }

  React.useEffect(()=>{
     if(helpLoading===false && sendReplyStatus===true){
      setReply("");
      dispatch(resetHelp());
      setIsModalOpena(false);
      dispatch(getHelpRequests())
      toast.success("Replied successfully..!")
     }
  },[helpLoading])

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
  const handleAutoCompleteChange = (value) => {
    setSelectedValue(value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
  };

  const handleReplyChange = (event) => {
    const { value } = event.target;
    setReply(value);
  };
 

  return (
    <>
      <div className="help-request"
       style={{ paddingLeft: openRedux && screen > 650 ? "270px" : "1rem" }}
       >

        <div style={{ width: "100%", alignItems: "center",
        display:"flex",
        justifyContent:"center",marginTop:"1rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "0rem",
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

          <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: screen < 520 ? "column" : "row",
            marginTop:"1rem",
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
                  value:"Unresolved"
                },{
                  value:"Resolved"
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
        zIndex={50000}
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
        open={helpLoading}

      >
        <CircularProgress color="inherit" size={50} />
      </Backdrop>
     

      <Modal title={<h2 style={{color:"#00425A",
        fontSize:"1.5rem",marginBottom:"1rem"}}>Help Request Details</h2>}
       open={isModalOpena} onOk={handleOka} onCancel={handleCancela}
       footer={null}
         zIndex={50000}
       >

       <div style={{width:"100%",}}>
       <p style={pStyles2}>Customer Name : &nbsp;
       <span style={pStyles}>{userArrayByAdmin?.find((item)=>item?.userId==appealData?.customerId)?.firstName}</span>&nbsp;
       <span style={pStyles}>{userArrayByAdmin?.find((item)=>item?.userId==appealData?.customerId)?.lastName}</span>
       </p>
        <p style={pStyles2}>Subject : <span style={pStyles}>{appealData?.subject}</span></p>
        <p style={pStyles2Message}>{appealData.message}</p>
      

        {/* <p style={pStylesReply} >Reply</p> */}
        <TextArea
        rows={4}
        style={{ marginTop: "1rem", width: "100%" }}
        placeholder="Reply..."
        value={reply}
        onChange={handleReplyChange}
      />
        {/* <Input placeholder="Reason for appeal" style={{width:"100%",marginTop:"0.3rem"}}/> */}

        {/* <p style={pStyles}>Describe Objection</p>
        <TextArea rows={4} style={{marginTop:"0.3rem",width:"100%",}} /> */}

        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"1rem"}}>
        <button className="q-submit-btn" onClick={sendReplyClick}>Submit</button>
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

export default HelpRequest;
