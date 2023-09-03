import React from "react";
import "./Membership.css";

const PlatinumMembership = () => {
  return (
    <div
      style={{
        marginBottom:"1.5rem",
        width: "300px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "#f7f8fc",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "#83848a",
          fontSize: "2.5rem",
          letterSpacing: "0.1rem",
          fontWeight: "bold",
        }}
      >
        PLATINUM
      </p>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "2rem",
          letterSpacing: "0.1rem",
          fontWeight: "bold",
        }}
      >
        $9.99
      </p>

      <div style={{ marginTop: "1rem",marginBottom:"1.5rem" }}>
        <ul>
          <li className="list-text">Unlimited Swaps</li>
          <li className="list-text">Priority Listings</li>
          <li className="list-text">Access to Premium Themes</li>
          <li className="list-text">Early Access to New Features</li>
          <li className="list-text">Personalized Recommendations</li>
          <li className="list-text">Exclusive Concierge Service</li>
          <li className="list-text">Featured Dress Listings</li>
          <li className="list-text">Premium Seller Badge</li>
          <li className="list-text">Advanced Analytics</li>
        </ul>
      </div>

      <button className="silver-button">Buy Now</button>
    </div>
  );
};

export default PlatinumMembership;
