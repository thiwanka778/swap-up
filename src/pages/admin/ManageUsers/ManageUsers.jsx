import React, { useState } from "react";
import "./ManageUsers.css";
import { Space, Table, Tag, Modal } from "antd";
import Avatar from "@mui/material/Avatar";
import { Outlet, useNavigate } from "react-router-dom";
import { AutoComplete } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import {
  adminReset,
  fetchAllUsers,
  putUserOnHold,
} from "../../../redux/adminSlice";
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
};

const p2Styles = {
  fontSize: "1rem",
  fontFamily: "'Inter', sans-serif",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  color: "#626363",
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

const ManageUsers = () => {
  const dispatch = useDispatch();
  const [openu, setOpenu] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [paginationKey, setPaginationKey] = React.useState(0);
  const [filteredDataByStatus, setFilteredDataByStatus]=React.useState([]);
  const [status,setStatus]=React.useState("");
  const {
    userArrayByAdmin,
    putOnHoldStatus,
    adminLoading,
    removeUserHoldStatus,
  } = useSelector((state) => state.admin);
  const { user, screen, openRedux } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [enableData, setEnableData] = React.useState({});
  const [selectedValue, setSelectedValue] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const [filteredDataByEmail, setFilteredDataByEmail] = React.useState([]);
  const [filteredDataByUserType, setFilteredDataByUserType] = React.useState(
    []
  );

  React.useEffect(() => {
    const transformedArray = userArrayByAdmin.map((user, index) => {
      return {
        key: index + 1,
        ...user,
      };
    });

    setData(transformedArray);
  }, [userArrayByAdmin]);

  const columns = [
    {
      title: "USER ID",
      dataIndex: "userId",
      key: "userId",
    },

    {
      title: "NAME",
      render: (_, record) => {
        const fullName = record?.firstName + " " + record?.lastName;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt={fullName} src={record?.profilePicture} />
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginLeft: "0.8rem",
              }}
            >
              {fullName}
            </p>
          </div>
        );
      },
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "USER TYPE",
      render: (_, record) => {
        const userType = record?.role;
        const userTypeFormatted = userType
          .split("_")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginLeft: "0.8rem",
              }}
            >
              {userTypeFormatted}
            </p>
          </div>
        );
      },
    },

    {
      title: "ACCOUNT STATUS",

      render: (_, record) => {
        if (record?.activeStatus) {
          return (
            <span
              onClick={() => enableClick(record)}
              style={{
                padding: "3px 6px",
                border: "3px solid #04db33",
                color: "#04db33",
                cursor: "pointer",
              }}
            >
              ENABLED
            </span>
          );
        } else {
          return (
            <span
              onClick={() => enableClick(record)}
              style={{
                padding: "3px 6px",
                border: "3px solid #ff1605",
                color: "#ff1605",
                cursor: "pointer",
              }}
            >
              DISABLED
            </span>
          );
        }
      },
    },

    {
      title: "Action",
      render: (_, record) => (
        <span>
          <button
            className="admin-complaint-view"
            onClick={() => navigate(`/view-profile/${record?.userId}`)}
            style={{ marginRight: "0.4rem" }}
          >
            View
          </button>
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
  const [fileArray, setFileArray] = React.useState([]);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [validImages, setValidImages] = React.useState("");
  const [downloadUrlArray, setDownloadUrlArray] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);

  const [isModalOpena, setIsModalOpena] = React.useState(false);
  const [viewData, setViewData] = React.useState({});
  const [filteredData, setFilteredData] = React.useState([]);
  const [reason, setReason] = React.useState("");

  // React.useEffect(() => {
  //   setFilteredData(data);
  // }, [data, userArrayByAdmin]);

  const showModal = () => {
    setIsModalOpen(true);
    setFileArray([]);
    setValidImages("");
    setUploadFile(null);
    setDownloadUrlArray([]);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setEnableData({});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setEnableData({});
  };

  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  React.useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  //  console.log("filtered data ",filteredData);
  React.useEffect(() => {
    if (name.trim() !== "") {
      setPageNumber(1);
      const filtered = data.filter((item) => {
        const fullName = (item.firstName + " " + item.lastName).toLowerCase();
        const fullNameR = (item.lastName + " " + item.firstName).toLowerCase();
        const fullNameWithOutSpace = (
          item.firstName +
          "" +
          item.lastName
        ).toLowerCase();
        const fullNameWithOutSpaceR = (
          item.lastName +
          "" +
          item.firstName
        ).toLowerCase();
        return (
          fullName.trim().includes(name.toLowerCase().trim()) ||
          fullNameR.trim().includes(name.toLowerCase().trim()) ||
          fullNameWithOutSpace.trim().includes(name.toLowerCase().trim()) ||
          fullNameWithOutSpaceR.trim().includes(name.toLowerCase().trim()) ||
          item.firstName
            .toLowerCase()
            .trim()
            .includes(name.toLowerCase().trim()) ||
          item.lastName.toLowerCase().trim().includes(name.toLowerCase().trim())
        );
      });

      setFilteredData(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setPaginationKey((prevKey) => prevKey + 1);
    } else if (name.trim() === "") {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [name, data]);

  React.useEffect(() => {
    if (email.trim() !== "") {
      setPageNumber(1);
      const filtered = filteredData.filter((item) => {
        return item.email
          .toLowerCase()
          .trim()
          .includes(email.toLowerCase().trim());
      });

      setFilteredDataByEmail(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setPaginationKey((prevKey) => prevKey + 1);
    } else if (email.trim() === "") {
      setFilteredDataByEmail(filteredData);
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }
  }, [email, filteredData]);

  React.useEffect(() => {
    if (selectedValue.trim() !== "") {
      setPageNumber(1);
      const filtered = filteredDataByEmail.filter((item) => {
        const wordsArray = item.role.split("_"); // Split the sentence by underscores

        const concatenatedSentence = wordsArray.join(" ");
        if (
          concatenatedSentence
            .toLowerCase()
            .trim()
            .includes(selectedValue.toLowerCase().trim())
        ) {
          return item;
        }
      });

      setFilteredDataByUserType(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setPaginationKey((prevKey) => prevKey + 1);
    } else if (selectedValue.trim() === "") {
      setFilteredDataByUserType(filteredDataByEmail);
      setTotalPages(Math.ceil(filteredDataByEmail.length / itemsPerPage));
    }
  }, [selectedValue, filteredDataByEmail]);


  React.useEffect(()=>{
    if(status.trim()!==""){
      setPageNumber(1);
      const filtered = filteredDataByUserType.filter((item) => {
        if(status.toLowerCase()==="enabled"){
           if(item?.activeStatus===true){
             return item;
           }
        }else if(status.toLowerCase()==="disabled"){
           if(item?.activeStatus===false){
             return item;
           }
        }
      });
      setFilteredDataByStatus(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setPaginationKey((prevKey) => prevKey + 1);

    }else{
      setFilteredDataByStatus(filteredDataByUserType);
      setTotalPages(Math.ceil(filteredDataByUserType.length / itemsPerPage));
    }

  },[status,filteredDataByUserType])

  React.useEffect(() => {
    setDisplayItems((prevState) => {
      const startIndex = pageNumber * itemsPerPage - itemsPerPage;
      const endIndex = pageNumber * itemsPerPage - 1;
      setFrom(startIndex + 1);
      const slicedData = filteredDataByStatus?.slice(
        startIndex,
        endIndex + 1
      );
      const actualItemsPerPage = slicedData.length;
      const toValue = startIndex + actualItemsPerPage;
      setTo(toValue);
      return slicedData;
    });
  }, [pageNumber, filteredDataByEmail, filteredData, filteredDataByUserType,filteredDataByStatus]);

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

  const viewClick = (data) => {
    // console.log(data);
    setViewData(data);
    setIsModalOpena(true);
  };

  const handlePageChange = (event, page) => {
    setPageNumber(page);
  };

  const handleCloseDisableClick = () => {};

  React.useEffect(() => {
    if (adminLoading == false && putOnHoldStatus == true) {
      dispatch(fetchAllUsers());
      dispatch(adminReset());
      setIsModalOpen(false);
      setReason("");
    }
  }, [adminLoading]);

  const enableClick = (data) => {
    // console.log(data);
    setEnableData(data);
    setIsModalOpen(true);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value); // Update the 'reason' state with the new input value
  };

  const submitClick = () => {
    const payload = {
      adminId: user?.userId,
      customerId: enableData?.userId,
      action: enableData?.activeStatus ? false : true,
      reason: reason,
    };
    if (reason !== "") {
      dispatch(putUserOnHold(payload));
    }
  };

  const handelNameChange = (e) => {
    setName(e.target.value);
  };

  const handelEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAutoCompleteChange = (value) => {
    setSelectedValue(value);
  };

  const handleAutoCompleteChangeStatus=(value)=>{
    setStatus(value);
  }

  console.log(selectedValue);
  return (
    <>
      <div
        className="manage-users"
        style={{ paddingLeft: openRedux && screen > 650 ? "270px" : "1rem" }}
      >
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#00425A",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "0rem",
            }}
          >
            Manage Users
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            // flexDirection: screen < 520 ? "column" : "row",
            marginTop: "1rem",
          }}
        >
          <Input
            value={name}
            style={{
              width: 200,
              marginRight: "0.5rem",
            }}
            onChange={handelNameChange}
            allowClear={true}
            placeholder="Filter by name"
          />

          <Input
            value={email}
            style={{
              width: 200,
              marginRight: "0.5rem",
            }}
            onChange={handelEmailChange}
            allowClear={true}
            placeholder="Filter by email"
          />

          <AutoComplete
            style={{
              width: 200,
              marginRight: "0.5rem",
            }}
            onChange={handleAutoCompleteChange}
            options={[
              {
                value: "ADMIN",
              },
              {
                value: "HELP ASSISTANT",
              },
              {
                value: "QUALITY CHECKER",
              },
              {
                value: "CUSTOMER",
              },
              {
                value: "INVENTORY MANAGER",
              },
            ]}
            allowClear={true}
            placeholder="Filter by user type"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />


            <AutoComplete
            style={{
              width: 200,
              marginRight: "0.5rem",
            }}
            onChange={handleAutoCompleteChangeStatus}
            options={[
              {
                value: "Enabled",
              },
              {
                value: "Disabled",
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

      <Backdrop sx={{ color: "gold", zIndex: 1500 }} open={adminLoading}>
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
            {enableData?.activeStatus === true
              ? "Disable Account"
              : "Enable Account"}
          </h2>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        zIndex={50000}
      >
        <div style={{ width: "100%" }}>
          <p style={pStyles}>Reason</p>
          <TextArea
            rows={4}
            style={{ marginTop: "0.3rem", width: "100%" }}
            value={reason} // Bind the value of the TextArea to the 'reason' state
            onChange={handleReasonChange} // Set the onChange handler
          />

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
              style={{
                background: enableData?.activeStatus === true ? "red" : "green",
              }}
              onClick={submitClick}
              // onClick={requestTokenSubmitClick}
            >
              {enableData?.activeStatus === true ? "Disable" : "Enable"}
            </button>
            {/* <button
              className="q-cancel-btn"
              onClick={handleCancel}
              style={{ marginLeft: "1rem" }}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageUsers;
