import React from "react";
import axios from "axios";
import "./Membership.css";
import { useSelector } from "react-redux";

const DiamondMembership = ({subscribed}) => {

  const {openRedux,screen,user}=useSelector((state)=>state.user);
  const createCheckoutSession = async (priceId) => {
    try {
      const response = await axios.post('http://localhost:8081/payment/create-checkout-session', {
        priceId: priceId,
        userId:user?.userId,
        planName:"diamond",
        price:19.99,
      });
      
      // The response will contain the Checkout Session URL
      const checkoutSessionUrl = response.data;
      
      // Redirect the user to the Stripe Checkout page
      window.location.href = checkoutSessionUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div
      style={{
        marginBottom:"1.5rem",
        width:screen<350?"100%":"300px",
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

      {!subscribed && <button className="diamond"  
      onClick={() => createCheckoutSession('price_1O68ieLjRG9MltRHGPOI8CCz')}>Buy Now</button>}
      
    </div>
  );
};

export default DiamondMembership;
