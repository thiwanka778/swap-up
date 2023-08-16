import React from "react";
import "./ViewProfile.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import Rating from "@mui/material/Rating";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllUsers } from "../../../redux/adminSlice";

const pStyles = {
  fontSize: "1.2rem",
  fontFamily: "'Ubuntu', sans-serif",
  fontWeight: "500",
  letterSpacing: "0.1rem",
};

const inputStyles = {
  borderRadius: "4px",
  border: "1px solid #d9d9d9",
  boxShadow: "none",
  fontSize: "1rem",
  padding: "1rem",
  width: "100%",
  fontWeight: "500",
  fontFamily: " 'Poppins', sans-serif",
  letterSpacing: "0.1rem",
  marginBottom: "1.5rem",
};
const data = [
  {
    key: "1",
    no: "01",
    date: "02/06/2023",
    name: "Sunil Perera",
    userType: "Member",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
  },
  {
    key: "2",
    no: "02",
    date: "03/06/2023",
    name: "Emma Watson",
    userType: "Quality Checker",
    accountStatus: "Disabled",
    gender: "female",
    url: "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
  },
  {
    key: "3",
    no: "03",
    date: "04/06/2023",
    name: "John Doe",
    userType: "Delivery Manager",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg",
  },
  {
    key: "4",
    no: "04",
    date: "05/06/2023",
    name: "Alice Smith",
    userType: "Member",
    accountStatus: "Disabled",
    gender: "female",
    url: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-842811.jpg&fm=jpg",
  },
  {
    key: "5",
    no: "05",
    date: "06/06/2023",
    name: "Robert Johnson",
    userType: "Quality Checker",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://images.unsplash.com/photo-1600804889194-e6fbf08ddb39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFuZHNvbWUlMjBtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    key: "6",
    no: "06",
    date: "07/06/2023",
    name: "Sophia Lee",
    userType: "Delivery Manager",
    accountStatus: "Enabled",
    gender: "female",
    url: "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg",
  },
  {
    key: "7",
    no: "07",
    date: "08/06/2023",
    name: "David Brown",
    userType: "Member",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },
  {
    key: "8",
    no: "08",
    date: "09/06/2023",
    name: "Olivia Wilson",
    userType: "Quality Checker",
    accountStatus: "Disabled",
    gender: "female",
    url: "https://images.unsplash.com/photo-1506795660198-e95c77602129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwd29tYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    key: "9",
    no: "09",
    date: "10/06/2023",
    name: "Michael Anderson",
    userType: "Delivery Manager",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://img.freepik.com/free-photo/cheerful-dark-skinned-woman-smiling-broadly-rejoicing-her-victory-competition-among-young-writers-standing-isolated-against-grey-wall-people-success-youth-happiness-concept_273609-1246.jpg",
  },
  {
    key: "10",
    no: "10",
    date: "11/06/2023",
    name: "Ava Martinez",
    userType: "Member",
    accountStatus: "Disabled",
    gender: "female",
    url: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
  },
  {
    key: "11",
    no: "11",
    date: "12/06/2023",
    name: "James Robinson",
    userType: "Quality Checker",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBoZWFsdGh5fGVufDB8fDB8fHww&w=1000&q=80",
  },
  {
    key: "12",
    no: "12",
    date: "13/06/2023",
    name: "Isabella Clark",
    userType: "Delivery Manager",
    accountStatus: "Enabled",
    gender: "female",
    url: "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg",
  },
  {
    key: "13",
    no: "13",
    date: "14/06/2023",
    name: "Daniel White",
    userType: "Member",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
  },
  {
    key: "14",
    no: "14",
    date: "15/06/2023",
    name: "Mia Turner",
    userType: "Quality Checker",
    accountStatus: "Disabled",
    gender: "female",
    url: "https://images.unsplash.com/photo-1506795660198-e95c77602129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwd29tYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    key: "15",
    no: "15",
    date: "16/06/2023",
    name: "Ethan Adams",
    userType: "Delivery Manager",
    accountStatus: "Enabled",
    gender: "male",
    url: "https://img.freepik.com/free-photo/cheerful-dark-skinned-woman-smiling-broadly-rejoicing-her-victory-competition-among-young-writers-standing-isolated-against-grey-wall-people-success-youth-happiness-concept_273609-1246.jpg",
  },
  {
    key: "16",
    no: "16",
    date: "17/06/2023",
    name: "Emily Johnson",
    userType: "Member",
    accountStatus: "Enabled",
    gender: "female",
    url: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
  },
];

const ViewProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { screen } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = React.useState({});
const {userArrayByAdmin}=useSelector((state)=>state.admin);
// console.log(userArrayByAdmin)
React.useEffect(()=>{
dispatch(fetchAllUsers());
},[id])

 

  React.useEffect(() => {
    const userObject = userArrayByAdmin?.find((item) => item?.userId == id);
    setUserDetails(userObject);
  }, [id,userArrayByAdmin]);


  console.log(userDetails);

  return (
    <div className="view-profile">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: screen < 660 ? "column" : "row",
        }}
      >
        <section
          className="custom-scrollbar"
          style={{
            width: screen < 660 ? "100%" : "400px",
            height: screen < 660 ? "" : "83vh",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            overflowY: screen < 660 ? "" : "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
          }}
        >
          
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: "100%", borderRadius: "8px",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
             }}
              src={userDetails?.profilePicture==""?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png":userDetails?.profilePicture}
              alt="profile"
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontWeight: "600",
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  marginTop: "0.2rem",
                }}
              >
                {userDetails?.role}
              </p>
            </div>
          </div>

          {/* <p
            style={{
              color: "#00425A",
              fontWeight: "bold",
              fontSize: "1.5rem",
              fontFamily: "'Inter', sans-serif",
              marginTop: "0.5rem",
            }}
          >
            {userDetails?.gender == "male"
              ? `Mr. ${userDetails?.name}`
              : `Miss ${userDetails?.name}`}
          </p> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 16px",
              background: "#04bf1d",
              borderRadius: "8px",
              marginTop: "1.5rem",
            }}
          >
            <VerifiedIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            <p
              style={{
                color: "white",
                fontSize: "1.2rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "bold",
                letterSpacing: "0.1rem",
                marginLeft: "0.5rem",
              }}
            >
              Verified
            </p>
          </div>
          <p
            style={{
              color: "#00425A",
              fontWeight: "500",
              fontSize: "1rem",
              fontFamily: "'Inter', sans-serif",
              marginTop: "1.5rem",
            }}
          >
            120 Rates
          </p>

          <div style={{ marginTop: "0.5rem" }}>
            <Rating
              defaultValue={3}
              precision={0.5}
              readOnly
              sx={{
                "& .MuiRating-iconFilled, & .MuiRating-iconEmpty": {
                  fontSize: 30,
                },
              }}
            />
          </div>
         
          
        </section>

        <section
          className="custom-scrollbar"
          style={{
            flex: 1,
            height: screen < 660 ? "" : "83vh",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
            overflowY: screen < 660 ? "" : "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              paddingLeft: screen < 400 ? "0rem" : "1.5rem",
              paddingRight: screen < 400 ? "0rem" : "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginTop: screen < 660 ? "1.5rem" : "0rem",
                fontFamily: " 'Poppins', sans-serif",
                letterSpacing: "0.1rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Personal Details
            </p>

            <div style={{ width: "100%" }}>
              <p style={pStyles}>First Name</p>
              <Input style={inputStyles} value={userDetails?.firstName} />

              <p style={pStyles}>Last Name</p>
              <Input style={inputStyles} value={userDetails?.lastName} />

              <p style={pStyles}>Address Line 01</p>
              <Input
                style={inputStyles}
                value={userDetails?.address}
              />

              {/* <p style={pStyles}>Address Line 02</p>
              <Input style={inputStyles} value={""} /> */}

              <p style={pStyles}>NIC</p>
              <Input style={inputStyles} value={userDetails?.nic} />

              <p style={pStyles}>Phone Number</p>
              <Input style={inputStyles} value={userDetails?.telephone} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewProfile;
