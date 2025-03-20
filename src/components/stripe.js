import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QjHlWCdY54ZfXM8qvWUN8rOi8tWMUURLsYgozV6NGmykV0o1A2EA1xLFky9scffUXptzuMa5O52NMbI3t4aeji800L2n1J4Rm"
); // Thay bằng Public Key của bạn.

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
