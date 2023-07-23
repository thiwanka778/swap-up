import React from 'react';
import "./Profile.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import Rating from "@mui/material/Rating";

const ProfileComponent = () => {
  return (
    <div
    style={{
      width: "360px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      background: "#e8eaed",
      borderRadius: "8px",
      padding: "2rem",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }}
  >
    <img
      src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
      alt="profile"
      style={{ borderRadius: "50%", width: "200px", height: "200px" }}
    />

    <p
      style={{
        color: "#00425A",
        fontWeight: "bold",
        fontSize: "1.5rem",
        fontFamily: "'Inter', sans-serif",
        marginTop: "1rem",
      }}
    >
      Mr. Ron James
    </p>

    <p
      style={{
        color: "#00425A",
        fontWeight: "500",
        fontSize: "1.2rem",
        fontFamily: "'Inter', sans-serif",
        marginTop: "0.5rem",
      }}
    >
      Member
    </p>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        background: "#04bf1d",
        borderRadius: "8px",
        marginTop: "1rem",
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
  </div>
  )
}

export default ProfileComponent