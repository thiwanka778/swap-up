import React from 'react';
import "./Membership.css";

const GoldMembership = () => {
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
              color: "#FFD700",
              fontSize: "2.5rem",
              letterSpacing: "0.1rem",
              fontWeight: "bold",
            }}
          >
            GOLD
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.1rem",
              fontWeight: "bold",
            }}
          >
            $4.99
          </p>

          <div style={{ marginTop: "1rem",marginBottom:"1.5rem" }}>
            <ul>
              <li className="list-text">Unlimited Swaps</li>
              <li className="list-text">Priority Listings</li>
              <li className="list-text">Access to Premium Themes</li>
              <li className="list-text">Early Access to New Features</li>
              <li className="list-text">Personalized Recommendations</li>
            </ul>
          </div>

          <button className="buy-button">Buy Now</button>
        </div>
  )
}

export default GoldMembership