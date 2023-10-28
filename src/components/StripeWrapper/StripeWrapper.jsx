// src/components/StripeWrapper.js (Create a new component for wrapping Elements)

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O5ryaLjRG9MltRHbvAFmI18GBud2gIDxX8HPalyMEXxciOADzvVM0gCwXvMozCc7QvEjiKqiNCdXgw8TrtkNsPI00xmSeFFmt');

const StripeWrapper = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeWrapper;
