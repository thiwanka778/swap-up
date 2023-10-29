import React,{useState} from 'react';
import axios from 'axios';
import "./Membership.css";
import { useDispatch,useSelector } from 'react-redux';


const GoldMembership = ({subscribed}) => {
  



  const {openRedux,screen,user}=useSelector((state)=>state.user);
  


   
 

   const createCheckoutSession = async (priceId) => {
    try {
      const response = await axios.post('http://localhost:8081/payment/create-checkout-session', {
        priceId: priceId,
        userId:user?.userId,
        planName:"gold",
        price:4.99,
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

         {!subscribed && <button className="buy-button" 
          onClick={() => createCheckoutSession('price_1O68cwLjRG9MltRHRrAnxRUE')}>Buy Now</button>}

          
        </div>
  )
}

export default GoldMembership