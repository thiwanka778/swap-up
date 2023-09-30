import React, { useState } from "react";
import "./Profile.css";
import { Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { nanoid } from "nanoid";
import { getUserById, resetUser, updateProfilePicture } from "../../../redux/userSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditProfilePicture = () => {
  const dispatch=useDispatch();
  const {screen,updateProfilePictureStatus,profile,user,userLoading}=useSelector((state)=>state.user);
  const customerId=user?.userId;
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [downloadUrlArray, setDownloadUrlArray] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(false);



const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // Load the preview if it's not available
      await getBase64(file.originFileObj)
        .then((result) => {
          file.preview = result;
        })
        .catch((error) => {
          console.error("Error loading preview:", error);
        });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

const handleChangeImages = ({ fileList: newFileList }) => {
    // Update the status for each file in the fileList to prevent the "upload error" tooltip.
    const updatedFileList = newFileList.map(async (file) => {
      if (file) {
        file.status = "done"; // Set status to 'done' for successfully uploaded files.
        if (!file.url && !file.preview) {
          // Load the preview if it's not available
          await getBase64(file.originFileObj)
            .then((result) => {
              file.preview = result;
              setPreviewImage(file.url || file.preview);
              setPreviewOpen(true);
              setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
            })
            .catch((error) => {
              console.error("Error loading preview:", error);
            });
        }
      }
      return file;
    });

    const updatedFileList2 = newFileList.map((file) => {
        if (file) {
          file.status = "done"; // Set status to 'done' for successfully uploaded files.
        }
        return file;
      });
  
      setFileList(updatedFileList2);
  
    // Set the fileList with updated files
    // setFileList(updatedFileList);
  };


  React.useEffect(()=>{
       setPreviewImage("")
  },[fileList])


  
  const uploadImagesToFirebase = async () => {
    if(fileList?.length===0){
      return;
    }
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

  React.useEffect(()=>{
       if(userLoading===false){
        if(updateProfilePictureStatus===true){
         
          dispatch(getUserById(user?.userId));
          dispatch(resetUser())
              setDownloadUrlArray([])
        }
       }
  },[userLoading])

  React.useEffect(()=>{
    if(downloadUrlArray.length>=1){
      const id=customerId;
      const profilePic=downloadUrlArray[0];

      dispatch(updateProfilePicture({id,profilePic}))
    }

  },[downloadUrlArray])
  


//   const handleChangeImages = ({ fileList: newFileList }) => {
//     // Update the status for each file in the fileList to prevent the "upload error" tooltip.
//     const updatedFileList = newFileList.map((file) => {
//       if (file) {
//         file.status = "done"; // Set status to 'done' for successfully uploaded files.
//       }
//       return file;
//     });

//     setFileList(updatedFileList);
//   };
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

  console.log(fileList,"previewImage")

  return (
    <>
    <div>

      <div style={{paddingLeft:"1rem" }}>
        <Upload
         listType="picture-card"
          maxCount={1}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChangeImages}
        >
     {fileList.length ===1 ? null : uploadButtonComponent}
     
        </Upload>
      </div>

      <div style={{width:"100%",padding:"1rem"}}>
        <img style={{width:screen<867?"100%":"400px",borderRadius:"10px",
        boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
      }} src={previewImage}/>
      </div>

    {fileList?.length>=1 &&  <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
        <button 
        onClick={uploadImagesToFirebase}
        className="profile-pic-save-btn">Save</button>
        </div>}

    </div>



    <Backdrop sx={{ color: "gold", zIndex: 1500 }} open={imageLoading}>
        <CircularProgress color="inherit" size={50} />
      </Backdrop>
    </>
  );
};

export default EditProfilePicture;
