import React from "react";
import "./Membership.css";

const DiamondMembership = () => {
  return (
    <div
      style={{
        marginBottom:"1.5rem",
        width: "300px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "#45464a",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "#00BFFF",
          fontSize: "2.5rem",
          letterSpacing: "0.1rem",
          fontWeight: "bold",
        }}
      >
        DIAMOND
      </p>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "2rem",
          letterSpacing: "0.1rem",
          fontWeight: "bold",
          color: "white",
        }}
      >
        $19.99
      </p>

      <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
        <ul>
          <li className="list-text-d">Unlimited Swaps</li>
          <li className="list-text-d">Priority Listings</li>
          <li className="list-text-d">Access to Premium Themes</li>
          <li className="list-text-d">Early Access to New Features</li>
          <li className="list-text-d">Personalized Recommendations</li>
          <li className="list-text-d">Exclusive Concierge Service</li>
          <li className="list-text-d">Featured Dress Listings</li>
          <li className="list-text-d">Premium Seller Badge</li>
          <li className="list-text-d">Advanced Analytics</li>
          <li className="list-text-d">Personal Stylist Consultation</li>
          <li className="list-text-d">Exclusive Diamond Events</li>
          <li className="list-text-d">Custom Tailoring Service</li>
          <li className="list-text-d">VIP Support</li>
        </ul>
      </div>

      <button className="diamond">Buy Now</button>
    </div>
  );
};

export default DiamondMembership;
